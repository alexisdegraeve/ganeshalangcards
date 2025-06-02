import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { GeneralcardComponent } from "../generalcard/generalcard.component";
import { CommonModule } from '@angular/common';
import { CardMode } from '../cardmode';
import { CardLanguage } from '../cardlanguage.model.';

@Component({
  selector: 'app-game',
  imports: [FormsModule, TranslateModule, RouterModule, GeneralcardComponent, CommonModule, RouterModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  modeTraining: boolean = true;
  CardMode = CardMode;
  cardsLocal: CardLanguage[] = [];
  cards:CardLanguage[] = [
    {
      title: 'Nederlands',
      subtitle: 'Level B 2.3',
      imageUrl: '/images/moulin.svg', 
      imageWidth: 10, // Remplacez par le chemin réel de vos images
      isLoading: false,
      link: '/theme',
      class: 'pink',
      language: 'nl',
      serie: 23,
    },
    {
      title: 'Nederlands',
      subtitle: 'Level B 2.4',
      imageUrl: '/images/moulin.svg',  // Remplacez par le chemin réel de vos images
      imageWidth: 10,
      isLoading: false,
      link: '/theme',
      class: 'pink',
      language: 'nl',
      serie: 24
    },
    {
      title: 'Spanish',
      subtitle: 'Level A 0',
      imageUrl: '/images/espana.svg',
      imageWidth: 28,
      isLoading: false,
      link: '/theme',
      class: 'green',
      language: 'es'
    },
    {
      title: 'English',
      subtitle: 'Level C 1',
      imageUrl: '/images/soldier.svg',
      imageWidth: 4,
      isLoading: false,
      link: '/theme',
      class: 'blue',
      language: 'en'
    }
  ];
  constructor(private router: Router, private activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      const lang = this.activateRoute.snapshot.params['language'];
      this.filtersCardsByLanguage(lang);
    });
  }

  onCardClick(link:string, language: string, serie?: number): void {
    // Rediriger vers le composant flashcard avec l'URL du vocabulaire
    const url: (string | number)[] = [link, language];
    if (serie !== undefined) url.push(serie);
    this.router.navigate(url);

  }

  filtersCardsByLanguage(language?: string) {
    if(!language) {
      this.cardsLocal = this.cards;
    } else {
      this.cardsLocal = this.cards.filter(card => card.language ===  language);
    }

  }


}
