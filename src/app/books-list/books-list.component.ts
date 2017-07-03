import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import * as _ from 'underscore';
import { PagerService } from "app/services/pager.service";
import { Book } from "app/models/book.interface";
import { BooksManagerService } from "app/services/books-manager.service";
import { Subscription } from "rxjs/Subscription";
import { ModalBookEditorComponent } from "app/modal-book-editor/modal-book-editor.component";
import { ModalBookDeleteComponent } from "app/modal-book-delete/modal-book-delete.component";

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit, OnDestroy {
  private booksInitSubscription: Subscription;
  private editBookStartSubscription: Subscription;
  private editBookEndSubscription: Subscription;
  private deleteBookStartSubscription: Subscription;
  private deleteBookEndSubscription: Subscription;
  @ViewChild(ModalBookEditorComponent) modalBookEditor;
  @ViewChild(ModalBookDeleteComponent) modalBookDelete;
  private allBooksItems: Book[];
  imagesRootSrc: string;
  pager: any = {};
  pageSize: number = 10;
  pagedBooksItems: Book[];
  delme: string = "bla bla bla";

  constructor(private pagerService: PagerService, private booksManagerService: BooksManagerService) { }

  ngOnInit() {
    this.booksInitSubscription = this.booksManagerService.doneInitSubject.subscribe(
      (flag: boolean) => {
        if (flag) {
          this.allBooksItems = this.booksManagerService.getBooksList();
          this.imagesRootSrc = this.booksManagerService.getImagesRootSrc();
          if (this.allBooksItems) {
            this.setPage(1);
          }
        }
      }
    );
  }

  ngAfterViewInit() {
    this.editBookStartSubscription = this.booksManagerService.editBookStartSubject.subscribe(
      (bookIndex: number) => {
        this.modalBookEditor.openWindow("edit", bookIndex);
      }
    );
    this.editBookEndSubscription = this.booksManagerService.editBookEndSubject.subscribe(
      (newBooksArr: Book[]) => {
        this.allBooksItems = newBooksArr;
        if (this.allBooksItems) {
          this.setPage(this.pager.currentPage);
        }
      }
    );  
    this.deleteBookStartSubscription = this.booksManagerService.deleteBookStartSubject.subscribe(
      (bookIndex: number) => {
        this.modalBookDelete.openWindow(bookIndex);
      }
    );
    this.deleteBookEndSubscription = this.booksManagerService.deleteBookEndSubject.subscribe(
      (newBooksArr: Book[]) => {
        this.allBooksItems = newBooksArr;
        if (this.allBooksItems) {
          this.setPage(1);
        }
      }
    ); 
  }

  ngOnDestroy() {
    this.booksInitSubscription.unsubscribe();
    this.editBookStartSubscription.unsubscribe();
    this.editBookEndSubscription.unsubscribe();
    this.deleteBookStartSubscription.unsubscribe();
    this.deleteBookEndSubscription.unsubscribe();
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.allBooksItems.length, page, this.pageSize);
    this.pagedBooksItems = this.allBooksItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  getBookItemIndex(index): number {
    return index + (this.pageSize * (this.pager.currentPage-1));
  }

  onAddButton(): void {
    this.modalBookEditor.openWindow("add", -1);
  }
}



