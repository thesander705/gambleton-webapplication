import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {BetOption} from '../models/BetOption';
import {Match} from '../models/Match';
import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://localhost:3000';

@Injectable()
export class MatchService {
  private http: HttpClient;
  private socket: socketIo;

  public matchesUpdated: Subject<boolean>;


  constructor(http: HttpClient) {
    this.http = http;
    this.socket = socketIo(SERVER_URL);
    this.matchesUpdated = new Subject<boolean>();
    this.setupWebsocketListeners();
  }

  public addMatch(title: string,
                  description: string,
                  gameId: number,
                  startDate: Date,
                  endDate: Date,
                  betOptions: BetOption[],
                  authToken: string): void {


    const betOptionsViewModel: Object[] = [];

    betOptions.forEach(function (betOption) {
      betOptionsViewModel.push({
        competitorId: betOption.competitor.id,
        payoutRate: betOption.payoutRate
      });
    });

    this.socket.emit('post-match', {
      title: title,
      description: description,
      gameId: gameId,
      startDate: startDate,
      endDate: endDate,
      betOptions: betOptionsViewModel,
      authToken: authToken
    });
  }

  getMatch(matchId: number): Observable<Match> {
    const url: string = 'http://localhost:8080/match/' + matchId;
    return this.http.get<Match>(url);
  }

  private setupWebsocketListeners(): void {
    const matchesUpdatedSubject: Subject<boolean> = this.matchesUpdated;

    this.socket.on('post-match', function (data: any) {
      matchesUpdatedSubject.next(true);
    });
  }
}
