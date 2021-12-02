import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordTileComponent } from './word-tile.component';

describe('WordTileComponent', () => {
  let component: WordTileComponent;
  let fixture: ComponentFixture<WordTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
