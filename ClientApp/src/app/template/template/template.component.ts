import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { EntityDataService } from 'src/app/angular-app-services/entity-data.service';
import { LayoutService } from 'src/app/angular-app-services/layout.service';
import { _camelCase } from 'src/app/library/utils';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss'
})
export class TemplateComponent implements OnInit {
  selectedId: string = '';
  entityName: string = '';
  mappedListData: any[] = [];
  mappedPreviewData: any[] = [];
  selectedIndex: number | null = null;

  private destroy = new Subject();
  private editLayout: any[] = [];
  private listLayout: any;
  private records: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private entityDataService: EntityDataService,
    private layoutService: LayoutService
  ) { }

  ngOnInit(): void {
    this.getEntityName();
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }

  previewRecord(index: number): void {
    if (this.records?.length > index) {
      this.mapPreviewData(this.records[index]);
    }
  }

  onRefresh(): void {
    this.records = [];
    this.mappedListData = [];
    this.mappedPreviewData = [];

    this.entityDataService.getRecord(this.entityName)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (records) => {
          this.records = records;

          this.prepareMappedData();

          const selectedRecordIndex = this.records?.findIndex(x => x.id === this.selectedId) || -1;
          this.selectedIndex = selectedRecordIndex > -1 ? selectedRecordIndex : 0;
          this.mapPreviewData(this.records?.[this.selectedIndex]);
        }
      });
  }

  private getEntityName(): void {
    this.route.params
      .pipe(takeUntil(this.destroy))
      .subscribe(params => {
        this.entityName = params['entityName'];
        this.selectedIndex = null;
        this.getList();
      });
  }

  private getFormattedData(record: any, fieldInfo: any): any {
    if (!fieldInfo?.dataType || !fieldInfo?.fieldName || !record) return '';
    const fieldName = _camelCase(fieldInfo.fieldName),
      data = record[fieldName] || '';
    switch (fieldInfo.dataType.toLowerCase()) {
      case 'datetime':
        const date = Date.parse(data + 'Z');
        return isNaN(date) ? data : new Date(data + 'Z').toLocaleString();
      case 'numeric':
        return new Intl.NumberFormat().format(Number(data));
      case 'guid':
        const refPropertyName = fieldName.replace('Id', ''),
          refObject = record[refPropertyName];
        return refObject?.name || this.getRefData(refObject?.$ref, this.records)?.name || data;
      default:
        return data;
    }
  }

  private getList(): void {
    this.resetData();

    const apis = [
      this.layoutService.getLayout(this.entityName, 'List'),
      this.layoutService.getLayout(this.entityName, 'Edit'),
      this.entityDataService.getRecord(this.entityName)
    ];
    forkJoin(apis)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: ([listLayout, editLayout, records]) => {
          this.records = records;
          this.editLayout = editLayout;
          this.listLayout = listLayout;

          this.prepareMappedData();

          this.selectedIndex = 0;
          this.mapPreviewData(this.records?.[this.selectedIndex]);
        }
      });
  }

  private getRefData(ref: string, records: any): any {
    if (Array.isArray(records)) {
      for (const record of records) {
        if (typeof record === 'object') {
          const val = this.getRefData(ref, record);
          if (val) return val;
        }
      };
    } else {
      for (const [key, value] of Object.entries(records)) {
        if (key === '$id' && value === ref) {
          return records;
        } else if (typeof value === 'object') {
          const val = this.getRefData(ref, value);
          if (val) return val;
        }
      }
    }
  }

  private mapPreviewData(record: any): void {
    if (record && this.editLayout) {
      this.selectedId = record.id;
      this.mappedPreviewData = this.editLayout.map(node => {
        return {
          id: record.id,
          name: node.name,
          icon: node.icon,
          type: node.type,
          fields: node.fields.map((field: any) => {
            return {
              label: field.label,
              icon: field.icon,
              value: this.getFormattedData(record, field)
            };
          })
        };
      });
    }
    else {
      this.selectedId = '';
      this.mappedPreviewData = [];
    }
  }

  private prepareMappedData(): void {
    if (this.records?.length > 0 && this.listLayout) {
      this.mappedListData = this.records.map(record => {
        const titles = this.listLayout.cardTitle?.fields?.map(
          (title: any) => {
            return {
              label: title.label,
              value: this.getFormattedData(record, title)
            };
          }) || [],
          details = this.listLayout.cardDetail?.fields?.map(
            (detail: any) => {
              return {
                label: detail.label,
                icon: detail.icon,
                value: this.getFormattedData(record, detail)
              };
            }) || [],
          status = this.listLayout.cardStatus?.fields?.map(
            (status: any) => {
              return {
                label: status.label,
                icon: status.icon,
                value: this.getFormattedData(record, status)
              };
            }) || [];
        return {
          id: record.id,
          cardTitle: titles ? { fields: titles } : null,
          cardDetail: details ? { fields: details } : null,
          cardStatus: status ? { fields: status } : null
        };
      });
    }
    else
      this.mappedListData = [];
  }

  private resetData(): void {
    this.records = [];
    this.editLayout = [];
    this.listLayout = undefined;
    this.mappedListData = [];
    this.mappedPreviewData = [];
  }
}
