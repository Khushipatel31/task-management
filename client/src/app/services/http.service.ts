import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const URL:string='http://localhost:3001/api/v1';

@Injectable({
  providedIn: 'root',
})


export class HttpServices {


  constructor(private http:HttpClient){
  }


  postMethod(url:string,data:Object){
    return this.http.post<any>(URL+url,data);
  }

  getMethod(url:string){
    return this.http.get<any>(URL+url);
  }

}
