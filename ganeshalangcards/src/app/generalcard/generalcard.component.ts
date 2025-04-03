import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-generalcard',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './generalcard.component.html',
  styleUrl: './generalcard.component.scss'
})
export class GeneralcardComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() imageUrl: string = '';
  @Input() icon: string = '';  // Vous pouvez ajouter un icône si nécessaire
  @Input() isLoading: boolean = false;
  @Input() link: string = '';
  @Input() class: string = '';
  @Input() hover = true;

}
