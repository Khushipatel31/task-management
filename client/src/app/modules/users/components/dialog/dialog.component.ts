
import { ChangeDetectionStrategy, Component, inject, Inject } from '@angular/core'; 
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../../../../components/common/button/button.component';
import { UserService } from '../../../../services/user.services';
import { Router } from '@angular/router';
  
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})

export class DialogComponent {

  constructor(private userService:UserService,private router:Router ){}
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  buttonClicked() {
    this.userService.updateStatus(this.data).subscribe((data) => {
        this.router.navigate(['']);
        this.dialogRef.close();
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  
}
