import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DataService } from './services/data.service';
import { Mouvement } from './_models/mouvements';
import { Todo } from './_models/todo';
import { Wod } from './_models/wod';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  global$: Observable<any[]>;
  wods$: Observable<Wod[]>;
  todos$: Observable<Todo[]>;
  mouvs$: Observable<Mouvement[]>;

  private searchTermsGlobal = new Subject<string>();
  private searchTermsWod = new Subject<string>();
  private searchTermsTodo = new Subject<string>();
  private searchTermsMouv = new Subject<string>();


  constructor(private dataService: DataService) {}

  searchTermGlobal(term: string): void {
    this.searchTermsGlobal.next(term);
    this.searchTermsWod.next(term);
    this.searchTermsTodo.next(term);
    this.searchTermsMouv.next(term);

  }

  ngOnInit() {
    this.wods$ = this.searchTermsGlobal.pipe(
      // wait 300ms after each kaystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.dataService.searchWods(term)),
    );

    this.todos$ = this.searchTermsGlobal.pipe(
      // wait 300ms after each kaystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.dataService.searchTodos(term)),
    );

    this.mouvs$ = this.searchTermsGlobal.pipe(
      // wait 300ms after each kaystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.dataService.searchMouvs(term)),
    );
  }
}
