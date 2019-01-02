import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/UserService';
import {Game} from '../../models/Game';
import {GameService} from '../../services/GameService';

@Component({
  selector: 'app-games-overview',
  templateUrl: './games-overview.component.html',
  styleUrls: ['./games-overview.component.css']
})
export class GamesOverviewComponent implements OnInit {
  userService: UserService;
  gameService: GameService;

  games: Game[] = [];
  errorMessage: string;


  constructor(userService: UserService, gameService: GameService) {
    this.gameService = gameService;
    this.userService = userService;
    this.loadView();
    this.gameService.gamesUpdated.subscribe(() => {
      this.loadView();
    });
  }

  ngOnInit() {
  }

  private loadView() {
    this.gameService.getAllGames().subscribe((games: Game[]) => {
      this.games = games;
    }, () => {
      this.errorMessage = 'Games could not be loaded.';
    });
  }
}
