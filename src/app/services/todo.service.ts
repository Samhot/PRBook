import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Todo } from '../_models/todo';
import { MessageService } from './message.service';




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TodoService {

  private todosUrl = 'http://localhost:5000';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  /** GET todos from the server */
  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl + '/todos')
      .pipe(
        tap(todos => this.log('fetched todos')),
        catchError(this.handleError('getTodos', []))
      );
  }

  /** GET todo by id. Will 404 if id not found */
  public getTodo(id: number): Observable<Todo> {
    // const url = `${this.todosUrl}todo/${id}`;
    return this.http.get<Todo>(this.todosUrl + '/todo/' + id)
    .pipe(
      tap(_ => this.log(`fetched todo id=${id}`)),
      catchError(this.handleError<Todo>(`getTodo id=${id}`))
    );
  }


  /** GET todo by id. Return `undefined` when id not found */
  getTodoNo404<Data>(id: number): Observable<Todo> {
    const url = `${this.todosUrl}/?id=${id}`;
    return this.http.get<Todo[]>(url)
    .pipe(
      map(todos => todos[0]), // returns a {0|1} element array
      tap(w => {
        const outcome = w ? `fetched` : `did not find`;
        this.log(`${outcome} todo id=${id}`);
      }),
      catchError(this.handleError<Todo>(`getTodo id=${id}`))
    );
  }

  /* GET todos whose name contains search term */
  searchTodo(term): Observable<Todo[]> {
    if (!term.trim()) {
      // if not search term, return empty todo array.
      return of([]);
    }
    return this.http.get<Todo[]>(this.todosUrl + `/todo/search/${term}`).pipe(
      tap(_ => this.log(`found todos matching "${term}"`)),
      catchError(this.handleError<Todo[]>('searchTodos', []))
    );
  }

  /** POST: add a new todo to the server */
  addTodo (todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl + '/todo/', todo, httpOptions)
    .pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((todo: Todo) => this.log(`added todo w/ id=${todo.id}`)),
      catchError(this.handleError<Todo>('addTodo'))
    );
  }

  /** PUT: update the todo on the server */
  updateTodo (todo: Todo): Observable<Todo> {
    return this.http.put(this.todosUrl + '/todo/' + todo.id, todo, httpOptions)
      .pipe(
        tap(_ => this.log(`updated todo id=${todo.id}`)),
        catchError(this.handleError<any>('updateTodo'))
    );
  }

  /** DELETE: delete the todo from the server */
  deleteTodo (todo: Todo | number): Observable<Todo> {
    const id = typeof todo === 'number' ? todo : todo.id;
    // const url = `${this.todosUrl}/${id}`;
    return this.http.delete<Todo>(this.todosUrl + '/todo/' + id, httpOptions).pipe(
      tap(_ => this.log(`deleted todo id=${id}`)),
      catchError(this.handleError<Todo>('deleteTodo'))
    );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
      this.messageService.add('HeroService: ' + message);
    }
}
