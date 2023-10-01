import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Author, BookDetail, Formats } from 'src/app/model/book-detail';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
  constructor(private router: Router, public storage: StorageService){}

  @Input() books?: BookDetail;
  @Input() authors?: Author;
  @Input() formats?: Formats;
  @Input() isFavourite: boolean = false;
  @Input() bColor: string = 'white';


  viewDetails(bookId: number) {
    console.log('book', this.books); 
    console.log('bookId', bookId);
    const url = `/book-details/${bookId}`;
    this.router.navigate([url]);
  }
}
