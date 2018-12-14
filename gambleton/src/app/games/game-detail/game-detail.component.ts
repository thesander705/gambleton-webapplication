import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../../services/GameService';
import {Match} from '../../models/Match';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {
  private activatedRoute: ActivatedRoute;
  private gameService: GameService;

  gameId: number;
  matches: Match[];


  constructor(activatedRoute: ActivatedRoute, gameService: GameService) {
    this.gameService = gameService;
    this.activatedRoute = activatedRoute;
    this.activatedRoute.params.subscribe(params => {
      this.gameId = params['gameId'];
      this.updateMatches(this.gameId);
    });
  }

  ngOnInit() {

  }

  private updateMatches(gameId: number){
    this.gameService.getAllMatchesByGame(this.gameId).subscribe(matches => {
      this.matches = matches;
    });
  }

}
