import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminServices } from '../../../../services/admin.services';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotifyComponent } from '../../../../components/common/notify/notify.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form-dialog',
  templateUrl: './task-form-dialog.component.html',
  styleUrls: ['./task-form-dialog.component.css'],
})
export class TaskFormDialogComponent implements OnInit {
  id: string = '';
  users: any = [];
  loading: Boolean = false;
  error: string = '';

  taskForm!: FormGroup;

  readonly dialogRef = inject(MatDialogRef<TaskFormDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  constructor(
    private adminServices: AdminServices,
    private formBuilder: FormBuilder,
    private _snackBar:MatSnackBar,
    private router:Router
  ) {
    this.adminServices.getUsers().subscribe((data) => {
      this.users = data.allUsers;
    });

    this.taskForm = this.formBuilder.group({
      title: [this.data?.title || '', Validators.required],
      description: [this.data?.description || '', Validators.required],
      deadline: [
        this.getDateFromString(this.data?.deadline) || '',
        Validators.required,
      ],
      assignedTo: [this.data?.id || '', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.taskForm.invalid) {
      this.error='Please enter all details properly'
      return;
    }

    this.loading = true;
    const taskData = this.taskForm.value;

    if (this.data.edit) {
      this.adminServices.editTask(this.data.taskId, taskData).subscribe({
        next: () => {
          this.loading = false;
          this.dialogRef.close(true);
          this._snackBar.openFromComponent(NotifyComponent, {
            duration: 5 * 1000,
            data: 'Task edited Successfully!!',
          });
          this.router.navigate(['']);
        },
        error: (err) => {
          this.loading = false;
          this.error = err.message || 'An error occurred';
        },
      });
    } else {
      taskData.userId = taskData.assignedTo;
      this.adminServices.createTask(taskData).subscribe({
        next: () => {
          this.loading = false;
          this.dialogRef.close(true);
          this._snackBar.openFromComponent(NotifyComponent, {
            duration: 5 * 1000,
            data: 'Task added Successfully!!',
          });
          this.router.navigate(['']);
        },
        error: (err) => {
          this.loading = false;
          this.error = err.message || 'An error occurred';
        },
      });
    }
  }
  private getDateFromString(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().substring(0, 10);
  }
}
