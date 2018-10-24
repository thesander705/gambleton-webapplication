import {User} from '../models/User';
import {Role} from '../models/Role';
import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {observable, Observable, Observer} from 'rxjs';

@Injectable()
export class UserService {

  private cookieService: CookieService;
  private _loggedInUser: User;

  constructor(cookieService: CookieService) {
    this.cookieService = cookieService;
  }

  get loggedInUser(): User {
    return this._loggedInUser;
  }

  public restoreLoggedInUser(): Observable<boolean> {
    const restoreObservable: Observable<boolean> = new Observable<boolean>((observer: Observer<boolean>) => {
      const authToken: string = this.cookieService.get('AuthToken');
      this.LoginByAuthenticationToken(authToken).subscribe((bool: boolean) => {
        observer.next(bool);
      });
    });
    return restoreObservable;
  }

  public IsAuthenticated(): Promise<boolean> {
    const promise: Promise<boolean> = new Promise((resolve, reject) => {
      if (this.loggedInUser != null) {
        resolve(true);
      }
      resolve(false);
    });
    return promise;
  }

  public Login(username: string, password: string): Observable<Boolean> {
    const loginObservable = new Observable<boolean>((observer: Observer<boolean>) => {
      const userObservable = this.GetUserByCredentials(username, password);

      userObservable.subscribe((user: User) => {
        this._loggedInUser = user;
        this.cookieService.set('AuthToken', user.authToken);
        observer.next(true);
      }, () => {
        observer.next(false);
      });
    });

    return loginObservable;
  }

  public LoginByAuthenticationToken(authToken: string): Observable<boolean> {
    const loginObservable = new Observable<boolean>((observer: Observer<boolean>) => {
      const userObservable = this.GetUserByAuthenticationToken(authToken);

      userObservable.subscribe((user: User) => {
        this._loggedInUser = user;
        this.cookieService.set('AuthToken', user.authToken);
        observer.next(true);
      }, function () {
        observer.next(false);
      });
    });

    return loginObservable;
  }

  public GetUserByCredentials(username: string, password: string): Observable<User> {
    const observableUser: Observable<User> = Observable.create((observer: Observer<User>) => {
      if (username === 'test' && password === 'Test123!') {
        const user = new User();
        user.id = 1;
        user.password = 'Test123!';
        user.role = Role.Gambler;
        user.username = 'test';
        user.authToken = 'sxrdcfgvhbjnkmljhbsad213hjb';

        observer.next(user);
      } else {
        observer.error('User not found');
      }
    });

    return observableUser;
  }

  public GetUserByAuthenticationToken(uauthToken: string): Observable<User> {
    const observableUser: Observable<User> = Observable.create((observer: Observer<User>) => {
      if (uauthToken === 'sxrdcfgvhbjnkmljhbsad213hjb') {
        const user = new User();
        user.id = 1;
        user.password = 'Test123!';
        user.role = Role.Gambler;
        user.username = 'test';
        user.authToken = 'sxrdcfgvhbjnkmljhbsad213hjb';

        observer.next(user);
      } else {
        observer.error('User not found');
      }
    });

    return observableUser;
  }
}
