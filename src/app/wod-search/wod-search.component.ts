import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MouvService } from '../services/mouv.service';
import { TodoService } from '../services/todo.service';
import { WodService } from '../services/wod.service';
import { Mouvement } from '../_models/mouvements';
import { Todo } from '../_models/todo';
import { Wod } from '../_models/wod';


@Component({
  selector: 'app-wod-search',
  templateUrl: './wod-search.component.html',
  styleUrls: ['./wod-search.component.css']
})
export class WodSearchComponent implements OnInit {
  wods$: Observable<Wod[]>;
  todos$: Observable<Todo[]>;
  mouvs$: Observable<Mouvement[]>;

  private searchTermsWods = new Subject<string>();
  private searchTermsTodos = new Subject<string>();
  private searchTermsMouvs = new Subject<string>();

  constructor(private wodService: WodService, private todoService: TodoService, private mouvService: MouvService, public router: Router) { }

  // Push a search term into the observable stream.
  searchTermWods(term: string): void {
    this.searchTermsWods.next(term);
  }

  searchTermTodos(term: string): void {
    this.searchTermsTodos.next(term);
  }

  searchTermMouvs(term: string): void {
    this.searchTermsMouvs.next(term);
  }


  ngOnInit() {
    this.wods$ = this.searchTermsWods.pipe(
      // wait 300ms after each kaystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.wodService.searchWod(term)),
    );

    this.todos$ = this.searchTermsTodos.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.todoService.searchTodo(term)),
    );

    this.mouvs$ = this.searchTermsMouvs.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.mouvService.searchMouv(term)),
    );
  }

}
