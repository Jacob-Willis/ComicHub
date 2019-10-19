import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicPageComponent } from './app.component';

describe('ComicPageComponent', () => {
  let component: ComicPageComponent;
  let fixture: ComponentFixture<ComicPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComicPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
