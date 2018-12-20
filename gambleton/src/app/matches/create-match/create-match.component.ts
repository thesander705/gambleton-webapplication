import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../../services/GameService';
import {Game} from '../../models/Game';

@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.component.html',
  styleUrls: ['./create-match.component.css']
})
export class CreateMatchComponent implements OnInit {

  private activatedRoute: ActivatedRoute;
  private gameService: GameService;

  gameId: number;
  game: Game;
  matchTitle: string;
  matchStartDate: Date;
  matchStartTime: string;
  matchEndDate: Date;
  matchEndTime: string;
  matchDescription: string;

  constructor(activatedRoute: ActivatedRoute, gameService: GameService) {
    this.gameService = gameService;
    this.activatedRoute = activatedRoute;

    this.activatedRoute.params.subscribe(params => {
      this.gameId = params['gameId'];

      this.updateGame(this.gameId);
    });
  }

  ngOnInit() {
  }

  private updateGame(gameId: number) {
    this.gameService.getGame(this.gameId).subscribe(game => {
      this.game = game;
    });
  }

}
