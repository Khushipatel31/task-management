import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.services';
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

@Component({
  selector: 'app-task-data-table',
  templateUrl: './task-data-table.component.html',
  styleUrl: './task-data-table.component.css',
})
export class TaskDataTableComponent implements OnInit {
  loading:Boolean=false;
  pendingTasks: Task[] = [];
  completedTasks: Task[] = [];
  expiredTasks: Task[] = [];
  displayedColumns: string[] = ['title', 'description', 'deadline', 'action'];
  currentTasks: Task[] = [];
  constructor(private services: UserService) {
    
  }

  ngOnInit(): void {
    this.loading=true;
    this.services.getTasks().subscribe(
      (data: any) => {
        this.pendingTasks = data.pendingTasks;
        this.completedTasks = data.completedTasks;
        this.expiredTasks = data.expiredTasks;
        this.switchTaskType({ value: 'pending' });
        this.loading=false;
      },
      (error) => {
        console.error(error);
        this.loading=false;
      }
    );
  }

  switchTaskType(type:any) {
    switch (type.value) {
      case 'pending':
        this.currentTasks = this.pendingTasks;
        break;
      case 'completed':
        this.currentTasks = this.completedTasks;
        break;
      case 'expired':
        this.currentTasks = this.expiredTasks;
        break;
    }
    console.log(this.currentTasks)
  }
}
