import { Component, OnInit } from '@angular/core';
import { AdminServices } from '../../../../services/admin.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  username:String='';
  constructor(private admin:AdminServices,private router:Router){
  }
  ngOnInit(): void {
      this.admin.nameSubject.subscribe((data)=>{
        this.username=data;
      })
  }
  logout() {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
  
}
