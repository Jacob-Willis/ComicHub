import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

import { ComicPageComponent } from './comic-page.component';
import { ComicBookInformationService } from 'src/app/services/comic-book-information.service';
import { of } from 'rxjs';
import { IComicBookInformation } from 'src/app/models/comic-book-information.model';
import { IComicBookCharacter } from 'src/app/models/comic-book-characters.model';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { Component, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';

const comicCharacterOne: IComicBookCharacter = {
  id: 1,
  name: 'Character One',
  description: 'Description goes here',
  numberOfRoles: 55,
  isGood: true,
  image: 'imageUrlOne'
}

const comicCharacterTwo: IComicBookCharacter = {
  id: 2,
  name: 'Character Two',
  description: 'Another Description here',
  numberOfRoles: 10000,
  isGood: false,
  image: 'imageUrlTwo'
}

const newComicCharacter: IComicBookCharacter = {
  id: null,
  name: 'Newbie',
  description: 'New',
  numberOfRoles: 1,
  isGood: true,
  image: 'newImage'
}

const comicBookInformationOne: IComicBookInformation = {
  id: 1,
  slug: 'slugOne',
  name: 'ComicBook One',
  description: 'Describing first comic book here',
  issueNumber: 16,
  pages: 22,
  price: 22.5,
  releaseDate: new Date(),
  image: 'imagingUrl_here?',
  characters: [comicCharacterOne, comicCharacterTwo]
}

fdescribe('ComicPageComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {

    const spyComicBookInformationService = jasmine.createSpyObj('ComicBookInformationService', {
      getComicBookInformation: of([comicBookInformationOne]),
      setComicBookInformation: true,
      getComicBook: comicBookInformationOne,
      updateComicBook: true,
    });

    TestBed.configureTestingModule({
      declarations: [
        ComicPageComponent,
        CharacterCardComponent,
        TestHostComponent
      ],
      providers: [
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy("navigate"); }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get(): string {
                  return '123';
                },
              },
            },
          },
        },
        { provide: ComicBookInformationService, useValue: spyComicBookInformationService },
        BsModalService,
        ComponentLoaderFactory,
        PositioningService
      ],
      imports: [
        FontAwesomeModule,
        FormsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
  });

  it('should create', () => {
    expect(testHostComponent).toBeTruthy();
  });

  it('Should show correct image', () => {
    const image = testHostFixture.debugElement.nativeElement.querySelector('.image');

    expect(image).toBeTruthy();
    expect(image.src).toContain('imagingUrl_here?');
  });

  it('Should show correct title', () => {
    const title = testHostFixture.debugElement.nativeElement.querySelector('.comic-title');

    expect(title).toBeTruthy();
    expect(title.textContent).toContain('ComicBook One');
  });

  it('Should show correct issue number', () => {
    const issueNumber = testHostFixture.debugElement.nativeElement.querySelector('.issue-number');

    expect(issueNumber).toBeTruthy();
    expect(issueNumber.textContent).toContain('16');
  });

  it('Should show correct number of pages', () => {
    const pages = testHostFixture.debugElement.nativeElement.querySelector('.pages');

    expect(pages).toBeTruthy();
    expect(pages.textContent).toContain('22');
  });

  it('Should show correct release date', () => {
    const releaseDate = testHostFixture.debugElement.nativeElement.querySelector('.release-date');
    const currentDate = new Date();

    expect(releaseDate).toBeTruthy();
    expect(releaseDate.textContent).toContain(currentDate.getDate());
    expect(releaseDate.textContent).toContain(currentDate.getMonth());
    expect(releaseDate.textContent).toContain(currentDate.getFullYear());
  });

  it('Should have two comics', () => {
    const comicCard = testHostFixture.debugElement.nativeElement.querySelectorAll(".characters-card");

    expect(comicCard).toBeTruthy();
    expect(comicCard.length).toBe(2);
  });

  it('Should update radio buttons correctly', () => {
    testHostComponent.comicComponent.updateRadioBtn('good');
    expect(testHostComponent.comicComponent.newCharacter.isGood).toBeTruthy();

    testHostComponent.comicComponent.updateRadioBtn('bad');
    expect(testHostComponent.comicComponent.newCharacter.isGood).toBeFalsy();
  });

  fit('Should add new character to list', () => {
    testHostComponent.comicComponent.newCharacter = newComicCharacter;
    testHostComponent.comicComponent.comicBook = comicBookInformationOne;
    expect(testHostComponent.comicComponent.comicBook.characters.length).toBe(2);

    testHostComponent.comicComponent.addNewCharacter();
    expect(testHostComponent.comicComponent.comicBook.characters.length).toBe(3);
  });

  @Component({
    selector: 'app-comic-page',
    templateUrl: './comic-page.component.html',
  })
  class TestHostComponent {
    @ViewChild(ComicPageComponent, { static: false })
    public comicPageComponent: ComicPageComponent;

    route: ActivatedRoute;
    spyComicBookInformationService: ComicBookInformationService;
    router: Router;
    modalService: BsModalService;
    public comicComponent = new ComicPageComponent(this.route, this.spyComicBookInformationService, this.router, this.modalService);

    private comicBook: IComicBookInformation = comicBookInformationOne;

    setInput(newInput: IComicBookInformation) {
      this.comicBook = newInput;
    }
  }
});
