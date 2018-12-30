import {Component, OnInit} from '@angular/core';
import {MatchService} from '../../services/MatchService';
import {Match} from '../../models/Match';
import {ActivatedRoute} from '@angular/router';
import {BetOption} from '../../models/BetOption';
import {UserService} from '../../services/UserService';
import {Bet} from '../../models/Bet';
import {User} from '../../models/User';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})
export class MatchDetailComponent implements OnInit {

  private matchService: MatchService;
  private activatedRoute: ActivatedRoute;
  private userService: UserService;
  private placedBet: Bet;
  private userUpdatedSubject: Subject<boolean>;

  match: Match;
  matchId: number;
  user: User;
  showPageBlocker: boolean;


  constructor(matchService: MatchService, activatedRoute: ActivatedRoute, userService: UserService) {
    this.userService = userService;
    this.matchService = matchService;
    this.activatedRoute = activatedRoute;
    this.showPageBlocker = false;
    this.userUpdatedSubject = this.userService.userUpdated;

    this.activatedRoute.params.subscribe(params => {
      this.matchId = params['matchId'];
      this.updateMatch(this.matchId);
    });

    this.user = userService.loggedInUser;

    this.userUpdatedSubject.subscribe(() => {
      this.updateView();
    });

  }

  ngOnInit() {
  }

  private updateMatch(matchId: number) {
    this.matchService.getMatch(matchId).subscribe(match => {
      this.match = match;
    });
  }

  private placeBet(betOption: BetOption, amountOfMoney: number) {
    this.showPageBlocker = true;
    this.userService.PlaceBet(this.userService.loggedInUser, betOption, amountOfMoney);
  }

  getPlacedBetOfCurrentMatch(): Bet {
    const user: User = this.userService.loggedInUser;
    const match: Match = this.match;
    let placedBet: Bet = null;

    if (this.placedBet) {
      return this.placedBet;
    }

    if (!user) {
      return null;
    }

    user.bets.forEach(bet => {
      match.betOptions.forEach(function (betOption) {
        if (bet.betOption.id === betOption.id) {
          placedBet = bet;
        }
      });
    });

    this.placedBet = placedBet;
    return placedBet;
  }

  private updateView() {
    this.userService.restoreLoggedInUser().subscribe();
    this.updateMatch(this.matchId);
    this.placedBet = undefined;
    this.getPlacedBetOfCurrentMatch();
    this.showPageBlocker = false;
  }
}
