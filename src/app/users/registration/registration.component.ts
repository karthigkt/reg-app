import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { users, UsersService } from '../services/users.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public registrationForm;
  public addresses;
  public isDefaultSelection: boolean = false;
  public deleteInd;
  public isSubmitted;
  public isSuccess;
  constructor(private fb: FormBuilder, private userServices: UsersService) {

  }

  ngOnInit(): void {
    this.userServices.registeredUsers = JSON.parse(localStorage.getItem('data'));
    this.init()
  }

  init() {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      addressForm: this.fb.group({
        addresses: this.fb.array([])
      })
    })

    this.addAddress("def");
  }

  addAddress(def): void {
    this.addresses = this.registrationForm.get('addressForm').get('addresses') as FormArray;
    this.addresses.push(this.createAddress(def));
  }

  createAddress(def) {
    return this.fb.group({
      state: '',
      city: '',
      pincode: '',
      def: def
    });
  }

  defaultClick(ind: number) {
    this.addresses.value.forEach((elem, index) => {
      if (ind === index) {
        elem.def = 'def';
      } else {
        elem.def = '';
      }
    })
  }

  deleteAddress(ind: number) {
    if (this.addresses.value[ind].def === '') {
      this.addresses.removeAt(ind);
    } else {
      this.isDefaultSelection = true;
      this.deleteInd = ind;
      this.runSetTimeOut();
    }

  }

  runSetTimeOut() {
    setTimeout(() => { this.isDefaultSelection = false }, 1000)
  }
  saveForm() {
    this.isSubmitted = true;
    if (this.registrationForm.valid) {
      let enteredValue: users = {
        username: this.registrationForm.value.username,
        email: this.registrationForm.value.email,
        addresses: this.registrationForm.value.addressForm.addresses,
      }
      this.isSuccess = true;
      this.isSubmitted = false;
      this.userServices.registeredUsers.push(enteredValue);
      localStorage.setItem('data',JSON.stringify(this.userServices.registeredUsers))
      setTimeout(() => { this.isSuccess = false, this.init() }, 1000)
    }
  }

  get addressControls() {
    return this.registrationForm.get('addressForm').get('addresses')['controls'];
  }

  get registerFormControl() {
    return this.registrationForm.controls;
  }
}
