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
    private comicInformationService: ComicBookInformationService,
    private router: Router,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    if (this.comicInformationService.comicBookInformation.length === 0) {
      this.comicInformationService.loadComicBookInformation().subscribe(
        (information) => {
          this.comicInformationService.setComicBookInformation(information);
          this.loadInformation();
        },
        (error) => console.log(error));
    } else {
      this.loadInformation();
    }
  }

  loadInformation() {
    const id = this.route.snapshot.paramMap.get("id"); 
    this.comicBook = this.comicInformationService.getComicBook(id);
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
    this.modalService._hideModal(1);
    this.resetValues();
  }

  submitForm(data: any) {
    if (this.isValidated()) {
      this.addNewCharacter();
      this.closeModal();
    }
  }

  addNewCharacter() {
    const oldArray = this.comicBook.characters;
    this.comicBook.characters = [];
    this.newCharacter.id = oldArray.length + 1;
    this.comicBook.characters.push(this.newCharacter);
    for (let i = 0; i < oldArray.length; i++) {
      this.comicBook.characters.push(oldArray[i]);
    }
    this.comicInformationService.updateComicBook(this.comicBook);
  }

  deleteCharacter(character: IComicBookCharacter) {
    this.comicInformationService.deleteCharacter(this.comicBook, character);
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
