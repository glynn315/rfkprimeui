import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcustomersComponent } from './addcustomers.component';

describe('AddcustomersComponent', () => {
  let component: AddcustomersComponent;
  let fixture: ComponentFixture<AddcustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddcustomersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
