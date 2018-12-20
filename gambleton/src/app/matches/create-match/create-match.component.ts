import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GameService} from '../../services/GameService';
import {Game} from '../../models/Game';
import {Competitor} from '../../models/Competitor';
import {BetOption} from '../../models/BetOption';
import {MatchService} from '../../services/MatchService';
import {Match} from '../../models/Match';


@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.component.html',
  styleUrls: ['./create-match.component.css']
})
export class CreateMatchComponent implements OnInit {

  private activatedRoute: ActivatedRoute;
  private gameService: GameService;
  private matchService: MatchService;
  private router: Router;

  competitors: Competitor[];
  selectableCompetitors: Competitor[];

  gameId: number;
  game: Game;
  matchTitle: string;
  matchStartDate: string;
  matchStartTime: string;
  matchEndDate: string;
  matchEndTime: string;
  matchDescription: string;
  matchBetOptions: BetOption[];

  constructor(activatedRoute: ActivatedRoute, gameService: GameService, matchService: MatchService, router: Router) {
    this.router = router;
    this.matchService = matchService;
    this.gameService = gameService;
    this.activatedRoute = activatedRoute;
    this.matchBetOptions = [];

    this.activatedRoute.params.subscribe(params => {
      this.gameId = params['gameId'];

      this.updateGame(this.gameId);
      this.updateCompetitors(this.gameId);
    });
  }

  ngOnInit() {
  }

  private updateGame(gameId: number) {
    this.gameService.getGame(this.gameId).subscribe(game => {
      this.game = game;
    });
  }

  private updateCompetitors(gameId: number) {
    this.gameService.getAllCompetitorsByGame(this.gameId).subscribe(competitors => {
      this.competitors = competitors;
      this.selectableCompetitors = competitors;
    });
  }

  private addCompetitorToBetOptions(competitor: Competitor) {
    const indexFromCompetitors: number = this.selectableCompetitors.indexOf(competitor);
    if (indexFromCompetitors !== -1) {
      this.selectableCompetitors.splice(indexFromCompetitors, 1);
    }

    const betOption: BetOption = new BetOption();
    betOption.competitor = competitor;
    betOption.payoutRate = 1;
    this.matchBetOptions.push(betOption);
  }

  private removeBetOptionFromBetOptions(betOption: BetOption) {
    const indexFromBetOptions: number = this.matchBetOptions.indexOf(betOption);
    if (indexFromBetOptions !== -1) {
      this.matchBetOptions.splice(indexFromBetOptions, 1);
    }

    this.selectableCompetitors.push(betOption.competitor);
  }

  private submit() {
    const match: Match = this.generateMatch();
    this.saveMatch(match);
  }

  private generateMatch(): Match {
    const match = new Match();

    match.title = this.matchTitle;
    match.description = this.matchDescription;
    match.game = this.game;
    match.startDate = new Date(this.matchStartDate + ' ' + this.matchStartTime);
    match.endDate = new Date(this.matchEndDate + ' ' + this.matchEndTime);
    match.betOptions = this.matchBetOptions;

    console.log(match);
    return match;
  }

  private saveMatch(match: Match) {
    this.matchService.addMatch(match.title, match.description, match.game.id, match.startDate, match.endDate, match.betOptions).subscribe(() => {
      const url = '/games/' + this.gameId;
      this.router.navigate([url]);
    });
  }
}
