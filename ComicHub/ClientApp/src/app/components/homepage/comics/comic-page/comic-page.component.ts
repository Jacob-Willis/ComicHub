import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { ActivatedRoute, Router } from '@angular/router';
import { ComicBookInformationService } from '../../../../services/comic-book-information.service';
import { IComicBookInformation } from '../../../../models/comic-book-information.model';
import { TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { IComicBookCharacter } from 'src/app/models/comic-book-characters.model';

@Component({
  selector: 'app-comic-page',
  templateUrl: './comic-page.component.html',
  styleUrls: ['./comic-page.component.less']
})

export class ComicPageComponent implements OnInit {
  faPlus = faPlus;
  modalRef: BsModalRef;
  comicBook: IComicBookInformation;

  newCharacter: IComicBookCharacter = {
    id: null,
    name: null,
    description: null,
    numberOfRoles: null,
    isGood: null,
    image: null,
  }

  constructor(
    private route: ActivatedRoute,
    private comicInformation: ComicBookInformationService,
    private router: Router,
    private modalService: BsModalService
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

  updateRadioBtn(value: any) {
    if (value === 'good') {
      this.newCharacter.isGood = true;
    } else if (value === 'bad') {
      this.newCharacter.isGood = false;
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });
  }

  closeModal() {
    this.modalService.hide(1);
    this.resetValues();
  }

  submitForm(data: any) {
    this.newCharacter.description = "asdfasd";
    console.log(JSON.stringify(this.newCharacter));
    console.log(data);
    if (this.isValidated()) {
      // add to service list
      this.closeModal();
      this.resetValues();
    }
  }

  resetValues() {
    this.newCharacter = {
      id: null,
      name: null,
      description: null,
      numberOfRoles: null,
      isGood: null,
      image: null,
    }
  }

  isValidated(): boolean {
    return ((this.newCharacter.name === null) || (this.newCharacter.isGood === null)
      || (this.newCharacter.numberOfRoles === null) || (this.newCharacter.image === null)
      || (this.newCharacter.description === null)) ? false : true;
  }

  backPage() {
    this.router.navigate(['/', 'homepage']);
  }
}
