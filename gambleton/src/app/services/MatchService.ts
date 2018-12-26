import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BetOption} from '../models/BetOption';
import {Game} from '../models/Game';
import {Match} from '../models/Match';

@Injectable()
export class MatchService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public addMatch(title: string,
                  description: string,
                  gameId: number,
                  startDate: Date,
                  endDate: Date,
                  betOptions: BetOption[]): Observable<object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    const betOptionsViewModel: Object[] = [];

    betOptions.forEach(function (betOption) {
      betOptionsViewModel.push({
        competitorId: betOption.competitor.id,
        payoutRate: betOption.payoutRate
      });
    });

    return this.http.post('http://localhost:8080/match', {
      title: title,
      description: description,
      gameId: gameId,
      startDate: startDate,
      endDate: endDate,
      betOptions: betOptionsViewModel
    }, httpOptions);
  }

  getMatch(matchId: number): Observable<Match> {
    const url: string = 'http://localhost:8080/match/' + matchId;
    return this.http.get<Match>(url);
  }
}
