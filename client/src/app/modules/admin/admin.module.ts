import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskDataTableComponent } from './components/task-data-table/task-data-table.component'
import {DataTablesModule} from 'angular-datatables';
@NgModule({
  declarations: [
    HeaderComponent,
    DashboardComponent,
    TaskDataTableComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule
  ],
  
})
export class AdminModule { }
