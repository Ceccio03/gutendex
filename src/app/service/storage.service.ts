import { Injectable } from '@angular/core';
import { BookDetail } from '../model/book-detail';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  favouritesSubject = new BehaviorSubject<BookDetail[]>([]);

  constructor() {
    
    if (localStorage.getItem('favourites')) {
      
      this.favouritesSubject.next(JSON.parse(localStorage.getItem('favourites')!))
    }
  }

  savebook(book: BookDetail) {
    book.isFavourite = true;
    const actualArray = this.favouritesSubject.value;
    const newArray = [...actualArray, book];
    this.favouritesSubject.next(newArray);
    localStorage.setItem('favourites', JSON.stringify(newArray));
  }

  removebook(book: BookDetail) {
    book.isFavourite = false;
   
    const actualArray = this.favouritesSubject.value;
    const newArray = actualArray.filter((p) => p.id !== book.id);
    this.favouritesSubject.next(newArray);
    localStorage.setItem('favourites', JSON.stringify(newArray));
  }

  toggleFavourites(book: BookDetail) {
    if (this.isFavourite(book)) {
      this.removebook(book)

    }else{
      this.savebook(book)
    }
  }

  isFavourite(book: BookDetail): boolean {
    console.log('is favourite', book);
    return this.favouritesSubject.value.some(p => p.id===book.id);
  }
}
