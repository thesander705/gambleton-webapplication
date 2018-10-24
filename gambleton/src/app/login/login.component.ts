import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../services/UserService';
import {Form} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private userService: UserService;
  @ViewChild('formElement') form: Form;
  username: string;
  password: string;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  ngOnInit() {
  }

  onSubmit() {
    this.login(this.username, this.password);
  }

  login(username: string, password: string) {
    this.userService.Login(username, password).subscribe((loginSuccess: Boolean) => {
      if (loginSuccess) {
        alert('Success');
      } else {
        alert('Nay');
      }
    });
  }
}
