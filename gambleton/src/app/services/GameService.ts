import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Game} from '../models/Game';

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
}
