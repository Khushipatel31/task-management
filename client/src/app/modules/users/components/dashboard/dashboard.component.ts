import { OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.services';
import { MatSelectChange } from '@angular/material/select';
import { BehaviorSubject } from 'rxjs';
import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { ButtonComponent } from '../../../../components/common/button/button.component';

interface Task {
  _id: string;
  title: string;
  description: string;
  isCompleted: number;
  createdAt: string;
  assignedTo: string;
  deadline: string;
  __v: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  loading: boolean = false;
  pendingTasks: Task[] = [];
  start: any = 0;
  completedTasks: Task[] = [];
  expiredTasks: Task[] = [];
  status = 'pending';
  rowData: Task[] = [];
  currentTasks: Task[] = [];
  colDefs: ColDef[] = [];
  pagination = true;
  paginationPageSize = 1;
  paginationPageSizeSelector = [20, 50, 100];
  attributes: ColDef[] = [
    {
      field: 'index',
      filter: true,
      valueGetter: () => {
        this.start++;
        console.log(this.start);
      },
      // valueSetter: (start) => {
      //   return this.start++ + '';
      // },
    },
    { field: 'title', filter: true },
    { field: 'description', filter: true },
    { field: 'deadline', filter: true },
  ];
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getTasks().subscribe(
      (data: any) => {
        this.pendingTasks = data.pendingTasks;
        this.completedTasks = data.completedTasks;
        this.expiredTasks = data.expiredTasks;
        this.currentTasks = data.pendingTasks;
        this.rowData = data.pendingTasks;
        this.start = 0;
        this.colDefs = this.attributes.slice();
        this.colDefs.push({
          field: 'markAsComplete',
          cellRenderer: ButtonComponent,
        });
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching tasks:', error);
        this.loading = false;
      }
    );
  }

  onStatusChange(status: any): void {
    this.status = status.target.value;
    if (this.status === 'expired') {
      this.rowData = this.expiredTasks;
      this.start = 0;
      this.colDefs = this.attributes.slice();
    } else if (this.status === 'completed') {
      this.rowData = this.completedTasks;
      this.start = 0;
      this.colDefs = this.attributes.slice();
    } else {
      this.rowData = this.pendingTasks;
      this.start = 0;

      this.colDefs = this.attributes.slice();
      this.colDefs.push({
        field: 'markAsComplete',
        cellRenderer: ButtonComponent,
      });
    }
  }
}
