import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Game} from '../models/Game';
import {Match} from '../models/Match';

@Injectable()
export class GameService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getAllGamesHeroes(): Observable<Game[]> {
    return this.http.get<Game[]>('http://localhost:8080/game');
  }

  public addGame(name: string, description: string): Observable<object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post('http://localhost:8080/game', {
      name: name,
      description: description
    }, httpOptions);
  }

  getAllMatchesByGame(gameId: number): Observable<Match[]> {
    const url: string = 'http://localhost:8080/game/' + gameId + '/match';
    return this.http.get<Match[]>(url);
  }
}
