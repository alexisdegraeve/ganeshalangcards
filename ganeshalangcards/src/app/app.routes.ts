import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CardListComponent } from './card-list/card-list.component';
import { FlashcardComponent } from './flashcard/flashcard.component';

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
    path: 'game/:language',
    component: GameComponent
  },
  {
    path: 'flashcard',
    component: FlashcardComponent
  },
  {
    path: 'theme/:season/:language',
    component: CardListComponent
  },
  {
    path: '**', // Route pour la page 404 (toutes les routes inconnues)
    component: PageNotFoundComponent
  }
];
