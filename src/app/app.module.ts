import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameComponentComponent } from './game-component/game-component.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MainPageComponent } from './main-page/main-page.component';
import { GameInfoComponent } from './game-info/game-info.component';

const appRoutes: Routes = [
  { path: 'landingPage', component: LandingPageComponent },
  { path: 'game', component:  GameComponentComponent},
  { path: 'gameInfo', component:  GameInfoComponent},
  { path: '',
    redirectTo: '/landingPage',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    GameComponentComponent,
    LandingPageComponent,
    MainPageComponent,
    GameInfoComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
