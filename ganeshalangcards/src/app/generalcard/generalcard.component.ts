import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardMode } from '../cardmode';
import { TranslateModule } from '@ngx-translate/core';

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
  @Input() mode: CardMode = CardMode.OneSide;
  @Output() skipEvent = new EventEmitter<void>();
  @Output() okEvent = new EventEmitter<string>();
  @Output() onCardClick = new EventEmitter();
  CardMode = CardMode;
  flipcard = false;
  userAnswer ='';

  ngOnInit(): void {
    // Simulez un délai de chargement de 3 secondes
    setTimeout(() => {
      this.isLoading = false; // Une fois les données chargées, mettez isLoading à false
    }, 1000);
  }

  onSkip(): void {
    this.skipEvent.emit();
    this.userAnswer = '';
  }

  onCardClickAction(): void {
    this.onCardClick.emit();
  }

  onOk(): void {
    this.okEvent.emit(this.userAnswer);
    this.userAnswer = '';
  }
}
