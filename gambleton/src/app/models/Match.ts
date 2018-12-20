import {BetOption} from './BetOption';
import {Game} from './Game';

export class Match {
  private _id: number;
  private _title: string;
  private _description: string;
  private _betOptions: BetOption[];
  private _game: Game;
  private _startDate: Date;
  private _endDate: Date;


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get betOptions(): BetOption[] {
    return this._betOptions;
  }

  set betOptions(value: BetOption[]) {
    this._betOptions = value;
  }

  get game(): Game {
    return this._game;
  }

  set game(value: Game) {
    this._game = value;
  }

  get startDate(): Date {
    return this._startDate;
  }

  set startDate(value: Date) {
    this._startDate = value;
  }

  get endDate(): Date {
    return this._endDate;
  }

  set endDate(value: Date) {
    this._endDate = value;
  }
}
