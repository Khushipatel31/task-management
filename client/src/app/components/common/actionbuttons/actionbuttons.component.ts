import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererParams } from 'ag-grid-community';
import { DeleteDialogComponent } from '../../../modules/admin/components/delete-dialog/delete-dialog.component';
import { TaskFormDialogComponent } from '../../../modules/admin/components/task-form-dialog/task-form-dialog.component';

@Component({
  selector: 'app-actionbuttons',
  templateUrl: './actionbuttons.component.html',
})
export class ActionbuttonsComponent {
  params: any;
  constructor(private dialog: MatDialog) {}

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
  refresh(params: ICellRendererParams) {
    this.params = params;
    return true;
  }

  edit() {
    console.log(this.params);
    this.dialog.open(TaskFormDialogComponent, {
      width: '600px',
      height: '600 px',
      data: {
        title: this.params.data.title,
        description: this.params.data.description,
        email: this.params.data.assignedTo.email,
        id: this.params.data.assignedTo._id,
        taskId:this.params.data._id,
        deadline:this.params.data.deadline,
        edit:true
      },
    });
  }

  delete() {
    this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: this.params.data._id,
    });
  }
}
