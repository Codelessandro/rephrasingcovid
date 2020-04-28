import {Component, OnInit} from '@angular/core';
import {QuoteService} from './quote.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {TextService} from './text.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  quote: string;
  score1: number = 0;
  score2: number = 0;
  showAddQuote: boolean = false;

  second: any;
  first: any

  face: number = 6;

  textareaEvenIf: any;
  textareaStill: any;


  constructor(public textService: TextService, private _snackBar: MatSnackBar, public quoteService: QuoteService) {
  }

  getSingelQuote() {
    this.quoteService.quote().subscribe(quote => {
      this.quote = quote;
    });
  }

  ngOnInit() {
    this.getSingelQuote();
  }


  shuffle() {
    this.getSingelQuote();
  }

  openSnackBar() {


    this._snackBar.open(this.textService.getText('clipboard', this.quoteService.getCurrentLanguageCode()), null, {
      duration: 2000,
    });


  }

  addQuote() {
    this.showAddQuote = !this.showAddQuote;
  }

  returnQuotes() {
    this.showAddQuote = !this.showAddQuote;
  }

  saveQuote() {
    this.quoteService.saveQuote(this.first, this.second).subscribe( v => {
      this._snackBar.open( this.textService.getText('saved_suc', this.quoteService.getCurrentLanguageCode()), null, {
        duration: 2000,
      });
    });
  }

  calcNormalizedPosScore(pos: number, neg: number) {
    const res = (pos / (pos + neg))*100;
    return res;
  }


  inputfocused($event, isFirst) {
    if (!this.first) {
      this.first = this.textService.getText('even', this.quoteService.getCurrentLanguageCode());
    }
  }

  evScore($event, isFirst) {

    if (isFirst) {
      this.quoteService.evQuote($event).subscribe( (v:any) => {
        this.score1 = this.calcNormalizedPosScore(v.body.SentimentScore.Positive,v.body.SentimentScore.Negative);
      });
      //this.score1 = Math.floor(Math.random() * Math.floor(100));
    } else {
      this.quoteService.evQuote($event).subscribe( (v:any) => {
        this.score2 =this.calcNormalizedPosScore(v.body.SentimentScore.Positive,v.body.SentimentScore.Negative);

        this.face = Math.round(Number(this.score2/25))
        console.log(this.face)

      });
    }
  }

  public toggle(event: MatSlideToggleChange) {
    this.quoteService.changeLanguage();
    this.shuffle();
  }

  valuechange($event, isFirst) {
    if (isFirst) {
      this.first = $event;
    }

    if (!isFirst) {
      this.second = $event;
    }

    this.evScore($event, isFirst);
  }




}


@Component({
  selector: 'snack-bar-component-example-snack',
  template: '<span class="example-pizza-party">\n' +
    '  It is in your clipboard.' +
    '</span>',
  styles: [`
    .example-pizza-party {
      color: white;
    }
  `],
})
export class ClipComponent {
}
