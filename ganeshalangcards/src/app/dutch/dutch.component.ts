import { Component } from '@angular/core';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dutch',
  imports: [FormsModule, FlashcardComponent, TranslateModule],
  templateUrl: './dutch.component.html',
  styleUrl: './dutch.component.scss'
})
export class DutchComponent {
    modeTraining: boolean = true;

}
