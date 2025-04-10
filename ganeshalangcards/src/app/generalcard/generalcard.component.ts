import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardMode } from '../cardmode';
import { TranslateModule } from '@ngx-translate/core';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-generalcard',
  imports: [FormsModule, CommonModule, RouterModule, TranslateModule],
  templateUrl: './generalcard.component.html',
  styleUrl: './generalcard.component.scss'
})
export class GeneralcardComponent implements OnInit {
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

  constructor(private quizService : QuizService) {

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
}
