import { inject, Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, createUrlTreeFromSnapshot } from '@angular/router';
import { HttpServices } from '../services/http.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

const AuthGuard=(role:String)=>{
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const http = inject(HttpServices);
    if (role == 'admin') {
      return http.getMethod('/admin/verify').pipe(
        map((data) => {
          console.log(data);
          if (data.success) return true;
          return createUrlTreeFromSnapshot(route, ['/login']);
        }),
        catchError((error) => {
          console.error('Verification failed:', error);
          return of(createUrlTreeFromSnapshot(route, ['/login']));
        })
      );
    } else if (role == 'user') {
      return http.getMethod('/user/verify').pipe(
        map((data) => {
          if (data.success) return true;
          return createUrlTreeFromSnapshot(route, ['/login']);
        }),
        catchError((error) => {
          return of(createUrlTreeFromSnapshot(route, ['/login']));
        })
      );
    } else {
      return createUrlTreeFromSnapshot(route, ['/login']);
    }
  };

}
export default AuthGuard;

