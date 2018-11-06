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
  MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule, MatProgressSpinnerModule
} from '@angular/material';
import {LayoutModule} from '@angular/cdk/layout';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from './services/UserService';
import {AuthGuardService} from './services/AuthGuardService';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GamesComponent } from './games/games.component';
import { CreateGameComponent } from './games/create-game/create-game.component';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'games', component: GamesComponent},
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
    HttpClientModule
  ],
  providers: [CookieService, UserService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
