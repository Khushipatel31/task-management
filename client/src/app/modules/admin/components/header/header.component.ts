import { Component, OnInit } from '@angular/core';
import { AdminServices } from '../../../../services/admin.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  username:String='';
  constructor(private admin:AdminServices){
  }
  ngOnInit(): void {
      this.admin.nameSubject.subscribe((data)=>{
        this.username=data;
      })
  }
  
}
