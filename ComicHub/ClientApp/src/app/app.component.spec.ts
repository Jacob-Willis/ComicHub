import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule, Router, ChildrenOutletContexts } from '@angular/router';
import { of } from 'rxjs';
import { HttpClient } from 'selenium-webdriver/http';

import { ComicPageComponent } from './components/homepage/comics/comic-page/comic-page.component';
import { ComicBookInformationService } from './services/comic-book-information.service';
import { IComicBookCharacter } from './models/comic-book-characters.model';
import { IComicBookInformation } from './models/comic-book-information.model';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

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
  image: 'imagingUrl here?',
  characters: [comicCharacterOne, comicCharacterTwo]
}

describe('AppPageComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    const spyComicBookInformationService = jasmine.createSpyObj('ComicBookInformationService', {
      getComicBookInformation: of([comicBookInformationOne]),
      setComicBookInformation: true,
      getComicBook: comicBookInformationOne,
    });

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
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
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy("navigate"); }
        },
        ChildrenOutletContexts
      ],
      imports: [ RouterModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
