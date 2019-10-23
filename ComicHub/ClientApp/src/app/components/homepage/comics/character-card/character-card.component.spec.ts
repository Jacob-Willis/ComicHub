import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterCardComponent } from './character-card.component';
import { IComicBookCharacter } from 'src/app/models/comic-book-characters.model';
import { ViewChild, Component } from '@angular/core';

const comicCharacter: IComicBookCharacter = {
  id: 1,
  name: 'Character One',
  description: 'Description goes here',
  numberOfRoles: 55,
  isGood: true,
  image: 'imageUrlOne'
}

describe('CharacterCardComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CharacterCardComponent,
        TestHostComponent
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

  it('Should show image', () => {
    const image = testHostFixture.debugElement.nativeElement.querySelector('.card-img-top');

    expect(image).toBeTruthy();
    expect(image.src).toContain('imageUrlOne');
  });

  it('Should show correct character name', () => {
    const name = testHostFixture.debugElement.nativeElement.querySelector('.card-title');

    expect(name).toBeTruthy();
    expect(name.textContent).toContain('Character One');
  });

  it('Should show correct number of roles', () => {
    const roles = testHostFixture.debugElement.nativeElement.querySelector('.card-num_roles');

    expect(roles).toBeTruthy();
    expect(roles.textContent).toContain('55');
  });

  it('Should show correct description', () => {
    const description = testHostFixture.debugElement.nativeElement.querySelector('.card-text');

    expect(description).toBeTruthy();
    expect(description.textContent).toContain('Description goes here');
  });

  @Component({
    selector: 'app-character-card',
    templateUrl: './character-card.component.html',
  })
  class TestHostComponent {
    @ViewChild(CharacterCardComponent, { static: false })
    public characterCardComponent: CharacterCardComponent;
    private character: IComicBookCharacter = comicCharacter;

    setInput(newInput: IComicBookCharacter) {
      this.character = newInput;
    }
  }
});
