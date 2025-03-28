import { Component } from '@angular/core';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game',
  imports: [FlashcardComponent, FormsModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  modeTraining: boolean = true;

}
