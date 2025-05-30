import { CommonModule } from '@angular/common';
import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardMode } from '../cardmode';
import { TranslateModule } from '@ngx-translate/core';
import { QuizService } from '../services/quiz.service';
import { Question } from '../question';

@Component({
  selector: 'app-generalcard',
  imports: [FormsModule, CommonModule, RouterModule, TranslateModule],
  templateUrl: './generalcard.component.html',
  styleUrl: './generalcard.component.scss'
})
export class GeneralcardComponent implements OnInit, AfterViewChecked {
  @Input() title: string  = '';
  @Input() subtitle: string  = '';
  @Input() imageUrl: string = '';
  @Input() icon: string = '';  // Vous pouvez ajouter un icône si nécessaire
  @Input() isLoading: boolean = true;
  @Input() link: string | undefined = '';
  @Input() class: string = '';
  @Input() question: string = '';
  @Input() langRead: string = '';
  @Input() answers: string[] = [];
  @Input() language = '';
  @Input() score  =  0;
  @Input() total  =  0;
  @Input() mode: CardMode = CardMode.OneSide;
  @Input() currentCardNumber = '';
  @Input() correctAnswer = false;
  @Output() skipEvent = new EventEmitter<void>();
  @Output() okEvent = new EventEmitter<boolean>();
  @Output() onCardClick = new EventEmitter();
  @Output() firstClick = new EventEmitter();
  @Output() prevClick = new EventEmitter();
  @Output() nextClick = new EventEmitter();
  @Output() lastClick = new EventEmitter();
  @Output() restartClick = new EventEmitter();
  @Input() disableFirst: boolean = true;
  @Input() disableLast: boolean = true;
  CardMode = CardMode;
  flipcard = false;
  showSolution = false;
  userAnswer ='';
  @ViewChild('inputAnswer') inputAnswer!: ElementRef;
  @ViewChild('doubleSideDiv') doubleSideDiv?: ElementRef<HTMLDivElement>;

  constructor(private quizService : QuizService) {

  }


  ngAfterViewChecked(): void {
    if (this.mode === CardMode.DoubleSide && !this.isLoading && this.doubleSideDiv) {
      this.doubleSideDiv.nativeElement.focus();
    }
    if (this.mode === CardMode.question && !this.isLoading) {
      setTimeout(() => {
        if (this.inputAnswer) {
          this.inputAnswer.nativeElement.focus();
        }
      });
    }
  }

  speakText(text: string, question: boolean = true) {
    if(question) {
      this.quizService.speakText(text, this.langRead);
    } else {
      this.quizService.speakText(text, this.language);
    }

  }

  ngOnInit(): void {
    // Simulez un délai de chargement de 3 secondes
    setTimeout(() => {
      this.isLoading = false; // Une fois les données chargées, mettez isLoading à false
    }, 500);
  }

  onSkip(): void {
    this.showSolution = false;
    this.skipEvent.emit();
    this.userAnswer = '';
  }

  onCardClickAction(): void {
    this.flipcard = true;
    setTimeout(() => {
      this.flipcard = false;
      this.onCardClick.emit();
    }, 500);

  }

  actionFlipCard() {
    this.flipcard = !this.flipcard;
    this.showSolution = false;
  }

    private checkInAnswers(userAnswer: string, answers: string[]): boolean {
    return answers.some((answer: string) => this.cleanString(answer) === this.cleanString(userAnswer));
  }

  private cleanString(str: string): string {
    return str
      .replace(/[.?¿!¡:]/g, '') // Supprime les signes de ponctuation
      .trim() // Supprime les espaces en début/fin
      .toLowerCase(); // Met en minuscules pour éviter les erreurs de casse
  }

  onOk(): void {
    this.showSolution = true;
//    this.flipcard = !this.flipcard;
    this.flipcard = !this.flipcard;
     if (this.checkInAnswers(this.userAnswer, this.answers)) {
      this.correctAnswer = true;
        }else {
          this.correctAnswer = false;
    }
    setTimeout(() => {
      this.flipcard = !this.flipcard;
      this.showSolution = false;
      this.okEvent.emit(this.correctAnswer);
      this.userAnswer = '';
    }, 3000);



  }

  firstQuestion() {
    this.firstClick.emit();
  }
  prevQuestion() {
    this.prevClick.emit();
  }
  nextQuestion() {
    this.showSolution = false;
    this.nextClick.emit();
  }
  lastQuestion() {
    this.lastClick.emit();
  }

  restart() {
    this.restartClick.emit();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(this.mode=== CardMode.DoubleSide) {
      switch (event.key) {
        case 'ArrowRight':
          if (!this.disableLast) this.nextQuestion();
          break;
        case 'ArrowLeft':
          if (!this.disableFirst) this.prevQuestion();
          break;
        case 'Home':
          if (!this.disableFirst) this.firstQuestion();
          break;
        case 'End':
          if (!this.disableLast) this.lastQuestion();
          break;
        case ' ':
          this.flipcard = !this.flipcard;
          break;
        case 'Enter':
          if(!this.flipcard) {
            this.speakText(this.question);
          } else {
            this.speakText(this.answers.toString());
          }

          break;
      }
    }

  }

  onSwipeRight() {
    this.nextQuestion();
  }

  onSwipeLeft() {
    this.prevQuestion();
  }

  getGradient(color: string): string {
    return `linear-gradient(to top, ${color} 4%, #fff 60%)`;
  }
}
