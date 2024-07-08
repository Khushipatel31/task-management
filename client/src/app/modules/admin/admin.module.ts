import { NgModule } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { ActionbuttonsComponent } from '../../components/common/actionbuttons/actionbuttons.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { TaskFormDialogComponent } from './components/task-form-dialog/task-form-dialog.component';


@NgModule({
  declarations: [
   HeaderComponent,
   DashboardComponent,
   DeleteDialogComponent,
   ActionbuttonsComponent,
   TaskFormDialogComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    AdminRoutingModule,
    AgGridAngular,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    // MatFormField,
  ],
})
export class AdminModule {}
