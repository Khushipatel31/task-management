import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    HeaderComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DashboardComponent,
    HeaderComponent,
  ]
})
export class AdminModule { }
