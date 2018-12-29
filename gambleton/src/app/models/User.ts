import {Role} from './Role';
import {Bet} from './Bet';

export class User {

  private _id: number;
  private _username: string;
  private _password: string;
  private _role: Role;
  private _authToken: string;
  private _money: number;
  private _bets: Bet[];

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get role(): Role {
    return this._role;
  }

  set role(value: Role) {
    this._role = value;
  }

  get authToken(): string {
    return this._authToken;
  }

  set authToken(value: string) {
    this._authToken = value;
  }

  get money(): number {
    return this._money;
  }

  set money(value: number) {
    this._money = value;
  }

  get bets(): Bet[] {
    return this._bets;
  }

  set bets(value: Bet[]) {
    this._bets = value;
  }
}
