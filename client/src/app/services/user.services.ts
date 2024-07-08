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

  updateStatus(id:String){
    return this.http.putMethod(`/task/updateStatus/${id}`,{})
  }


  getTasks() {
    return this.http.getMethod('/getMyTasks').pipe(
        map((data:any)=>{
            data.pendingTasks.forEach((ele:any,ind:any)=>{
              ele.index=ind+1;
            })
            data.completedTasks.forEach((ele:any,ind:any)=>{
              ele.index=ind+1;
            })
            data.expiredTasks.forEach((ele:any,ind:any)=>{
              ele.index=ind+1;
            })
            return data;
        }
    ));
  }
}
