import { Injectable } from '@angular/core';
import { HttpServices } from './http.service';
import { BehaviorSubject, Observable, map } from 'rxjs';

interface Task {
  _id: string;
  title: string;
  description: string;
  isCompleted: number;
  createdAt: string;
  assignedTo: string;
  deadline: string;
  __v: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpServices) {}
  nameSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  updateUserName(name:String){
    this.nameSubject.next(name);
  }

  getTasks() {
    return this.http.getMethod('/getMyTasks').pipe(
        map((data:any)=>{
            return data;
        }
    ));
  }
}