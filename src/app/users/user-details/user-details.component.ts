import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public registeredUsers;
  constructor(private userServices:UsersService) { }

  ngOnInit(): void {
    this.registeredUsers = JSON.parse(JSON.stringify(this.userServices.registeredUsers));
    this.registeredUsers.forEach((elem)=>{
      elem.addresses = elem.addresses.filter((ele)=>ele.def=="def");
    })
  }

  deleteUser(ind:number){
    this.registeredUsers.splice(ind, 1);
    this.userServices.registeredUsers.splice(ind, 1);
    localStorage.setItem('data',JSON.stringify(this.userServices.registeredUsers))
  }


}
