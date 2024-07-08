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
  constructor(private dialog: MatDialog) {}

  params: any;
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
  refresh(params: ICellRendererParams) {
    this.params = params;
    return true;
  }

  edit() {
    this.dialog.open(TaskFormDialogComponent, { width: '250px', data: '' });
  }

  delete() {
    this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: this.params.data._id,
    });
  }
}
