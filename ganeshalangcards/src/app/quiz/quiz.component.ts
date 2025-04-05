import { Component } from '@angular/core';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  imports: [FormsModule, FlashcardComponent, TranslateModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {
    modeTraining: boolean = true;

}
