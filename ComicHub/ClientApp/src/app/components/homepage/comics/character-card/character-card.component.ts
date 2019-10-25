import { Component, OnInit, Input } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { IComicBookCharacter } from 'src/app/models/comic-book-characters.model';

import { ComicBookInformationService } from 'src/app/services/comic-book-information.service';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.less']
})
export class CharacterCardComponent implements OnInit {
  @Input() character: IComicBookCharacter;
  faTimes = faTimes

  constructor(private comicService: ComicBookInformationService) { }

  ngOnInit() {
  }

  deleteCharacter() {
    // service call to delete character and update other components
  }
}
