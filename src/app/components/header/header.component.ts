import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchTerm: string = '';

  constructor(public dataserv: DataService, public storage: StorageService, private router: Router) {}

  searchBooks() {
    this.dataserv.searchBooks(this.searchTerm);
    this.router.navigate(['/results'], { queryParams: { q: this.searchTerm } });
  }
}