import { Component, OnInit } from '@angular/core';
import { BooksManagerService } from "app/services/books-manager.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private booksManagerService: BooksManagerService) { }

  ngOnInit() {
    this.booksManagerService.initData();
  }
}

