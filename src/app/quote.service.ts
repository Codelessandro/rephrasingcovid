import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  source_cache: any;
  language_cache: any;
  isEng: boolean = true;
  cached: any;
  currentQuote: string;
  quotesURL = 'https://rc454d7yla.execute-api.eu-central-1.amazonaws.com/prod/quotes';
  sentimentsURL = 'https://rc454d7yla.execute-api.eu-central-1.amazonaws.com/prod/sentiment';

  constructor(private http: HttpClient) {

  }

  load() {
    if (this.source_cache) {
      return of(this.source_cache);
    } else {
      return this.http.get(this.quotesURL).pipe(map(v => {
        this.source_cache = v;
        return v;
      }));
    }
  }

  quote() {
    return this.load().pipe(map((v: any) => this.filterEmpty(v)), map(v => this.filterCacheByLanguage(this.isEng, v)), map((v: any) => this.getRandom(v.evenIf) + ', ' + this.getRandom(v.still) + '.'));
  }


  filterEmpty(v) {
    console.log(v)
    return {
      'body' : {
        evenIf: v.body.evenIf.filter(el => el.text !== ''),
        still: v.body.still.filter(el => el.text !== '')
      }
    };
  }

  getRandom(array) {
    return array[Math.floor(Math.random() * array.length)].text;
  }

  filterCacheByLanguage(isEng, v) {
    return {
      evenIf: v.body.evenIf.filter(el => (el.languageCode === 'en') === isEng),
      still: v.body.still.filter(el => (el.languageCode === 'en') === isEng)
    };
  }

  changeLanguage() {
    this.isEng = !this.isEng;
  }

  evQuote(quote) {
    return this.http.post(this.sentimentsURL, {text: quote, language: this.getCurrentLanguageCode()});
  }

  getCurrentLanguageCode() {
    let languageCode;
    if (this.isEng) {
      languageCode = 'en';
    } else {
      languageCode = 'de';
    }
    return languageCode;
  }


  saveQuote(evenIf, still) {


    return this.http.post(this.quotesURL, {evenIf, still, languageCode: this.getCurrentLanguageCode()});
  }

}
