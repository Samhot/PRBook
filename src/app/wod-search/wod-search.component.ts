import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { WodService } from '../services/wod.service';
import { Wod } from '../wod';

@Component({
  selector: 'app-wod-search',
  templateUrl: './wod-search.component.html',
  styleUrls: ['./wod-search.component.css']
})
export class WodSearchComponent implements OnInit {
  wods$: Observable<Wod[]>;
  private searchTerms = new Subject<string>();

  constructor(private wodService: WodService) { }

  // Push a search term into the observable stream.
  searchWod(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.wods$ = this.searchTerms.pipe(
      // wait 300ms after each kaystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.wodService.searchWod(term)),
    );
  }

}
