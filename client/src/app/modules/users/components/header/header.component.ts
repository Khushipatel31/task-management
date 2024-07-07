import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  username: String = '';

  constructor(private router: Router,private userService:UserService ) {}

  ngOnInit(): void {
      this.userService.nameSubject.subscribe((data:String)=>{
        this.username=data;
      })
  }


  logout() {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
