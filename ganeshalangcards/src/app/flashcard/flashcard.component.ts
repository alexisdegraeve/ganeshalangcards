import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { QuizService } from '../services/quiz.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GeneralcardComponent } from '../generalcard/generalcard.component';
import { CardMode } from '../cardmode';

@Component({
  selector: 'app-flashcard',
  imports: [CommonModule, TranslateModule, FormsModule, GeneralcardComponent],
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.scss'
})
export class FlashcardComponent implements OnInit{
  @Input() showFront = true;
  @Input() questions: any[] = [];
  @Input() theme: string = '';
  @Input() class: string = '';
  langRead: string = '';
  language: string = '';
  score: number = 0;
  currentQuestion: any = {};
  currentQuestionIndex: number = 0;
  // userAnswer: string = '';
  endQuiz = false;
  private _modeTraining: boolean = false;
  loading = true;
  CardMode = CardMode;
  win = false;

  @Input()
  set modeTraining(value: boolean) {
    this._modeTraining = value;
    this.reset();
  }

  get modeTraining(): boolean {
    return this._modeTraining;
  }

  reset() {
    this.score = 0;
    this.currentQuestionIndex = 0;
    this.endQuiz = false;
  }

  constructor(private route: ActivatedRoute, private quizService: QuizService){
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const quizFile = params['quizFile'];
      if (quizFile) {
        this.quizService. getVocabulary(quizFile).subscribe((data) => {
          // this.questions = [...data[0].questions];
          this.questions = [...this.quizService.suffleQuestions(data[0].questions)];
          this.langRead = data[0].langread ? data[0].langread : params['language'];
          this.loading = false;
          this.firstQuestion();
        });
      }
      this.theme = params['theme'];
      this.class = params['class'];
      this.language = params['language'];
    });
  }

  showQuestion() {
    if(this.currentQuestionIndex < this.questions.length) {
      this.endQuiz = false;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    } else {
      this.endQuiz = true;
    }
  }

  checkAnswer(answer: string):void {
    if (this.checkInAnswers(answer, this.currentQuestion.answers)) {
      this.score++;
    }
    this.currentQuestionIndex++;
    this.showQuestion();
  }

  skipQuestion():void {
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

  nextQuestion() {
    if(this.currentQuestionIndex < this.questions.length)
      {
        this.currentQuestionIndex++;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
      }
  }

  prevQuestion() {
    if(this.currentQuestionIndex > 0)
       {
        this.currentQuestionIndex--;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
       }
  }

  firstQuestion() {
    this.currentQuestionIndex = 0;
    this.currentQuestion = this.questions[this.currentQuestionIndex];
  }

  lastQuestion() {
    this.currentQuestionIndex = this.questions.length - 1;
    this.currentQuestion = this.questions[this.currentQuestionIndex];
  }

  get checkLastQuestion() {
    return  this.currentQuestionIndex === (this.questions.length - 1);
  }

  get checkFirstQuestion() {
    return  this.currentQuestionIndex === 0;
  }

  get currentCardNumber() {
    return `${this.currentQuestionIndex + 1}  / ${this.questions.length}`;
  }

  get scoreTotal() {
    return `${this.score} / ${this.questions.length}`;
  }
  get checkWin() {
    return this.score > (this.questions.length / 2);
  }

}
