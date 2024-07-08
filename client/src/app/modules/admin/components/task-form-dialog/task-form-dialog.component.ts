import { Component, OnInit, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AdminServices } from '../../../../services/admin.services';
@Component({
  selector: 'app-task-form-dialog',
  templateUrl: './task-form-dialog.component.html',
  styleUrl: './task-form-dialog.component.css',
})
export class TaskFormDialogComponent implements OnInit {
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  errorMessage = signal('');
  data: Object = {};
  id: string = '';
  users: any = [];
  loading:Boolean=false;
  error:string=''
  constructor(private adminServices: AdminServices) {}
  ngOnInit(): void {
    this.adminServices.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  // for edit
  //   {
  //     "title":"task4 updated",
  //     "description":"this is task5",
  //     "isCompleted":"0",
  //     "assignedTo":"6672d68464253085c5a9b0b0",
  //     "deadline":"2024-10-01T17:00:00.000Z"
  // }

  //for post
  //   {
  //     "title": "testtttt",
  //     "description": "task 4",
  //     "userId": "6672d68464253085c5a9b0b0",
  //     "deadline": "2024-07-31T17:00:00.000Z"
  // }

  edit() {
    this.adminServices.editTask(this.id, this.data).subscribe((data) => {});
  }

  create() {
    this.adminServices.createTask(this.data).subscribe((data) => {});
  }
}
