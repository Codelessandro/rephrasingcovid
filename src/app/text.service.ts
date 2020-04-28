import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextService {

  text: any = {
    'de': {
      'explain_header': 'Covid-19 Gedanken hinzufügen',
      'shuffle' : 'Gedanken mischen',
      'copy': 'Gedanken kopieren',
      'switch_en': 'auf Englisch wechseln',
      'switch_ge': 'auf Deutsch wechseln',
      'impressum': 'Impressum',
      'disclaimer':  'Disclaimer',
      'subtitle': 'Covid-19 Gedankenmaschine',
      'clipboard': 'Gedanken gespeichert im Clipboard',
      'score': 'KI-generierter Positiv-Score',
      'return': 'zurück zu den Gedanken',
      'add': 'Gedanken hinzufügen',
      'speichern': 'Gedanken speichern',
      'long': 'blabla',
      'even': 'Auch wenn',
      'saved_suc': 'Dein Gedanken wurde hinzugefügt.',
      'imprint': 'Impressum',
      'part1': 'Teil 1',
      'part2': 'Teil 2'
    },
    'en': {
      'explain_header': 'Add your Covid-19 quote',
      'shuffle' : 'Shuffle',
      'copy': 'Copy',
      'switch_en': 'switch to English',
      'switch_ge': 'auf Deutsch wechseln',
      'impressum': 'Imprint',
      'disclaimer':  'Disclaimer',
      'subtitle': 'Covid-19  Positive Thought Machine',
      'clipboard': 'It is in your clipboard',
      'score': 'AI-enabled Positivity Score',
      'return': 'Return to Quotes',
      'add': 'Add Quote',
      'speichern': 'Save Quote',
      'long': 'long_en',
      'even': 'Even if',
      'saved_suc': 'Your quote has been saved.',
      'imprint': 'Imprint',
      'part1': 'Part 1',
      'part2': 'Part 2'
    }
  };

  constructor() {
  }

  getText(title, language) {
    return this.text[language][title];
  }


}


