import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComicBookInformationService } from 'src/app/services/comic-book-information.service';
import { IComicBookInformation } from 'src/app/models/comic-book-information.model';

@Component({
  selector: 'app-comic-page',
  templateUrl: './comic-page.component.html',
  styleUrls: ['./comic-page.component.less']
})
export class ComicPageComponent implements OnInit {

  comicBook: IComicBookInformation;

  constructor(
    private route: ActivatedRoute,
    private comicInformation: ComicBookInformationService
  ) { }

  ngOnInit() {
    this.loadInformation();
  }

  loadInformation() {
    const id = this.route.snapshot.paramMap.get("id");
    this.comicBook = this.comicInformation.getComicBook(id);
  }
}
