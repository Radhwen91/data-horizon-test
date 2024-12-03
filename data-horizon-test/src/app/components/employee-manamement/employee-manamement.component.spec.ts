import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeManamementComponent } from './employee-manamement.component';

describe('EmployeeManamementComponent', () => {
  let component: EmployeeManamementComponent;
  let fixture: ComponentFixture<EmployeeManamementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeManamementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeManamementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
