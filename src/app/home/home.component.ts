import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  on4Click() {
    this.router.navigateByUrl("player?word_length=4");
  }

  on5Click() {
    this.router.navigateByUrl("player?word_length=5");
  }
}
