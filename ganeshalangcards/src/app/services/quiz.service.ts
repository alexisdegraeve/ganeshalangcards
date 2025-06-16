import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private _hardWords: string[] = [];
  _maxquestion = 5;

  constructor(private http: HttpClient) {
        this.resetHardWord();
  }

  getVocabulary(filePath: string): Observable<any> {
    return this.http.get<any>(filePath);
  }

  suffleQuestions(questions: any[]): any[] {
    for(let i= questions.length -1; i> 0; i--) {
      const j =Math.floor(Math.random() * (i+1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    return questions;
  }

  getThemes(language: string, serie?: number): Observable<any> {
    // Utiliser la langue pour construire l'URL du fichier JSON des thèmes
    let url = `/themes_${language}.json`;
    if(serie) {
      url = `/themes_${language}_${serie}.json`;
    }
    return this.http.get(url); // Charger le fichier de thèmes en fonction de la langue
  }

  speakText(text: string, lang: string) {
    const cleanedText = this.stripHtmlTags(text);
    const synth = window.speechSynthesis;
    const speak = () => {
      const voices = synth.getVoices();
      const voice = voices.find(v => v.lang.startsWith(lang)) || voices.find(v => v.lang.startsWith('en'));

      if (!voice) {
        console.warn('No voice found for', lang);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utterance.voice = voice;
      utterance.lang = voice.lang;
      synth.speak(utterance);
    };

    if (synth.getVoices().length === 0) {
      synth.onvoiceschanged = speak;
    } else {
      speak();
    }
  }

  private stripHtmlTags(input: string): string {
    const withoutTags = input.replace(/<\/?[^>]+(>|$)/g, '');
    const withoutEntities = withoutTags.replace(/&[a-z]+;/gi, '');
    const finalCleaned = withoutEntities.replace(/[^\w\sÀ-ÿ']/gi, '');
    return finalCleaned.trim();
  }

  addHardWord(word: string) {
    this._hardWords.push(word);
  }

  resetHardWord() {
    this._hardWords.slice(0);
  }

  get hardWords() {
    return this._hardWords;
  }

  totalQuestions(max: number) {
    this._maxquestion = max;
  }

  get maxQuestions() {
    return this._maxquestion;
  }
}
