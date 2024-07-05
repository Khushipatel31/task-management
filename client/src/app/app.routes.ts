import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent as adminDashboard } from './modules/admin/components/dashboard/dashboard.component';
import { DashboardComponent as userDashboard } from './modules/users/components/dashboard/dashboard.component';


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
        path:'register',
        component:RegisterComponent
      },
      {
        path: 'admin',
        component: adminDashboard,
        children: [
          {
            path: '',
            component:adminDashboard ,
          },
          {
            path: '',
            redirectTo: '/admin/dashboard',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'user',
        component: userDashboard,
        children: [
          {
            path: '',
            component:userDashboard ,
          },
          {
            path: '',
            redirectTo: '/user/dashboard',
            pathMatch: 'full',
          },
        ],
      },
   
];
