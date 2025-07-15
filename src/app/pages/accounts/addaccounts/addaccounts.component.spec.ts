import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddaccountsComponent } from './addaccounts.component';

describe('AddaccountsComponent', () => {
  let component: AddaccountsComponent;
  let fixture: ComponentFixture<AddaccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddaccountsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddaccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
