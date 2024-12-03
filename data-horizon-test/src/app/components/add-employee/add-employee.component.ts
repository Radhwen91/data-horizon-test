import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeManamementComponent } from '../employee-manamement/employee-manamement.component';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent {

  employeeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeManamementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      salary: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      address: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.employeeForm.valid) {
      this.dialogRef.close(this.employeeForm.value); // Retourne les données à l'appelant
    }
  }

}
