import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DutchComponent } from './dutch/dutch.component';
import { EnglishComponent } from './english/english.component';
import { SpanishComponent } from './spanish/spanish.component';

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
    path: 'english',
    component: EnglishComponent
  },
  {
    path: 'spanish',
    component: SpanishComponent
  },
  {
    path: '**', // Route pour la page 404 (toutes les routes inconnues)
    component: PageNotFoundComponent
  }
];
