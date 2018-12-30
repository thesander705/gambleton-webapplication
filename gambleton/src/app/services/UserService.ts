import {User} from '../models/User';
import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Observable, Observer, Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Role} from '../models/Role';
import {BetOption} from '../models/BetOption';
import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://localhost:3000';

@Injectable()
export class UserService {

  private cookieService: CookieService;
  private http: HttpClient;
  private _loggedInUser: User;
  private socket: socketIo;

  public userUpdated: Subject<boolean>;

  constructor(cookieService: CookieService, http: HttpClient) {
    this.cookieService = cookieService;
    this.http = http;
    this.socket = socketIo(SERVER_URL);
    this.userUpdated = new Subject();
    this.setupWebsocketListeners();
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
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post<User>('http://localhost:8080/userByCredentials', {
      username: username,
      password: password
    }, httpOptions);
  }


  public GetUserByAuthenticationToken(authToken: string): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post<User>('http://localhost:8080/userByAuthToken', {
      authToken: authToken
    }, httpOptions);  }


  public PlaceBet(userPlacingBet: User, betOption: BetOption, moneyPlaced: number): void {
    this.socket.emit('post-bets', {
      amountOfMoney: moneyPlaced,
      betOptionId: betOption.id,
      userPlacingBetId: userPlacingBet.id
    });
  }

  private setupWebsocketListeners(): void {
    const userUpdatedSubject: Subject<boolean> = this.userUpdated;

    this.socket.on('post-bets', function (data: any) {
      userUpdatedSubject.next(true);
    });
  }
}
