import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../shared-service/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginDetails = [
    { username: 'admin', password: 'admin', role: 'Admin' },
    { username: 'user', password: 'user', role: 'User' }
  ]
  public credentials = {
    username: "",
    password: ""
  }

  public isValidCredentials = true;
  constructor(private router: Router, private commonService:CommonService) { }

  ngOnInit(): void {
  }

  login(e) {
    e.preventDefault();
    this.validateUser();
    // this.router.navigate(['/users'])
  }

  onchange() {
    if (this.credentials.username !== "" && this.credentials.password !== "") {
      this.isValidCredentials = true;
    }
  }
  validateUser() {
    let loggedUser: any = this.loginDetails.filter((elem) => {
      return elem.username === this.credentials.username.toLowerCase() && elem.password === this.credentials.password.toLowerCase()
    })
    if (loggedUser.length > 0) {
      this.isValidCredentials = true;
      this.commonService.role = loggedUser[0].role;
      this.router.navigate(['/users'])
    } else {
      this.isValidCredentials = false;
    }
  }

}
