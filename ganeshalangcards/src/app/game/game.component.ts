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
      title: 'Nederlands',
      subtitle: 'Level B 2.4',
      imageUrl: '/images/flags/flag_dutch.svg',  // Remplacez par le chemin réel de vos images
      isLoading: false,
      link: '/theme',
      class: 'pink',
      language: 'nl'
    },
    {
      title: 'Spanish',
      subtitle: 'Level A 0',
      imageUrl: '/images/flags/flag_spain.svg',
      isLoading: false,
      link: '/theme',
      class: 'green',
      language: 'es'
    },
    {
      title: 'English',
      subtitle: 'Level C 1',
      imageUrl: '/images/flags/flag_english.svg',
      isLoading: false,
      link: '/theme',
      class: 'blue',
      language: 'en'
    }
  ];

}
