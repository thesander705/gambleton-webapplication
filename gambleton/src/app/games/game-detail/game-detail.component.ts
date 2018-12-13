import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {
  private activatedRoute: ActivatedRoute;

  gameId: number;

  constructor(activatedRoute: ActivatedRoute) {
    this.activatedRoute = activatedRoute;
    this.activatedRoute.params.subscribe(params => {
      this.gameId = params['gameId'];
    });
  }

  ngOnInit() {
  }

}
