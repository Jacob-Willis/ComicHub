import { Component, OnInit, Input } from '@angular/core';
import { IComicBookCharacter } from 'src/app/models/comic-book-characters.model';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.less']
})
export class CharacterCardComponent implements OnInit {
  @Input() character: IComicBookCharacter;

  constructor() { }

  ngOnInit() {
  }
}
