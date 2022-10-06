import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  public role;
  public registeredUsers:users[] = [];



}
export interface users {

  username:string,
  email:string,
  addresses:Array<[]>

}