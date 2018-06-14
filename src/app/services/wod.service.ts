import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Wod } from '../_models/wod';
import { MessageService } from './message.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class WodService {

  private wodsUrl = 'http://localhost:5000';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  /** GET wods from the server */
  public getWods (): Observable<Wod[]> {
    return this.http.get<Wod[]>(this.wodsUrl + '/wods')
      .pipe(
        tap(wods => this.log('fetched wods')),
        catchError(this.handleError('getWods', []))
      );
  }

  /** GET wod by id. Will 404 if id not found */
  public getWod(id: number): Observable<Wod> {
    // const url = `${this.wodsUrl}wod/${id}`;
    return this.http.get<Wod>(this.wodsUrl + '/wod/' + id)
    .pipe(
      tap(_ => this.log(`fetched wod id=${id}`)),
      catchError(this.handleError<Wod>(`getWod id=${id}`))
    );
  }


  /** GET wod by id. Return `undefined` when id not found */
  getWodNo404<Data>(id: number): Observable<Wod> {
    const url = `${this.wodsUrl}/?id=${id}`;
    return this.http.get<Wod[]>(url)
    .pipe(
      map(wods => wods[0]), // returns a {0|1} element array
      tap(w => {
        const outcome = w ? `fetched` : `did not find`;
        this.log(`${outcome} wod id=${id}`);
      }),
      catchError(this.handleError<Wod>(`getWod id=${id}`))
    );
  }

  /* GET wods whose name contains search term */
  searchWod(term): Observable<Wod[]> {
    if (!term.trim()) {
      // if not search term, return empty wod array.
      return of([]);
    }
    return this.http.get<Wod[]>(this.wodsUrl + `/wod/search/${term}`).pipe(
      tap(_ => this.log(`found wods matching "${term}"`)),
      catchError(this.handleError<Wod[]>('searchWods', []))
    );
  }

  /** POST: add a new wod to the server */
  addWod (wod: Wod): Observable<Wod> {
    return this.http.post<Wod>(this.wodsUrl + '/wod/', wod, httpOptions)
    .pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((wod: Wod) => this.log(`added wod w/ id=${wod.id}`)),
      catchError(this.handleError<Wod>('addWod'))
    );
  }

  /** PUT: update the wod on the server */
  updateWod (wod: Wod): Observable<Wod> {
    return this.http.put(this.wodsUrl + '/wod/' + wod.id, wod, httpOptions)
      .pipe(
        tap(_ => this.log(`updated wod id=${wod.id}`)),
        catchError(this.handleError<any>('updateWod'))
    );
  }

  /** DELETE: delete the wod from the server */
  deleteWod (wod: Wod | number): Observable<Wod> {
    const id = typeof wod === 'number' ? wod : wod.id;
    // const url = `${this.wodsUrl}/${id}`;
    return this.http.delete<Wod>(this.wodsUrl + '/wod/' + id, httpOptions).pipe(
      tap(_ => this.log(`deleted wod id=${id}`)),
      catchError(this.handleError<Wod>('deleteWod'))
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
