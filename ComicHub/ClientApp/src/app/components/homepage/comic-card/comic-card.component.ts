import { Component, OnInit, Input } from '@angular/core';
import { IComicBookInformation } from 'src/app/models/comic-book-information.model';

@Component({
  selector: 'app-comic-card',
  templateUrl: './comic-card.component.html',
  styleUrls: ['./comic-card.component.less']
})
export class ComicCardComponent implements OnInit {
  @Input() comicBook: IComicBookInformation;

  constructor() { }

  ngOnInit() { }
}
