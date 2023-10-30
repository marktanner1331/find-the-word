import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { RowState } from '../models/row-state';
import { TileState } from '../models/tile-state';
import { WordTileComponent } from '../word-tile/word-tile.component';
import { WordService } from '../word.service';

@Component({
  selector: 'app-word-row',
  templateUrl: './word-row.component.html',
  styleUrls: ['./word-row.component.css']
})
export class WordRowComponent implements OnInit {
  @Input() word?: string;
  @Input() guessedWord?: string;
  @Input() rowState: RowState = RowState.Hidden;

  @Output() onRowComplete: EventEmitter<void> = new EventEmitter();

  @ViewChildren("tiles") tiles?: QueryList<WordTileComponent>;

  private _range: { [key: number]: number[] } = {
    4: [0, 1, 2, 3],
    5: [0, 1, 2, 3, 4],
    6: [0, 1, 2, 3, 4, 5]
  };

  constructor() {
    
  }

  focusFirstInputTile() {
    for(let tile of this.tiles!) {
      if(tile.tileState == TileState.Input) {
        tile.focus();
        break;
      }
    }
  }

  ngOnInit(): void {
  }

  onEmptyLetterDelete(tileIndex: number) {
    if(tileIndex > 0) {
      this.tiles!.get(tileIndex - 1)!.focus();
    }
  }

  onLetterSet(tileIndex: number) {
    if(tileIndex + 1 < this.word!.length) {
      this.tiles!.get(tileIndex + 1)!.focus();
    } else {
      this.guessedWord = "";
      for(let tile of this.tiles!) {
        this.guessedWord += tile.letter;
      }

      this.onRowComplete.next();
    }
  }

  range(max: number) {
    return this._range[max];
  }

  letterAt(i: number): string {
    return this.word!.charAt(i);
  }

  tileStateAt(i: number): TileState {
    if(this.rowState == RowState.Hidden) {
      return TileState.Hidden;
    }

    if(i == 0) {
      return TileState.Correct;
    }

    if(!this.guessedWord) {
      if(this.rowState == RowState.Input) {
        return TileState.Input;
      } else {
        return TileState.Hidden;
      }
    }

    const guessedLetter = this.guessedWord!.charAt(i);
    const actualLetter = this.word!.charAt(i);

    if(guessedLetter == actualLetter) {
      return TileState.Correct;
    }

    if(this.rowState == RowState.Input) {
      return TileState.Input;
    }

    const wordLength = this.word!.length;
    for(let a = 0;a < wordLength;a++) {
      if(this.word?.charAt(a) == this.guessedWord.charAt(a)) {
        continue;
      }

      if(this.guessedWord!.substr(0, i).includes(guessedLetter)) {
        continue;
      }

      if(this.word?.charAt(a) == guessedLetter) {
        return TileState.Warm;
      }
    }

    return TileState.Wrong;
  }

  get wordLength(): number {
    if(this.word) {
      return this.word.length;
    } else {
      return 0;
    }
  }
}
