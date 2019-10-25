import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// models
import { IComicBookInformation } from '../../../../models/comic-book-information.model';
import { IComicBookCharacter } from '../../../../models/comic-book-characters.model';
import { ComicCardComponent } from './comic-card.component';
import { Component, ViewChild } from '@angular/core';

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

const comicCharacterThree: IComicBookCharacter = {
  id: 3,
  name: 'Character three',
  description: 'Last desc.',
  numberOfRoles: 12000,
  isGood: true,
  image: 'imageUrlThree'
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

const comicBookInformationTwo: IComicBookInformation = {
  id: 1,
  slug: 'slug-two',
  name: 'ComicBook Two',
  description: 'Describing second comic book...',
  issueNumber: 64,
  pages: 16,
  price: 20.5,
  releaseDate: new Date(),
  image: 'imagingUrl_here_please!',
  characters: [comicCharacterTwo, comicCharacterThree]
}

describe('ComicCardComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        ComicCardComponent,
        TestHostComponent
      ],
      imports: [],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
  });

  it('Should create', () => {
    expect(testHostComponent).toBeTruthy();
  });

  it('Should show image', () => {
    const image = testHostFixture.debugElement.nativeElement.querySelector('.card-img-top');

    expect(image).toBeTruthy();
    expect(image.src).toContain('imagingUrl_here?');
  });

  it('Should show correct title', () => {
    const title = testHostFixture.debugElement.nativeElement.querySelector('.card-title');

    expect(title).toBeTruthy();
    expect(title.textContent).toContain('ComicBook One');
  });

  it('Should show correct description', () => {
    const description = testHostFixture.debugElement.nativeElement.querySelector('.card-text');

    expect(description).toBeTruthy();
    expect(description.textContent).toContain('Describing first comic book here');
  });
          
  @Component({
    selector: 'app-comic-card',
    templateUrl: './comic-card.component.html',
  })
  class TestHostComponent {
    @ViewChild(ComicCardComponent, { static: false })
    public comicCardComponent: ComicCardComponent;
    private comicBook: IComicBookInformation = comicBookInformationOne;

    setInput(newInput: IComicBookInformation) {
      this.comicBook = newInput;
    }
  }
});
