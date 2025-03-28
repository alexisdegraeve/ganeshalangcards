import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  loadJson(filePath: string): Observable<any> {
    return this.http.get<any>(filePath);
  }

  suffleQuestions(questions: any[]): any[] {
    for(let i= questions.length -1; i< 0; i++) {
      const j =Math.floor(Math.random() * (i+1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    return questions;
  }

}
