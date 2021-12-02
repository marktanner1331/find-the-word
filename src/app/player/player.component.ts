import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RowState } from '../models/row-state';
import { WordRowComponent } from '../word-row/word-row.component';
import { WordService } from '../word.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  private wordLength: number = 4;
  private numGames: number = 5;
  private currentGame:number = 0;
  public currentWord?: string;
  RowState: typeof RowState = RowState;
  finished: boolean = false;
  showSolutionRow: boolean = false;
  _showCompleteDialog: boolean = false;

  roundScores: (number | undefined)[] = [];

  currentRowIndex: number = 0;
  @ViewChildren("wordRows") rows!: QueryList<WordRowComponent>;

  constructor(private wordService: WordService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.route.snapshot.queryParamMap.has("word_length")) {
      this.wordLength = parseInt(this.route.snapshot.queryParamMap.get("word_length")!);
    } else {
      this.wordLength = 5;
    }

    this.currentGame = 0;
    this.roundScores = [];
    for(let i = 0; i < this.numGames;i++) {
      this.roundScores.push(undefined);
    }
    
    setTimeout(() => this.newGame(), 50);
  }

  onNextClicked() {
    this._showCompleteDialog = false;
    this.finished = false;
    this.showSolutionRow = false;
    this.currentGame++;
    this.newGame();
  }

  newGame() {
    this.currentWord = this.wordService.getRandomWord(this.wordLength);
    this.currentRowIndex = 0;

    if(this.rows) {
      for(let row of this.rows) {
        row.guessedWord = undefined;
      }

      setTimeout(() => this.rows.first.focusFirstInputTile(), 50);
    }
  }

  getRowState(i:number) {
    switch(true) {
      case i < this.currentRowIndex:
        return RowState.Finished;
      case i == this.currentRowIndex:
        return RowState.Input;
      default:
        return RowState.Hidden;
    }
  }

  showCompleteDialog() {
    this._showCompleteDialog = true;
  }

  onRowCompleted() {
    let currentRow = this.rows.get(this.currentRowIndex)!;
    if(currentRow.guessedWord == this.currentWord) {
      this.finished = true;
      this.roundScores[this.currentGame] = 100 - this.currentRowIndex * 10;
      setTimeout(() => this.showCompleteDialog(), 1000);
      return;
    }

    currentRow.rowState = RowState.Finished;

    this.currentRowIndex++;
    if(this.currentRowIndex == 6) {
      this.showSolutionRow = true;
      this.roundScores[this.currentGame] = 0;
      setTimeout(() => this.showCompleteDialog(), 1000);
      return;
    }

    currentRow = this.rows.get(this.currentRowIndex)!;
    currentRow.rowState = RowState.Input;

    setTimeout(function() {
      currentRow.focusFirstInputTile();
    }, 100);
  }
}
