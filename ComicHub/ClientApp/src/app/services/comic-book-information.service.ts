import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { IComicBookInformation } from '../models/comic-book-information.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

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

  getComicBook(slug: string): IComicBookInformation {
    const result = this.comicBookInformation.filter(c => c.slug === slug);
    return result[0];
  }
}
