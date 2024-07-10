import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrl: './notify.component.css'
})
export class NotifyComponent {
  snackBarRef = inject(MatSnackBarRef);
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { 
  }
}
