import { IComicBookCharacter } from './comic-book-characters.model';

export interface IComicBookInformation {
  id: number;
  slug: string;
  name: string;
  description: string;
  issueNumber: number;
  pages: number;
  price: number;
  releaseDate: Date;
  image: string;
  characters: IComicBookCharacter[];
}
