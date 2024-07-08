import { Component, OnInit } from '@angular/core';
import { AdminServices } from '../../../../services/admin.services';
import { ColDef } from 'ag-grid-community';
import { DatePipe } from '@angular/common';
import { ActionbuttonsComponent } from '../../../../components/common/actionbuttons/actionbuttons.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormDialogComponent } from '../task-form-dialog/task-form-dialog.component';

interface Task {
  title: string;
  description: string;
  deadline: string;
  index: number;
  username: string;
  email: string;
  status: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl:'./dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  tasks: any[] = [];
  pending: number = 0;
  expired: number = 0;
  completed: number = 0;
  colDefs: ColDef[] = [];
  rowData: any[] = [];
  pagination = true;
  paginationPageSize = 20;
  paginationPageSizeSelector = [20, 50, 100];
  attributes: ColDef[] = [
    {
      field: 'index',
      filter: true,
      flex: 0.5,
    },
    { field: 'username', filter: true },
    { field: 'email', filter: true },
    { field: 'title', filter: true },
    { field: 'status', filter: true },
    { field: 'description', filter: true, flex: 1 },
    {
      field: 'deadline',
      filter: true,
      valueFormatter: (p: any) => {
        console.log(p);
        return this.datepipe.transform(p.value, 'shortDate') + '';
      },
    },
    {
      field: 'action',
      cellRenderer: ActionbuttonsComponent,
    }
  ];

  constructor(private services: AdminServices, private datepipe: DatePipe,private dialog:MatDialog) {}

  ngOnInit(): void {
    this.services.getTasks().subscribe((data: any) => {
      this.tasks = data.tasks;
      this.completed = data.counts.completed;
      this.pending = data.counts.pending;
      this.expired = data.counts.expired;
      this.rowData = data.tasks;
    });
  }

  createTask(){
      this.dialog.open(TaskFormDialogComponent,{ width: '600px',height:'600 px', data: '' });
  }

}