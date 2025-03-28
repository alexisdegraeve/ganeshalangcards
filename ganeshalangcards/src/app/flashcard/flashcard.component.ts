import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { QuizService } from '../services/quiz.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-flashcard',
  imports: [CommonModule, TranslateModule, FormsModule],
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.scss'
})
export class FlashcardComponent implements OnInit{
  @Input() showFront = true;
  @Input() quizFile = '';
  score: number = 0;
  currentQuestion: any = {};
  currentQuestionIndex: number = 0;
  userAnswer: string = '';
  theme: string = '';
  questions: any[] = [];
  endQuiz = false;

  constructor(private quizService: QuizService){}

  ngOnInit(): void {
    this.loadQuiz(this.quizFile);
  }

  private loadQuiz(filePath: string): void {
    this.quizService.loadJson(filePath).subscribe(data => {
      this.questions = [...data[0].questions];
      this.theme = data[0].theme;
      this.showQuestion();
    })
  }

  showQuestion() {
    if(this.currentQuestionIndex < this.questions.length) {
      this.endQuiz = false;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      this.userAnswer = '';
    } else {
      this.endQuiz = true;
    }
  }

  checkAnswer():void {
    console.log(this.userAnswer.trim().toLowerCase());
    console.log(this.currentQuestion.answers[0].trim().toLowerCase());
    if (this.checkInAnswers(this.userAnswer, this.currentQuestion.answers)) {
      this.score++;
    }
    this.currentQuestionIndex++;
    this.showQuestion();
  }

  private checkInAnswers(userAnswer: string, answers: string[]): boolean {
    return answers.some((answer: string) => this.cleanString(answer) === this.cleanString(userAnswer));
  }

  private cleanString(str: string): string {
    return str
      .replace(/[.?!:]/g, '') // Supprime les signes de ponctuation
      .trim() // Supprime les espaces en début/fin
      .toLowerCase(); // Met en minuscules pour éviter les erreurs de casse
  }



}
