import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ganeshalangcards';
  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    // Détecte la langue du navigateur
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|fr/) ? browserLang : 'en');
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
