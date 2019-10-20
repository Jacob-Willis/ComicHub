import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComicBookInformationService } from '../../../../services/comic-book-information.service';
import { IComicBookInformation } from '../../../../models/comic-book-information.model';

@Component({
  selector: 'app-comic-page',
  templateUrl: './comic-page.component.html',
  styleUrls: ['./comic-page.component.less']
})
export class ComicPageComponent implements OnInit {

  comicBook: IComicBookInformation;

  constructor(
    private route: ActivatedRoute,
    private comicInformation: ComicBookInformationService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.comicInformation.comicBookInformation.length === 0) {
      this.comicInformation.loadComicBookInformation().subscribe(
        (information) => {
          this.comicInformation.setComicBookInformation(information);
          this.loadInformation();
        },
        (error) => console.log(error));
    } else {
      this.loadInformation();
    }
  }

  loadInformation() {
    const id = this.route.snapshot.paramMap.get("id"); 
    this.comicBook = this.comicInformation.getComicBook(id);
  }

  backPage() {
    this.router.navigate(['/', 'homepage']);
  }
}
