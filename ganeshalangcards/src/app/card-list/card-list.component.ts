import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { QuizService } from '../services/quiz.service';
import { CommonModule } from '@angular/common';
import { GeneralcardComponent } from '../generalcard/generalcard.component';
import { CardMode } from '../cardmode';

@Component({
  selector: 'app-card-list',
  imports: [CommonModule, GeneralcardComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent implements OnInit{
  language = '';
  theme$: Observable<any> | null = null;

  CardMode = CardMode;

  cards: any[] = []; // Liste des cartes
  currentPage: number = 1; // Page courante
  itemsPerPage: number = 5; // Nombre d'éléments par page
  totalItems: number = 0; // Nombre total d'éléments
  themeId: string = ''; // ID du thème (utilisé pour les redirections)


  constructor(private route: ActivatedRoute, private router: Router, private quizzService: QuizService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.language = params.get('language') ?? '';
      if (this.language)
      {
        this.theme$ = this.quizzService.getThemes(this.language);
      }


      if (!this.language) {
        this.router.navigate(['/game']);
      }
    });

  }

  onThemeClick(url: string, title: string, classColor: string): void {
    // Rediriger vers le composant flashcard avec l'URL du vocabulaire
    this.router.navigate(['/flashcard'], { queryParams: { quizFile: url, class: classColor, theme: title, language: this.language } });
  }

    // Fonction pour changer la page
    onPageChange(page: number): void {
      this.currentPage = page;
    }

      // Fonction de pagination : slice les éléments en fonction de la page actuelle
  get paginatedCards(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.cards.slice(startIndex, endIndex);
  }

}
