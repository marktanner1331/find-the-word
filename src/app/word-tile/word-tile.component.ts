import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TileState } from '../models/tile-state';

@Component({
  selector: 'app-word-tile',
  templateUrl: './word-tile.component.html',
  styleUrls: ['./word-tile.component.css']
})
export class WordTileComponent implements OnInit {
  TileState: typeof TileState = TileState;

  @Input() letter?: string;
  @Input() tileState: TileState = TileState.Hidden;

  @Output() onLetterSet: EventEmitter<void> = new EventEmitter();
  @Output() onEmptyLetterDelete: EventEmitter<void> = new EventEmitter();

  @ViewChild('inputSpan') inputSpan?: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  focus() {
    this.inputSpan!.nativeElement.innerText = '';
    this.inputSpan!.nativeElement.focus();
  }

  onKeyDown(event: KeyboardEvent) {
    if(event.key.match(/^backspace$/i)) {
      this.letter = "";

      if(this.inputSpan!.nativeElement.innerText == '') {
        this.onEmptyLetterDelete.next();
      } else {
        this.inputSpan!.nativeElement.innerText = '';
      }
    }
  }

  onKeyUp(event: KeyboardEvent) {
    if(event.key.match(/^[a-z]$/i)) {
      this.letter = event.key;
      
      this.inputSpan!.nativeElement.innerText = event.key;
      this.onLetterSet.next();
    }
  }
}
