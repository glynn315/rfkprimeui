import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewreceivablesComponent } from './viewreceivables.component';

describe('ViewreceivablesComponent', () => {
  let component: ViewreceivablesComponent;
  let fixture: ComponentFixture<ViewreceivablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewreceivablesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewreceivablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
