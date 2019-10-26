import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { IComicBookInformation } from '../models/comic-book-information.model';
import { IComicBookCharacter } from '../models/comic-book-characters.model';

@Injectable()
export class ComicBookInformationService {

  endpoint = 'http://localhost:3000';
  // https://propertymecomics.s3.amazonaws.com/comics

  comicBookInformation: IComicBookInformation[] = [];

  constructor(private http: HttpClient) {
  }

  loadComicBookInformation(): Observable<IComicBookInformation[]> {
    const url = this.endpoint + '/comics';
    return this.http.get<IComicBookInformation[]>(url);
  }

  setComicBookInformation(information: IComicBookInformation[]) {
    this.comicBookInformation = information;
  }

  updateComicBook(comicBook: IComicBookInformation) {
    this.comicBookInformation[comicBook.id] = comicBook;
    let url = this.endpoint + '/comics/' + comicBook.id;

    let options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comicBook)
    };

    return fetch(url, options).then((response) => response.json())
  }

  deleteCharacter(comicBook: IComicBookInformation, character: IComicBookCharacter) {
    let comic = this.comicBookInformation.filter(c => c.id === comicBook.id)[0];
    let index = comic.characters.indexOf(character);
    comic.characters.splice(index, 1);

    let url = this.endpoint + '/comics/' + comicBook.id;

    let options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comicBook)
    };

    return fetch(url, options).then((response) => response.json())
  }

  getComicBook(slug: string): IComicBookInformation {
    const result = this.comicBookInformation.filter(c => c.slug === slug);
    return result[0];
  }
}
