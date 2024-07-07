import { Component, OnInit } from '@angular/core';
import { AdminServices } from '../../../../services/admin.services';
import {Subject} from 'rxjs';
import * as DataTables from 'datatables.net';
@Component({
  selector: 'app-task-data-table',
  templateUrl: './task-data-table.component.html',
  styleUrl: './task-data-table.component.css',
})
export class TaskDataTableComponent implements OnInit {
  tasks:any=[];
  pending:Number=0;
  expired:Number=0;
  completed:Number=0;
  constructor(private services: AdminServices) {}
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.services.getTasks().subscribe((data:any)=>{
      this.tasks=data.tasks;
      this.completed=data.counts.completed;
      this.pending=data.counts.pending;
      this.expired=data.counts.expired;
      console.log(this.tasks);
      this.dtTrigger.next(this.tasks);
    })

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true,
      autoWidth: false
    };
  }
 
  ngOnDestroy(): void {
    // Unsubscribe DataTables
    this.dtTrigger.unsubscribe();
  }
  
}
