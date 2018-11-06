import {User} from '../models/User';
import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Observable, Observer} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Role} from '../models/Role';

@Injectable()
export class UserService {

  private cookieService: CookieService;
  private http: HttpClient;
  private _loggedInUser: User;


  constructor(cookieService: CookieService, http: HttpClient) {
    this.cookieService = cookieService;
    this.http = http;
  }

  get loggedInUser(): User {
    return this._loggedInUser;
  }

  public restoreLoggedInUser(): Observable<boolean> {
    const restoreObservable: Observable<boolean> = new Observable<boolean>((observer: Observer<boolean>) => {
      const authToken: string = this.cookieService.get('AuthToken');
      if (authToken == null || authToken === undefined || authToken === '') {
        observer.next(false);
        return;
      }
      this.LoginByAuthenticationToken(authToken).subscribe((bool: boolean) => {
        observer.next(bool);
      });
    });
    return restoreObservable;
  }

  public IsAdmin(): boolean {
    if (!this.loggedInUser) {
      return false;
    }

    return this.loggedInUser.role === Role.Administrator;
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
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };

      this.http.post('http://localhost:8080/userByCredentials', {
        username: username,
        password: password
      }, httpOptions)
        .subscribe(data => {
            const user: User = new User();
            user.username = data['username'];
            user.password = data['password'];
            user.id = data['id'];
            user.role = data['role'];
            user.authToken = data['authToken'];
            observer.next(user);
          },
          error => {
            observer.error('User not found');
          });
    });

    return observableUser;
  }

  public GetUserByAuthenticationToken(authToken: string): Observable<User> {
    const observableUser: Observable<User> = Observable.create((observer: Observer<User>) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };

      this.http.post('http://localhost:8080/userByAuthToken', {
        authToken: authToken
      }, httpOptions)
        .subscribe(data => {
            const user: User = new User();
            user.username = data['username'];
            user.password = data['password'];
            user.id = data['id'];
            user.role = data['role'];
            user.authToken = data['authToken'];
            observer.next(user);
          },
          () => {
            observer.error('User not found');
          });
    });

    return observableUser;
  }
}
