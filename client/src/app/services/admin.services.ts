import { Injectable } from '@angular/core';
import { HttpServices } from './http.service';
import { BehaviorSubject, Observable, map } from 'rxjs';

interface Task {
  _id: string;
  title: string;
  description: string;
  isCompleted: number;
  createdAt: string;
  assignedTo: {
    name: string;
    email: string;
  };
  deadline: string;
  __v: number;
}

@Injectable({
  providedIn: 'root',
})
export class AdminServices {
  nameSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpServices) {}

  updateName(newData: any): void {
    this.nameSubject.next(newData);
  }

  getTasks(): Observable<any> {
    return this.http.getMethod('/admin/tasks').pipe(
      map((data: any) => {
        console.log('Fetched tasks:', data.tasks);
        data.tasks.forEach((ele: any, i: number) => {
          ele.index = i + 1;
          ele.username = ele.assignedTo.name;
          ele.email = ele.assignedTo.email;
        });
        return data;
      })
    );
  }

  getUsers() {
    return this.http.getMethod(`/admin/users`);
  }

  deleteTask(id: string) {
    return this.http.deleteMethod(`/tasks/${id}`, {});
  }

  editTask(id: string, data: Object) {
    return this.http.putMethod(`/tasks/${id}`, data);
  }

  createTask(data: Object) {
    return this.http.postMethod(`/admin/tasks`, data);
  }
}
