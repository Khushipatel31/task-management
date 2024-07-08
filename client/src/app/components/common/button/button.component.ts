import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { DialogComponent } from '../../../modules/users/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent implements ICellRendererAngularComp {
  constructor(private dialog:MatDialog ) {}

  params: any;
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
  refresh(params: ICellRendererParams) {
    this.params = params;
    return true;
  }
  buttonClicked() {
    this.dialog.open(DialogComponent, { width: '250px', data: this.params.data._id });
  }
  

}
