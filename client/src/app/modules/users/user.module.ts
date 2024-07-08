import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersRoutingModule } from './user-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule,MatFormField } from '@angular/material/form-field';
import { AgGridAngular } from 'ag-grid-angular'; 
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common'; 
import { MatButtonModule } from '@angular/material/button';
import {DialogComponent} from './components/dialog/dialog.component'
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
  declarations: [HeaderComponent, DashboardComponent,DialogComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    AgGridAngular,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatFormField,
  ],
  providers:[DatePipe]
})

export class UserModule {}
