import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { BookValidatorService } from 'app/services/book-validator.service';
import { BooksManagerService } from "app/services/books-manager.service";


@Component({
  selector: 'book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  @Input() bookId: number;
  @Input() imgSrc: string;
  @Input() bookTitleValue: string;
  @Input() bookAuthorValue: string;
  @Input() bookDateValue: string;
  bookForm: FormGroup;

  constructor(private booksManagerService: BooksManagerService, private bookValidatorService: BookValidatorService) { }

  ngOnInit() {
    this.bookForm = new FormGroup({
      'bookTitle': new FormControl(null, [Validators.required, this.englishCharsOnlyValidation.bind(this), this.notEmptyValidation.bind(this)], this.uniqueBookValidation.bind(this)),
      'bookAuthor': new FormControl(null, [Validators.required, this.englishCharsOnlyValidation.bind(this), this.notEmptyValidation.bind(this)]),
      'bookDate': new FormControl(null, [Validators.required, this.datePatternValidation.bind(this), this.notEmptyValidation.bind(this)])
    });

    this.bookForm.setValue({
      'bookTitle': this.bookTitleValue,
      'bookAuthor': this.bookAuthorValue,
      'bookDate': this.bookDateValue
    });

    this.bookForm.statusChanges.subscribe(
      (status) => {
        if (status === "VALID") {
          var equalTitle = this.bookValidatorService.isEqual(this.bookForm.get('bookTitle').value, this.bookTitleValue);
          var equalAuthor = this.bookValidatorService.isEqual(this.bookForm.get('bookAuthor').value, this.bookAuthorValue);
          var equalDate = this.bookValidatorService.isEqual(this.bookForm.get('bookDate').value, this.bookDateValue);
          if (!equalTitle || !equalAuthor || !equalDate) {
            this.booksManagerService.enableSaveSubject.next({
              id:this.bookId,
              imgSrc: this.imgSrc,
              title: this.bookForm.get('bookTitle').value,
              author: this.bookForm.get('bookAuthor').value,
              date: this.bookForm.get('bookDate').value
            });
          } else {
            this.booksManagerService.disableSaveSubject.next(true);
          }
        }
        else {
          this.booksManagerService.disableSaveSubject.next(true);          
        }
      }
    );      
  }

  englishCharsOnlyValidation(control: FormControl): {[s: string]: boolean} {
    if (this.bookValidatorService.isEnglishCharsOnly(control.value)) {
      return {'forbiddenChars': true};
    }
    return null;
  }

  notEmptyValidation(control: FormControl): {[s: string]: boolean} {
    if (control.value) {
      var input = this.bookValidatorService.removeSpacesChars(control.value);
      if (input.length === 0) {
        return {'spacesChars': true};
      }
      return null;
    }
  }

  datePatternValidation(control: FormControl): {[s: string]: boolean} {
    if (!this.bookValidatorService.isValidDate(control.value)) {
      return {'forbiddenDate': true};
    }
    return null;
  }

  uniqueBookValidation(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      if (this.booksManagerService.findDuplicateBook(this.bookId, control.value)) {  
        resolve({'duplicatedBook': true});
      } else {
        resolve(null);
      }  
    });
    return promise;
  }
}
