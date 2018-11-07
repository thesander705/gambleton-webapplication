export class Game {

  private _id: number;
  private _name: string;
  private _description: string;

  set id(value: number) {
    this._id = value;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }
}
