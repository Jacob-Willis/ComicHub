import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
// services
import { ComicBookInformationService } from '../../services/comic-book-information.service';
import { Router } from '@angular/router';
// components
import { HomepageComponent } from './homepage.component';
// models
import { IComicBookInformation } from '../../models/comic-book-information.model';
import { IComicBookCharacter } from '../../models/comic-book-characters.model';
import { ComicCardComponent } from './comics/comic-card/comic-card.component';


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
      loadComicBookInformation: of([comicBookInformationOne, comicBookInformationTwo]),
      setComicBookInformation: true,
    });

    TestBed.configureTestingModule({
      declarations: [
        HomepageComponent,
        ComicCardComponent,
      ],
      imports: [],
      providers: [
        { provide: ComicBookInformationService, useValue: spyComicBookInformationService },
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy("navigate"); }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call LoadComicBooks correctly and return a list of comic books and its information', () => {
    component.comicBookInformation = [];

    component.LoadComicBooks();

    expect(component.comicBookInformation).toContain(comicBookInformationOne);
  });

  it('Should contain a card', () => {
    const titleDe = fixture.debugElement.query(By.css('.comic-card'));

    expect(titleDe).toBeTruthy();
  });
});
