import { Component, OnInit } from '@angular/core';
// Services
import { ComicBookInformationService } from '../../services/comic-book-information.service';
// Models
import { IComicBookInformation } from '../../models/comic-book-information.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.less']
})

export class HomepageComponent implements OnInit {

  comicBookInformation: IComicBookInformation[] = [];

  constructor(
    private comicBookInformationService: ComicBookInformationService,
    private router: Router
) { }

  ngOnInit() {
    this.LoadComicBooks();
  }


  LoadComicBooks() {
    this.comicBookInformationService.loadComicBookInformation().subscribe(
      (information) => {
        this.comicBookInformation = information;
        this.comicBookInformationService.setComicBookInformation(information);
      },
      (error) => {
        console.log(error);
      });
  }

  loadComic(comic: IComicBookInformation) {
    this.router.navigate(['/', 'homepage', comic.slug]);
  }
}
