import { Component, OnInit } from '@angular/core';
// Services
import { ComicBookInformationService } from 'src/app/services/comic-book-information.service';
// Models
import { IComicBookInformation } from 'src/app/models/comic-book-information.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.less']
})

export class HomepageComponent implements OnInit {

  comicBookInformation: IComicBookInformation[] = [];

  constructor(
  private comicBookInformationService: ComicBookInformationService) { }

  ngOnInit() {
    this.LoadComicBooks();
  }


  LoadComicBooks() {
    this.comicBookInformationService.getComicBookInformation().subscribe(
      (information) => {
        this.comicBookInformation = information;
        this.comicBookInformationService.setComicBookInformation(information);
      },
      (error) => {
        console.log(error);
      });
  }
}
