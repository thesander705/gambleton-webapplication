import {Component, OnInit} from '@angular/core';
import {GameService} from '../../services/GameService';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {

  private gameService: GameService;
  private router: Router;
  private readonly route: ActivatedRoute;

  name: string;
  description: string;
  errorMessage: string;



  constructor(gameService: GameService, router: Router, route: ActivatedRoute) {
    this.route = route;
    this.gameService = gameService;
    this.router = router;
  }

  ngOnInit() {
  }

  onSubmit(): void {
    this.gameService.addGame(this.name, this.description).subscribe(() => {
        this.router.navigate(['../'], {relativeTo: this.route});
      },
      () => {
        this.errorMessage = 'Lesson could not be created!';
      });
  }
}
