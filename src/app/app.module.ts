import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { BooksListComponent } from './books-list/books-list.component';
import { BookComponent } from './book/book.component';
import { ModalBookDeleteComponent } from './modal-book-delete/modal-book-delete.component';
import { ModalBookEditorComponent } from './modal-book-editor/modal-book-editor.component';
import { BookFormComponent } from './book-form/book-form.component';
import { TitleCasePipe } from "./pipes/title-case.pipe";
import { PrependLabelPipe } from "./pipes/prepend-label.pipe";
import { PagerService } from './services/pager.service';
import { BooksManagerService } from "app/services/books-manager.service";
import { BookValidatorService } from "app/services/book-validator.service";

@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BookComponent,
    TitleCasePipe,
    PrependLabelPipe,
    ModalBookDeleteComponent,
    ModalBookEditorComponent,
    BookFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [PagerService, BooksManagerService, BookValidatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
