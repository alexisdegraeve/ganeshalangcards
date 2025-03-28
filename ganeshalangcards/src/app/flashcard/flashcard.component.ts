import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-flashcard',
  imports: [CommonModule, TranslateModule],
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.scss'
})
export class FlashcardComponent implements OnInit{
  @Input() showFront = true;
  @Input() quizFile = '';
  score: number = 0;
  currentQuestion: any = {};
  useAnwer: string = '';
  questions: any[] = [];

  constructor(private quizService: QuizService){}

  ngOnInit(): void {
    this.loadQuiz(this.quizFile);
  }

  private loadQuiz(filePath: string): void {
    this.quizService.loadJson(filePath).subscribe(data => {
      this.questions = [...data];
    })
  }


}
