import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { BookDetail } from '../model/book-detail';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  allBooks = new BehaviorSubject<BookDetail[]>([]);

  readonly BASE_URL = 'https://rickandmortyapi.com/api/';

  pageNumber = 1;

  constructor(private http: HttpClient) {
    this.getAllBooks();
  }

  getAllBooks(): void{
    this.http.get<any>(this.BASE_URL + 'character?page=' + this.pageNumber).pipe(
      map(data => data.results)
    ).subscribe(books => this.allBooks.next(books));
  }

  previousPage(){
    if (this.pageNumber>1) {
      this.pageNumber--;
      this.getAllBooks();
    }
  }

  nextPage(){
    this.pageNumber++;
    this.getAllBooks();
  }
}
