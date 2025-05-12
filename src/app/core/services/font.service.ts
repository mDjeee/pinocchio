import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FontService {
  private fontFamilySubject = new BehaviorSubject<string>('"Golos Text", sans-serif');
  fontFamily$ = this.fontFamilySubject.asObservable();

  constructor() {}

  setFontFamily(fontFamily: string) {
    this.fontFamilySubject.next(fontFamily);
    this.applyFontFamilyToBody(fontFamily);
  }

  private applyFontFamilyToBody(fontFamily: string) {
    localStorage.setItem('font', fontFamily);
    document.body.style.setProperty('--app-font-family', fontFamily);
  }
}
