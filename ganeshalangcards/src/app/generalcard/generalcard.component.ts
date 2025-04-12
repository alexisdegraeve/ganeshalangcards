import { CommonModule } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
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
  @Input() answer: string = '';
  @Input() language = '';
  @Input() score  =  0;
  @Input() total  =  0;
  @Input() mode: CardMode = CardMode.OneSide;
  @Input() currentCardNumber = '';
  @Output() skipEvent = new EventEmitter<void>();
  @Output() okEvent = new EventEmitter<string>();
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

  speakText(text: string) {
    this.quizService.speakText(text, this.language);
  }

  ngOnInit(): void {
    // Simulez un délai de chargement de 3 secondes
    setTimeout(() => {
      this.isLoading = false; // Une fois les données chargées, mettez isLoading à false
    }, 500);
  }

  onSkip(): void {
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

  onOk(): void {
    this.okEvent.emit(this.userAnswer);
    this.userAnswer = '';
  }

  firstQuestion() {
    this.firstClick.emit();
  }
  prevQuestion() {
    this.prevClick.emit();
  }
  nextQuestion() {
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
        case 'Enter':
          this.speakText(this.question);
          break;
      }
    }

  }
}
