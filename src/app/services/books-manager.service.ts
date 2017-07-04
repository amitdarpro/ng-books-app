import { element } from 'protractor';
import { Injectable } from '@angular/core';
import { Book } from "app/models/book.interface";
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from "rxjs/Subject";
import { BookValidatorService } from "app/services/book-validator.service";

@Injectable()
export class BooksManagerService {
  imagesRootSrc: string = "./assets/books-covers/";
  allBooksItems: Book[];
  doneInitSubject = new Subject();
  editBookStartSubject = new Subject();
  enableSaveSubject = new Subject();
  disableSaveSubject = new Subject();
  editBookEndSubject = new Subject();
  deleteBookStartSubject = new Subject();
  deleteBookEndSubject = new Subject();

  constructor(private http: Http, private bookValidatorService: BookValidatorService) { }

  initData() {
    this.http.get('./assets/books-data.json')
      .map((response: Response) => response.json()).subscribe(data => {
        this.allBooksItems = data;
        this.doneInitSubject.next(true);
      });
  }

  getBooksList(): Book[] {
    return this.allBooksItems;
  }

  getImagesRootSrc(): string {
    return this.imagesRootSrc;
  }

  getBookItemByIndex(bookIndex: number): { id, imgSrc, title, author, date } {
    return this.allBooksItems[bookIndex];
  }

  findDuplicateBook(bookId: number, bookTitle: string): boolean {
    for (let i = 0; i < this.allBooksItems.length; i++) {
      if (this.allBooksItems[i].id !== bookId && this.bookValidatorService.getStrictString(this.allBooksItems[i].title) === this.bookValidatorService.getStrictString(bookTitle)) {
        return true;
      }
    }
    return false;
  }

  updateBookAction(bookItem: Book): void {
    for (let element of this.allBooksItems) {
      if (element.id === bookItem.id) {
        element.title = bookItem.title;
        element.author = bookItem.author;
        element.date = bookItem.date;
        break;
      }
    }
    this.editBookEndSubject.next(this.allBooksItems);
  }

  addBookAction(bookItem: Book): void {
    this.allBooksItems.unshift(bookItem);
    this.editBookEndSubject.next(this.allBooksItems);
  }

  deleteBookAction(bookId: number): void {
    for (let i = 0; i < this.allBooksItems.length; i++) {
      if (this.allBooksItems[i].id === bookId) {
        this.allBooksItems.splice(i, 1);
        break;
      }
    }
    this.deleteBookEndSubject.next(this.allBooksItems);
  }
}
