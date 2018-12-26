import {Component, OnInit} from '@angular/core';
import {MatchService} from '../../services/MatchService';
import {Match} from '../../models/Match';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})
export class MatchDetailComponent implements OnInit {

  private matchService: MatchService;
  private activatedRoute: ActivatedRoute;

  match: Match;
  matchId: number;

  constructor(matchService: MatchService, activatedRoute: ActivatedRoute) {
    this.matchService = matchService;
    this.activatedRoute = activatedRoute;

    this.activatedRoute.params.subscribe(params => {
      this.matchId = params['matchId'];
      this.updateMatch(this.matchId);
    });

  }

  ngOnInit() {
  }

  private updateMatch(matchId: number) {
    this.matchService.getMatch(matchId).subscribe(match => {
      this.match = match;
    });
  }
}
