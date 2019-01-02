import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Game} from '../models/Game';
import {Match} from '../models/Match';
import {Competitor} from '../models/Competitor';
import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://localhost:3000';

@Injectable()
export class GameService {
  private http: HttpClient;
  private socket: socketIo;

  public gamesUpdated: Subject<boolean>;

  constructor(http: HttpClient) {
    this.http = http;
    this.socket = socketIo(SERVER_URL);
    this.gamesUpdated = new Subject<boolean>();
    this.setupWebsocketListeners();
  }

  getAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>('http://localhost:8080/game');
  }

  getGame(gameId: number): Observable<Game> {
    const url: string = 'http://localhost:8080/game/' + gameId;
    return this.http.get<Game>(url);
  }

  public addGame(name: string, description: string, authToken: string) {
    this.socket.emit('post-game', {
      name: name,
      description: description,
      authToken: authToken
    });
  }


  getAllMatchesByGame(gameId: number): Observable<Match[]> {
    const url: string = 'http://localhost:8080/game/' + gameId + '/match';
    return this.http.get<Match[]>(url);
  }

  getAllCompetitorsByGame(gameId: number): Observable<Competitor[]> {
    const url: string = 'http://localhost:8080/game/' + gameId + '/competitor';
    return this.http.get<Competitor[]>(url);
  }

  private setupWebsocketListeners() {
    const gamesUpdatedSubject: Subject<boolean> = this.gamesUpdated;

    this.socket.on('post-game', function (data: any) {
      gamesUpdatedSubject.next(true);
    });
  }
}
