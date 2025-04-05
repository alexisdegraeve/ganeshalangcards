import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardMode } from '../cardmode';

@Component({
  selector: 'app-generalcard',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './generalcard.component.html',
  styleUrl: './generalcard.component.scss'
})
export class GeneralcardComponent {
  @Input() title: string  = '';
  @Input() subtitle: string  = '';
  @Input() imageUrl: string = '';
  @Input() icon: string = '';  // Vous pouvez ajouter un icône si nécessaire
  @Input() isLoading: boolean = false;
  @Input() link: string = '';
  @Input() class: string = '';
  @Input() question: string = '';
  @Input() answer: string = '';
  @Input() language = '';
  @Input() mode: CardMode = CardMode.OneSide;
  @Output() skipEvent = new EventEmitter<void>();
  @Output() okEvent = new EventEmitter<string>();
  CardMode = CardMode;
  flipcard = false;
  userAnswer ='';

  onSkip(): void {
    this.skipEvent.emit();
    this.userAnswer = '';
  }

  onOk(): void {
    this.okEvent.emit(this.userAnswer);
    this.userAnswer = '';
  }
}
