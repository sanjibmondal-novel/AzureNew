import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { TemplateAddComponent } from '../template-add/template-add.component';
import { MatDialog } from '@angular/material/dialog';
import { EntityDataService } from 'src/app/angular-app-services/entity-data.service';
import { Subject, takeUntil } from 'rxjs';
import { SweetAlertService } from 'src/app/angular-app-services/sweet-alert.service';
import { _toSentenceCase } from 'src/app/library/utils';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrl: './template-list.component.scss'
})
export class TemplateListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() entityName: string = '';
  @Input() mappedData: any[] = [];
  @Input() selectedIndex: number | null = 0;
  @Output() refresh = new EventEmitter<void>();
  @Output() previewRecord = new EventEmitter<number>();

  sentenceCaseEntityName: string = '';
  searchText: string = '';
  showFilterPanel: boolean = false;
  public authors: Array<{ text: string; value: number; }> = [
    { text: "Chetan Bhagat", value: 1 },
    { text: "Jhumpa Lahiri", value: 2 },
    { text: "Arundhati Roy", value: 3 },
    { text: "Salman Rushdie", value: 4 },
  ];

  public genre: Array<{ text: string; value: number; }> = [
    { text: "Fiction", value: 1 },
    { text: "Historical Fiction", value: 2 },
    { text: "Science fiction", value: 3 },
    { text: "Horror", value: 4 },
  ];

  public publication: Array<{ text: string; value: number; }> = [
    { text: "PKT publication", value: 1 },
    { text: "Ananda publishers", value: 2 },
    { text: "Deb publication", value: 3 }
  ];

  private destroy = new Subject();

  constructor(
    private dialog: MatDialog,
    private entityDataService: EntityDataService,
    private sweetAlertService: SweetAlertService
  ) {
  }

  ngOnInit(): void {
    this.sentenceCaseEntityName = _toSentenceCase(this.entityName);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['entityName']) {
      this.sentenceCaseEntityName = _toSentenceCase(this.entityName);
    }
    setTimeout(() => {
      let selectedDiv = document.getElementById('div-' + this.selectedIndex) as HTMLElement;
      selectedDiv?.scrollIntoView();
    }, 100);
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }

  addRecord(): void {
    const dialog = this.dialog.open(TemplateAddComponent, {
      width: '800px',
      height: '100vh',
      position: {
        top: '0px',
        right: '0px',
      },
      panelClass: [
        'animate__animated',
        'animate__slideInRight',
        'no-border-wrapper',
      ],
      autoFocus: false,
      disableClose: true
    });
    dialog.componentInstance.entityName = this.entityName;
    dialog.componentInstance.id = '';
    dialog.componentInstance.saved
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (status) => {
          dialog.close();
          if (status) {
            this.refresh.emit();
          }
        }
      });
  }

  async confirmDelete(id: string): Promise<void> {
    const confirmed = await this.sweetAlertService.showDeleteConfirmationDialog();

    if (confirmed) {
      this.deleteData(id);
    }
  }

  previewSpecificRecord(index: number): void {
    this.selectedIndex = index;
    this.previewRecord.emit(index);
  }

  private deleteData(id: string): void {
    this.entityDataService.deleteRecordById(this.entityName, id)
      .pipe(takeUntil(this.destroy))
      .subscribe(() => {
        this.sweetAlertService.showSuccess(_toSentenceCase(this.entityName) + ' has been deleted.');
        this.refresh.emit();
      }
      );
  }

  openFilterPanel() {
    this.showFilterPanel = true;
  }

  clearFilter() {
    this.showFilterPanel = false;
  }

}