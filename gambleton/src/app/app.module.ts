import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatMenuModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule, MatTabsModule,
  MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule, MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';
import {LayoutModule} from '@angular/cdk/layout';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from './services/UserService';
import {AuthGuardService} from './services/Guards/AuthGuardService';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {GamesComponent} from './games/games.component';
import {CreateGameComponent} from './games/create-game/create-game.component';
import {GamesOverviewComponent} from './games/games-overview/games-overview.component';
import {AdminGuardService} from './services/Guards/AdminGuardService';
import {GameService} from './services/GameService';
import {GameDetailComponent} from './games/game-detail/game-detail.component';
import {MatchesComponent} from './matches/matches.component';
import {CreateMatchComponent} from './matches/create-match/create-match.component';
import {AmazingTimePickerModule} from 'amazing-time-picker';
import {MatchService} from './services/MatchService';
import {CompetitorService} from './services/CompetitorService';
import { MatchDetailComponent } from './matches/match-detail/match-detail.component';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {
    path: 'games', component: GamesComponent,
    children: [
      {
        path: '', component: GamesOverviewComponent
      },

      {
        path: 'add', component: CreateGameComponent, canActivate: [AdminGuardService]
      }, {
        path: ':gameId', component: GameDetailComponent
      },
      {
        path: ':gameId/matches/add', component: CreateMatchComponent, canActivate: [AdminGuardService]
      }
    ]
  },
  {
    path: 'matches', component: MatchesComponent,
    children: [
      {
        path: ':matchId', component: MatchDetailComponent
      }
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    GamesComponent,
    CreateGameComponent,
    GamesOverviewComponent,
    GameDetailComponent,
    MatchesComponent,
    CreateMatchComponent,
    MatchDetailComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    AmazingTimePickerModule
  ],
  providers: [CookieService, UserService, AuthGuardService, AdminGuardService, GameService, MatchService, CompetitorService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
