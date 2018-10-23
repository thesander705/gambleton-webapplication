import {User} from '../models/User';
import {Role} from '../models/Role';

export class UserService {

  public Login(username: string, password: string) {
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
