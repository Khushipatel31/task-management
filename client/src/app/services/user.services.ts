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

  private pendingTasks: Task[] = [
    {
      _id: '66740da90510adf41102610b',
      title: 'task4 updated',
      description: 'this is task5',
      isCompleted: 0,
      createdAt: '2024-06-20T11:07:18.776Z',
      assignedTo: '6672d6331d7e06413ebb7e9f',
      deadline: '2024-10-01T17:00:00.000Z',
      __v: 0,
    },
  ];

  private completedTasks: Task[] = [
    {
      _id: '66740daf0510adf41102610d',
      title: 't3',
      description: 'task 3',
      isCompleted: 1,
      createdAt: '2024-06-20T11:07:18.776Z',
      assignedTo: '6672d6331d7e06413ebb7e9f',
      deadline: '2024-10-01T17:00:00.000Z',
      __v: 0,
    },
  ];
  private expiredTasks: Task[] = [
    {
      _id: '66740da10510adf411026109',
      title: 't1',
      description: 'task 1',
      isCompleted: 0,
      createdAt: '2021-12-12T11:07:18.776Z',
      assignedTo: '6672d6331d7e06413ebb7e9f',
      deadline: '2021-12-12T17:00:00.000Z',
      __v: 0,
    },
  ];

  getTasks() {
    return this.http.getMethod('/getMyTasks').pipe(
        map((data:any)=>{
            return data;
        }
    ));
  }
}
