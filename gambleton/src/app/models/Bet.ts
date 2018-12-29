import {BetOption} from './BetOption';

export class Bet {
  private _id: number;
  private _betOption: BetOption;
  private _moneyPlaced: number;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get betOption(): BetOption {
    return this._betOption;
  }

  set betOption(value: BetOption) {
    this._betOption = value;
  }

  get moneyPlaced(): number {
    return this._moneyPlaced;
  }

  set moneyPlaced(value: number) {
    this._moneyPlaced = value;
  }
}
