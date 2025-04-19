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
      imageUrl: '/images/flags/flag_dutch.svg',  // Remplacez par le chemin réel de vos images
      isLoading: false,
      link: '/theme/2',
      class: 'pink',
      language: 'nl'
    },
    {
      title: 'Nederlands',
      subtitle: 'Level B 2.4',
      imageUrl: '/images/flags/flag_dutch.svg',  // Remplacez par le chemin réel de vos images
      isLoading: false,
      link: '/theme/1',
      class: 'pink',
      language: 'nl'
    },
    {
      title: 'Spanish',
      subtitle: 'Level A 0',
      imageUrl: '/images/flags/flag_spain.svg',
      isLoading: false,
      link: '/theme/1',
      class: 'green',
      language: 'es'
    },
    {
      title: 'English',
      subtitle: 'Level C 1',
      imageUrl: '/images/flags/flag_english.svg',
      isLoading: false,
      link: '/theme/1',
      class: 'blue',
      language: 'en'
    }
  ];
  constructor(private router: Router, private activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      const lang = this.activateRoute.snapshot.params['language'];
      console.log(lang);
      this.filtersCardsByLanguage(lang);
    });
  }

  onCardClick(link:string, language: string): void {
    // Rediriger vers le composant flashcard avec l'URL du vocabulaire
    this.router.navigate([link, language]);
  }

  filtersCardsByLanguage(language?: string) {
    if(!language) {
      this.cardsLocal = this.cards;
    } else {
      this.cardsLocal = this.cards.filter(card => card.language ===  language);
    }

  }


}
