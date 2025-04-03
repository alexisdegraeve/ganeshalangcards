import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DutchComponent } from './dutch/dutch.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'game', // Redirige la racine vers /game
    pathMatch: 'full'
  },
  {
    path: 'game',
    component: GameComponent
  },
  {
    path: 'dutch',
    component: DutchComponent
  },
  {
    path: '**', // Route pour la page 404 (toutes les routes inconnues)
    component: PageNotFoundComponent
  }
];
