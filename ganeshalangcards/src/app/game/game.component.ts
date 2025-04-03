import { Component } from '@angular/core';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-game',
  imports: [FormsModule, TranslateModule, RouterModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  modeTraining: boolean = true;

}
