import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class CompetitorService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public addCompetitor(name: string, description: string, gameId: number): Observable<object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post('http://localhost:8080/competitor', {
      name: name,
      description: description,
      gameId: gameId
    }, httpOptions);
  }
}
