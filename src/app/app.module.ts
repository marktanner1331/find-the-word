import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { WordRowComponent } from './word-row/word-row.component';
import { WordTileComponent } from './word-tile/word-tile.component';
import { CompleteDialogComponent } from './complete-dialog/complete-dialog.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    WordRowComponent,
    WordTileComponent,
    CompleteDialogComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
