import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { IComicBookCharacter } from 'src/app/models/comic-book-characters.model';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.less']
})
export class CharacterCardComponent implements OnInit {
  @Input() character: IComicBookCharacter;
  @Output() emitCharacter: EventEmitter<IComicBookCharacter> = new EventEmitter();
  faTimes = faTimes

  constructor() { }

  ngOnInit() {
  }

  deleteCharacter() {
    this.emitCharacter.emit(this.character);
  }
}
