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
import { DatePipe } from '@angular/common';

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

describe('ComicPageComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    const spyComicBookInformationService = jasmine.createSpyObj('ComicBookInformationService', {
      getComicBookInformation: of([comicBookInformationOne]),
      setComicBookInformation: true,
      getComicBook: comicBookInformationOne,
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
        { provide: ComicBookInformationService, useValue: spyComicBookInformationService }]
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

  @Component({
    selector: 'app-comic-page',
    templateUrl: './comic-page.component.html',
  })
  class TestHostComponent {
    @ViewChild(ComicPageComponent, { static: false })
    public comicPageComponent: ComicPageComponent;
    private comicBook: IComicBookInformation = comicBookInformationOne;

    setInput(newInput: IComicBookInformation) {
      this.comicBook = newInput;
    }
  }
});
