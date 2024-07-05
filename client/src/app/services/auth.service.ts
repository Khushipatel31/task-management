import { Router } from '@angular/router';
import { HttpServices } from './http.service';
import { catchError, map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

interface login {
  email: String;
  password: String;
  role: String;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpServices) {}

  login(data: login): Observable<any> {
    return this.http.postMethod('/login', data).pipe(
      map((data:any)=>{
        if(data.success){
          this.setToken(data.token);
          this.setRole(data.user.role);
          return data;
        }else{
          return data;
        }
      })
    );
  }


  verify(): Observable<boolean> {
    return this.http.getMethod('/verify').pipe(
      map((data: any) => {
        return true;
      }),
      catchError((error) => {
        return of(false);
      })
    );
  }

  setToken(token:string){
    localStorage.setItem('token',token);
  }
  setRole(role:string){
    localStorage.setItem('role',role);
  }

  getRole(){
    return localStorage.getItem('role');
  }
  getToken(){
   return  localStorage.getItem('token')
  }



}
