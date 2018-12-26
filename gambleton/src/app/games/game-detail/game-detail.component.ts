import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../../services/GameService';
import {Match} from '../../models/Match';
import {Game} from '../../models/Game';
import {UserService} from '../../services/UserService';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {
  private activatedRoute: ActivatedRoute;
  private gameService: GameService;

  userService: UserService;
  gameId: number;
  game: Game;
  matches: Match[];


  constructor(activatedRoute: ActivatedRoute, gameService: GameService, userService: UserService) {
    this.gameService = gameService;
    this.activatedRoute = activatedRoute;
    this.userService = userService;
    this.activatedRoute.params.subscribe(params => {
      this.gameId = params['gameId'];
      this.updateGame(this.gameId);
      this.updateMatches(this.gameId);
    });
  }

  ngOnInit() {

  }

  private updateMatches(gameId: number) {
    this.gameService.getAllMatchesByGame(this.gameId).subscribe(matches => {
      this.matches = matches;
    });
  }

  private updateGame(gameId: number) {
    this.gameService.getGame(this.gameId).subscribe(game => {
      this.game = game;
    });
  }

}