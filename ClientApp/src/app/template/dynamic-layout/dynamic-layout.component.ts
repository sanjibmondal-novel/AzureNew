import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Option } from './layout-models';

@Component({
  selector: 'app-dynamic-layout',
  templateUrl: './dynamic-layout.component.html',
  styleUrl: './dynamic-layout.component.scss'
})

export class DynamicLayoutComponent {
  @Input() formFields!: any[];
  @Input() form!: FormGroup;
  @Input() fieldOptions: { [key: string]: Option[]; } = {};
}