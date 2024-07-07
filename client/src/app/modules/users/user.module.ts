import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersRoutingModule } from './user-routing.module';
import {MatSelectModule}from '@angular/material/select';
import {DataTablesModule} from 'angular-datatables';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component

@NgModule({
    
    declarations: [HeaderComponent, DashboardComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatSelectModule,
    DataTablesModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    AgGridAngular
  ],
})
export class UserModule {}
