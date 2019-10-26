import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { IComicBookCharacter } from 'src/app/models/comic-book-characters.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.less']
})
export class CharacterCardComponent implements OnInit {
  @Input() character: IComicBookCharacter;
  @Output() emitCharacter: EventEmitter<IComicBookCharacter> = new EventEmitter();

  modalRef: BsModalRef;
  faTimes = faTimes

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  deleteCharacter() {
    this.emitCharacter.emit(this.character);
    this.closeModal();
  }

  closeModal() {
    this.modalService._hideModal(1);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });
  }
}
