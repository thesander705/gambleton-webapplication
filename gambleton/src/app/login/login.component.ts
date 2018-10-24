import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../services/UserService';
import {Form} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private userService: UserService;
  private router: Router;
  @ViewChild('formElement') form: Form;
  username: string;
  password: string;
  errorMessage: string;
  loginObservableSubscription: Subscription;

  constructor(userService: UserService, router: Router) {
    this.userService = userService;
    this.router = router;
  }

  ngOnInit() {
  }

  onSubmit() {
    this.login(this.username, this.password);
  }

  login(username: string, password: string) {
    if (this.loginObservableSubscription != null) {
      this.loginObservableSubscription.unsubscribe();
    }

    this.loginObservableSubscription = this.userService.Login(username, password).subscribe((loginSuccess: Boolean) => {
      if (loginSuccess) {
        this.errorMessage = '';
        this.router.navigate(['/account']);
      } else {
        this.errorMessage = 'Wrong username or password';
      }
    });
  }

  ngOnDestroy(): void {
    if (this.loginObservableSubscription != null) {
      this.loginObservableSubscription.unsubscribe();
    }
  }
}
