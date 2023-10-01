import { Component } from '@angular/core';
import { Author, BookDetail } from 'src/app/model/book-detail';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {
  constructor(private dataserv:DataService) {}

  books: BookDetail[] = [];
  authors: Author[] = [];
  searchTerm: string = '';

  ngOnInit(): void {
    this.dataserv.allBooks.subscribe(book => this.books = book)
    
  }

  searchBooks() {
    this.dataserv.searchBooks(this.searchTerm);
  }
}
