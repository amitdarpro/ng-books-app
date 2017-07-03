import { Subscription } from 'rxjs/Subscription';
import { Component, ViewChild, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Book } from "app/models/book.interface";
import { BooksManagerService } from "app/services/books-manager.service";

@Component({
  selector: 'modal-book-editor',
  templateUrl: './modal-book-editor.component.html',
  styleUrls: ['./modal-book-editor.component.css']
})
export class ModalBookEditorComponent implements OnInit {
  modalTitle: string = "";
  modalMode: string;
  bookItem: Book;
  @ViewChild('contentBookEditor') contentBookEditor: HTMLElement;
  closeResult: string;
  private enableSaveSubscription: Subscription;
  private disableSaveSubscription: Subscription;
  newBookItem: Book;
  disabledSave: boolean = true;

  constructor(private modalService: NgbModal, private booksManagerService: BooksManagerService) { }

  ngOnInit() {
    this.enableSaveSubscription = this.booksManagerService.enableSaveSubject.subscribe(
      (item: Book) => {
        this.newBookItem = item;
        this.disabledSave = false;
      }
    );
    this.disableSaveSubscription = this.booksManagerService.disableSaveSubject.subscribe(
      (flag: boolean) => {
        this.disabledSave = flag;
      }
    );
  }

  ngOnDestroy() {
    this.enableSaveSubscription.unsubscribe();
    this.disableSaveSubscription.unsubscribe();
  }

  openWindow(mode: string, bookIndex: number): void {
    if (mode === "edit") {
      this.modalMode = "edit";
      this.modalTitle = "Editing Book Modal:";
      this.bookItem = this.booksManagerService.getBookItemByIndex(bookIndex);
    } else if (mode === "add") {
      this.modalMode = "add";
      this.modalTitle = "Adding New Book Modal";
      let bookId = this.booksManagerService.allBooksItems.length + 1;
      this.bookItem = {id: bookId, imgSrc: "temp-book-cover.jpg", title: "", author: "", date: ""};      
    }
    this.modalService.open(this.contentBookEditor).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSaveButton(): void {
    if (this.modalMode === "edit") {
      this.booksManagerService.updateBookAction(this.newBookItem);
    } else if (this.modalMode === "add") {
      this.booksManagerService.addBookAction(this.newBookItem);
    }
    this.disabledSave = true;
  }
}
