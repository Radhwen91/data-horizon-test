import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../../models/employee';
import { ApiDataService } from '../../services/api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';

@Component({
  selector: 'app-employee-manamement',
  templateUrl: './employee-manamement.component.html',
  styleUrl: './employee-manamement.component.scss'
})
export class EmployeeManamementComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id','firstName','lastName', 'age', 'dob', 'email', 'salary', 'address', 'imageUrl', 'contactNumber', 'action'];
  globalFilter: string = '';
  dataSource = new MatTableDataSource<Employee>();
 employee : Employee = {
  id : 0,
    age : 0,
    dob: '',
    email: '',
    salary: '',
    address: '',
    imageUrl: '',
    lastName: '',
    firstName: '',
    contactNumber: ''
 }
  constructor(private dataService: ApiDataService, public dialog: MatDialog) {}
  ngOnInit() {
    this.loadData();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  

applyGlobalFilter() {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const lowerCaseFilter = filter.toLowerCase();

      return (
      (data.id?.toString() || '').toLowerCase().includes(lowerCaseFilter) ||
      (data.firstName?.toString() || '').toLowerCase().includes(lowerCaseFilter) ||
      (data.lastName?.toString() || '').toLowerCase().includes(lowerCaseFilter) ||
      (data.age?.toString() || '').toLowerCase().includes(lowerCaseFilter) ||
      (data.dob?.toString() || '').toLowerCase().includes(lowerCaseFilter) ||
      (data.email?.toString() || '').toLowerCase().includes(lowerCaseFilter) ||
      (data.salary?.toString() || '').toLowerCase().includes(lowerCaseFilter) ||
      (data.address?.toString() || '').toLowerCase().includes(lowerCaseFilter) ||
      (data.imageUrl?.toString() || '').toLowerCase().includes(lowerCaseFilter) ||
      (data.contactNumber?.toString() || '').toLowerCase().includes(lowerCaseFilter)
        
      );
    };

    this.dataSource.filter = this.globalFilter.trim().toLowerCase();
  }

  loadData() {
    this.dataService.getData().subscribe((result) => {
      this.dataSource.data = result;
    });
  }


    deleteItem(id: any): void {
      this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
      this.dataSource.data = [...this.dataSource.data];  
    }

  addItem(newItem: Employee) {
    const maxId = this.maxId();
    newItem.id = maxId +1;
    this.dataSource.data.push(newItem);
    this.dataSource.data = [...this.dataSource.data];
  }

  
  openDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      data : this.employee,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.employee = result;
      this.addItem(this.employee);
    });
    
  }
  maxId(): number {
    const ids = this.dataSource.data
      .map(emp => emp.id)
      .filter((id): id is number => typeof id === 'number'); 
    return Math.max(...ids);  
  }


}
