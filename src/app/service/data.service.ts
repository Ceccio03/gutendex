import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged, map } from 'rxjs';
import { BookDetail } from '../model/book-detail';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  allBooks = new BehaviorSubject<BookDetail[]>([]);

  readonly BASE_URL = 'https://gutendex.com/books/';

  pageNumber = 1;

  constructor(private http: HttpClient) {
    this.getAllBooks();
  }

  getAllBooks(): void {
    const apiUrl = `${this.BASE_URL}?page=${this.pageNumber}`;
    this.http
      .get<any>(apiUrl)
      .pipe(
        map((data) => data.results),
       
        distinctUntilChanged(
          (prev, curr) =>
            prev.map((book: { id: any }) => book.id).join(',') ===
            curr.map((book: { id: any }) => book.id).join(',')
        )
      )
      .subscribe((books) => this.allBooks.next(books));
  }

  getSingleBook(id: string): Observable<BookDetail> {
    const apiUrl = `${this.BASE_URL}${id}`;
    return this.http.get<BookDetail>(apiUrl);
  }
  
  previousPage(){
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getAllBooks();
    }
  }

  nextPage(){
    this.pageNumber++;
    this.getAllBooks();
  }

  searchBooks(searchTerm: any) {
    const apiUrl = `${this.BASE_URL}?search=${searchTerm}`;
    this.http
      .get<any>(apiUrl)
      .pipe(
        map((data) => data.results),

        distinctUntilChanged(
          (prev, curr) =>
            prev.map((book: { id: any }) => book.id).join(',') ===
            curr.map((book: { id: any }) => book.id).join(',')
        )
      )
      .subscribe((books) => this.allBooks.next(books));
  }
}
