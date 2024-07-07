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
export class AdminServices {
  nameSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  // name: String = '';
  constructor(private http: HttpServices) {}

  updateName(newData: any): void {
    this.nameSubject.next(newData);
  }

  getTasks() {
    return this.http.getMethod('/admin/tasks').pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
