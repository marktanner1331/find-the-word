import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complete-dialog',
  templateUrl: './complete-dialog.component.html',
  styleUrls: ['./complete-dialog.component.css']
})
export class CompleteDialogComponent implements OnInit {
  @Input() roundScores: (number | undefined)[] = [];
  @Output() nextRoundClick: EventEmitter<void> = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  totalScore(): number {
    let score = 0;
    for(let roundScore of this.roundScores) {
      score += roundScore ?? 0;
    }

    return score;
  }

  isFull():boolean {
    return this.roundScores[this.roundScores.length - 1] != undefined;
  }

  home() {
    this.router.navigateByUrl("/");
  }

  nextRound() {
    this.nextRoundClick.next();
  }
}
