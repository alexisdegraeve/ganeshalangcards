import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { QuizService } from '../services/quiz.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-list',
  imports: [CommonModule],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent implements OnInit{
  language: string | null = null;
  $theme: Observable<any> | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private quizzService: QuizService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.language = params.get('language');
      if (this.language)
      {
        this.$theme = this.quizzService.getThemes(this.language);
      }


      if (!this.language) {
        this.router.navigate(['/game']);
      }
    });

  }

}
