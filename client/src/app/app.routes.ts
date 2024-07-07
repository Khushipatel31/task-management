import { Routes, RouterModule,CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent as AdminDashboard } from './modules/admin/components/dashboard/dashboard.component';
import { DashboardComponent as UserDashboard } from './modules/users/components/dashboard/dashboard.component';
import AuthGuard from './guards/auth.guard'; 
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'admin',
    canActivate: [AuthGuard('admin')],
    component: AdminDashboard,
    loadChildren:()=>
      import('./modules/admin/admin.module').then((m)=>m.AdminModule)
  },
  {
    path: 'user',
    component: UserDashboard,
    canActivate: [AuthGuard('user')],
    loadChildren:()=>
      import('./modules/users/user.module').then((m)=>m.UserModule)
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
