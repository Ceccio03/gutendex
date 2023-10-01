import { Component } from '@angular/core';
import { BookDetail } from 'src/app/model/book-detail';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent {
  favourites: BookDetail[] = [];

  constructor(public storage: StorageService){}

  ngOnInit(): void {
    this.storage.favouritesSubject.subscribe(arrayOfFavourites => {
      this.favourites = arrayOfFavourites;
    })
  }
}