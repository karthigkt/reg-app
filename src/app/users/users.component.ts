import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../shared-service/common.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  showRegistration: boolean = true;
  userDetails: boolean = false;
  role
  constructor(private route: ActivatedRoute, private commonService: CommonService) { }

  ngOnInit(): void {
    this.role = this.commonService.role
  }

}
