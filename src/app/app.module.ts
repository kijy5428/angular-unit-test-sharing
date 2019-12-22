import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameComponentComponent } from './game-component/game-component.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
  { path: 'game', component:  GameComponentComponent},
  { path: 'landingPage',      component: LandingPageComponent },
  { path: '',
    redirectTo: '/landingPage',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    GameComponentComponent,
    LandingPageComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
