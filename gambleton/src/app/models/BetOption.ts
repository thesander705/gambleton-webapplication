import {Competitor} from './Competitor';

export class BetOption {
  private _id: number;
  private _competitor: Competitor;
  private _payoutRate: number;


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get competitor(): Competitor {
    return this._competitor;
  }

  set competitor(value: Competitor) {
    this._competitor = value;
  }

  get payoutRate(): number {
    return this._payoutRate;
  }

  set payoutRate(value: number) {
    this._payoutRate = value;
  }
}
