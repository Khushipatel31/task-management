import { OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.services';
import { Component } from '@angular/core';
import { ColDef, ValueFormatterParams } from 'ag-grid-community';
import { ButtonComponent } from '../../../../components/common/button/button.component';
import { param } from 'jquery';
import { DatePipe } from '@angular/common';

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
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  loading: boolean = false;
  pendingTasks: Task[] = [];
  completedTasks: Task[] = [];
  expiredTasks: Task[] = [];
  status = 'pending';
  rowData: Task[] = [];
  currentTasks: Task[] = [];
  colDefs: ColDef[] = [];
  pagination = true;
  paginationPageSize = 20;
  paginationPageSizeSelector = [20, 50, 100];
  attributes: ColDef[] = [
    {
      field: 'index',
      filter: true,
      flex: 0.5,
    },
    { field: 'title', filter: true },
    { field: 'description', filter: true, flex: 1 },
    {
      field: 'deadline',
      filter: true,
      valueFormatter: (p:any) => {
        console.log(p)
        return this.datepipe.transform(p.value, 'shortDate') + '';
      },
    },
  ];

  constructor(private userService: UserService, private datepipe: DatePipe) {}
  ngOnInit(): void {
    this.userService.getTasks().subscribe(
      (data: any) => {
        this.pendingTasks = data.pendingTasks;
        this.completedTasks = data.completedTasks;
        this.expiredTasks = data.expiredTasks;
        this.rowData = data.pendingTasks;
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
    this.status = status.value;
    if (this.status === 'expired') {
      this.rowData = this.expiredTasks;
      this.colDefs = this.attributes.slice();
    } else if (this.status === 'completed') {
      this.rowData = this.completedTasks;
      this.colDefs = this.attributes.slice();
    } else {
      this.rowData = this.pendingTasks;

      this.colDefs = this.attributes.slice();
      this.colDefs.push({
        field: 'markAsCompleted',
        cellRenderer: ButtonComponent,
      });
    }
  }
}
