import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
// services
import { ComicBookInformationService } from 'src/app/services/comic-book-information.service';
// components
import { HomepageComponent } from './homepage.component';
// models
import { IComicBookInformation } from 'src/app/models/comic-book-information.model';
import { IComicBookCharacter } from 'src/app/models/comic-book-characters.model';

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
  image: 'imagingUrl here?',
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
  image: 'imagingUrl here please!',
  characters: [comicCharacterTwo, comicCharacterThree]
}

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  beforeEach(async(() => {
    const spyComicBookInformationService = jasmine.createSpyObj('ComicBookInformationService', {
      getComicBookInformation: of([comicBookInformationOne, comicBookInformationTwo]),
      setComicBookInformation: true,
    });

    TestBed.configureTestingModule({
      declarations: [
        HomepageComponent
      ],
      imports: [],
      providers: [
        { provide: ComicBookInformationService, useValue: spyComicBookInformationService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call LoadComicBooks correctly and return a list of comic books and its information', () => {
    component.comicBookInformation = [];

    component.LoadComicBooks();

    expect(component.comicBookInformation).toContain(comicBookInformationOne);
  });
});
