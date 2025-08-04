import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymenttransactionComponent } from './paymenttransaction.component';

describe('PaymenttransactionComponent', () => {
  let component: PaymenttransactionComponent;
  let fixture: ComponentFixture<PaymenttransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymenttransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymenttransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
