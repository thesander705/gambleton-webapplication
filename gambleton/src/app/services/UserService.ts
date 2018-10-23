import {User} from '../models/User';
import {Role} from '../models/Role';
import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

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

  public Login(username: string, password: string) {
    const user = this.GetUserByCredentials(username, password);
    if (user == null) {
      return;
    }

    this._loggedInUser = user;
    this.cookieService.set('AuthToken', user.authToken);
  }

  public LoginByAuthenticationToken(authToken: string) {
    const user = this.GetUserByAuthenticationToken(authToken);

    if (user == null) {
      return;
    }

    this._loggedInUser = user;
    this.cookieService.set('AuthToken', user.authToken);
  }

  public GetUserByCredentials(username: string, password: string): User {
    if (username === 'test' && password === 'Test123!') {
      const user = new User();
      user.id = 1;
      user.password = 'Test123!';
      user.role = Role.Gambler;
      user.username = 'test';
      user.authToken = 'sxrdcfgvhbjnkmljhbsad213hjb';

      return user;
    }
    return null;
  }

  public GetUserByAuthenticationToken(uauthToken: string): User {
    if (uauthToken === 'sxrdcfgvhbjnkmljhbsad213hjb') {
      const user = new User();
      user.id = 1;
      user.password = 'Test123!';
      user.role = Role.Gambler;
      user.username = 'test';
      user.authToken = 'sxrdcfgvhbjnkmljhbsad213hjb';

      return user;
    }
    return null;
  }
}
