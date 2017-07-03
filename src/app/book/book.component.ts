import { Component, Input } from '@angular/core';
import { Book } from "app/models/book.interface";
import { BooksManagerService } from "app/services/books-manager.service";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  @Input() imagesRootSrc: string;
  @Input() bookItem: Book;
  @Input() bookIndex: number;
  
  constructor(private booksManagerService: BooksManagerService) { }

  onEditButton(): void {
    this.booksManagerService.editBookStartSubject.next(this.bookIndex);
  }

  onDeleteButton(): void {
    this.booksManagerService.deleteBookStartSubject.next(this.bookIndex);
  }
}
