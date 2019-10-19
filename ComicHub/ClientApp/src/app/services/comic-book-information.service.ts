import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IComicBookInformation } from '../models/comic-book-information.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ComicBookInformationService {

  endpoint = 'https://propertymecomics.s3.amazonaws.com/';

  comicBookInformation: IComicBookInformation[] = [];

  constructor(private http: HttpClient) {
  }

  getComicBookInformation(): Observable<IComicBookInformation[]> {
    const url = this.endpoint + 'comics';
    return this.http.get<IComicBookInformation[]>(url);
  }

  setComicBookInformation(information: IComicBookInformation[]) {
    this.comicBookInformation = information;
  }

  getComicBook(id: string): IComicBookInformation {
    const result = this.comicBookInformation.filter(c => c.id.toString() === id);
    return result[0];
  }
}
