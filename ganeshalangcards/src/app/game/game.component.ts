import { Component } from '@angular/core';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-game',
  imports: [FlashcardComponent, FormsModule, TranslateModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  modeTraining: boolean = true;

}
