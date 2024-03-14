import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicLayoutComponent } from './dynamic-layout.component';

describe('DefaultLayoutComponent', () => {
  let component: DynamicLayoutComponent;
  let fixture: ComponentFixture<DynamicLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicLayoutComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DynamicLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
