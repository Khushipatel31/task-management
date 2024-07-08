import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
@NgModule({
  declarations: [
   HeaderComponent,
   DashboardComponent,
   DeleteDialogComponent,
   ActionbuttonsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AgGridAngular,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    // ReactiveFormsModule,
    MatFormField
  ],
})
export class AdminModule {}
