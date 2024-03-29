import { Injectable } from '@angular/core';
import { Word4 } from './models/word4';
import { Word5 } from './models/word5';
import { Word6 } from './models/word6';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  private words4 = new Word4();
  private words5 = new Word5();
  private words6 = new Word6();

  public getRandomWord(length: number) {
    switch (length) {
      case 4:
        return this.words4.words[Math.floor(Math.random() * this.words4.words.length)];
      case 5:
        return this.words5.words[Math.floor(Math.random() * this.words5.words.length)];
      case 6:
        return this.words6.words[Math.floor(Math.random() * this.words6.words.length)];
      default:
        throw new Error("Words of length: " + length + " are not supported");
    }
  }

  public isWord(word: string) {
    switch (length) {
      case 4:
        return this.words4.words.includes(word);
      case 5:
        return this.words5.words.includes(word);
      case 6:
        return this.words6.words.includes(word);
      default:
        throw new Error("Words of length: " + length + " are not supported");
    }
  }
}
