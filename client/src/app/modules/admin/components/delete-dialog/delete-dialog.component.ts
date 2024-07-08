import { Component, inject } from '@angular/core';
import { AdminServices } from '../../../../services/admin.services';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent {
  constructor(private adminService:AdminServices,private router:Router){}

  readonly dialogRef=inject(MatDialogRef<DeleteDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  buttonClicked() {
    this.adminService.deleteTask(this.data).subscribe((data) => {
        this.router.navigate(['']);
        this.dialogRef.close();
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
