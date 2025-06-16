import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { QuizService } from '../services/quiz.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GeneralcardComponent } from '../generalcard/generalcard.component';
import { CardMode } from '../cardmode';
import { QuizzMode } from '../quizzmode';

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
  private _modeTraining: QuizzMode =  QuizzMode.learn;
  QuizzMode = QuizzMode;
  loading = true;
  CardMode = CardMode;
  win = false;
  showinfo = false;

  @Input()
  set modeTraining(value: QuizzMode) {
    this._modeTraining = value;
    this.reset();
  }

  get modeTraining():  QuizzMode {
    return this._modeTraining;
  }

  reset() {
    this.score = 0;
    this.currentQuestionIndex = 0;
    this.quizService.resetHardWord();
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
    if(this.currentQuestionIndex < this.quizService.maxQuestions) {
      this.endQuiz = false;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    } else {
      this.endQuiz = true;
    }
  }

  checkAnswer(correctAnswer: boolean):void {
    if (correctAnswer) {
      this.score++;
    }
    this.currentQuestionIndex++;
    this.showQuestion();
  }

  skipQuestion():void {
    this.currentQuestionIndex++;
    this.showQuestion();
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

    get currentCarQuizzdNumber() {
    return `${this.currentQuestionIndex + 1}  / ${this.quizService.maxQuestions}`;
  }


  get scoreTotal() {
    return `${this.score} / ${this.questions.length}`;
  }
  get checkWin() {
    return this.score > (this.questions.length / 2);
  }

  get maxQuestion() {
      return this.quizService.maxQuestions;
  }

  setMaxQuizz(total: number) {
    if(total < this.questions.length) {
      this.quizService.totalQuestions(total);
    } else {
      this.quizService.totalQuestions(this.questions.length);
    }
  }
}
