import { Component, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Book } from "app/models/book.interface";
import { BooksManagerService } from "app/services/books-manager.service";

@Component({
  selector: 'modal-book-delete',
  templateUrl: './modal-book-delete.component.html',
  styleUrls: ['./modal-book-delete.component.css']
})
export class ModalBookDeleteComponent {
  bookItem: Book;
  @ViewChild('contentBookDelete') contentBookDelete: HTMLElement;
  closeResult: string;

  constructor(private modalService: NgbModal, private booksManagerService: BooksManagerService) {}

  openWindow(bookIndex): void {
    this.bookItem = this.booksManagerService.getBookItemByIndex(bookIndex);
    this.modalService.open(this.contentBookDelete).result.then((result) => {
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
      return  `with: ${reason}`;
    }
  }
  
  onDeleteButton() {
    this.booksManagerService.deleteBookAction(this.bookItem.id);
  }
}
