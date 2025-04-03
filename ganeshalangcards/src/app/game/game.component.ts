import { Component } from '@angular/core';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { GeneralcardComponent } from "../generalcard/generalcard.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  imports: [FormsModule, TranslateModule, RouterModule, GeneralcardComponent, CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  modeTraining: boolean = true;

  cards = [
    {
      title: 'Card 1',
      subtitle: 'Subtitle 1',
      imageUrl: 'assets/images/image1.jpg',  // Remplacez par le chemin réel de vos images
      icon: 'bi-heart',  // Optionnel : icône Bootstrap (par exemple, bi-heart)
      isLoading: false
    },
    {
      title: 'Card 2',
      subtitle: 'Subtitle 2',
      imageUrl: 'assets/images/image2.jpg',
      icon: 'bi-star',
      isLoading: false
    },
    {
      title: 'Card 3',
      subtitle: 'Subtitle 3',
      imageUrl: 'assets/images/image3.jpg',
      icon: 'bi-moon',
      isLoading: false
    }
  ];

}
