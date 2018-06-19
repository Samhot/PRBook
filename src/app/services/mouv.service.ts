import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Mouvement } from '../_models/mouvements';
import { MessageService } from './message.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MouvService {

  private Url = 'http://localhost:5000';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  /** GET movements from the server */
  public getMouvs (): Observable<any[]> {
    return this.http.get<any[]>(this.Url + '/mouvs')
      .pipe(
        tap(mouvs => this.log('fetched mouvs')),
        catchError(this.handleError('getMouvs', []))
      );
  }

  /** GET movements by id. Will 404 if id not found */
  public getMouv(id: number): Observable<Mouvement> {
    return this.http.get<Mouvement>(this.Url + '/mouv/' + id)
    .pipe(
      tap(_ => this.log(`fetched mouv id=${id}`)),
      catchError(this.handleError<any>(`getMouv id=${id}`))
    );
  }


  /** GET mouv by id. Return `undefined` when id not found */
  getMouvNo404<Data>(id: number): Observable<Mouvement> {
    const url = `${this.Url}/?id=${id}`;
    return this.http.get<Mouvement[]>(url)
    .pipe(
      map(mouvs => mouvs[0]), // returns a {0|1} element array
      tap(m => {
        const outcome = m ? `fetched` : `did not find`;
        this.log(`${outcome} mouv id=${id}`);
      }),
      catchError(this.handleError<Mouvement>(`getMouv id=${id}`))
    );
  }

  /* GET mouvs whose name contains search term */
  searchMouv(term): Observable<Mouvement[]> {
    if (!term.trim()) {
      // if not search term, return empty mouv array.
      return of([]);
    }
    return this.http.get<Mouvement[]>(this.Url + `/mouv/search/${term}`).pipe(
      tap(_ => this.log(`found mouvs matching "${term}"`)),
      catchError(this.handleError<Mouvement[]>('searchMouvs', []))
    );
  }

  /** POST: add a new mouv to the server */
  addMouv (mouv: Mouvement): Observable<Mouvement> {
    return this.http.post<Mouvement>(this.Url + '/mouv/', mouv, httpOptions)
    .pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((mouv: Mouvement) => this.log(`added mouv w/ id=${mouv.id}`)),
      catchError(this.handleError<Mouvement>('addMouv'))
    );
  }

  /** PUT: update the mouv on the server */
  updateMouv (mouv: Mouvement): Observable<Mouvement> {
    return this.http.put(this.Url + '/mouv/' + mouv.id, mouv, httpOptions)
      .pipe(
        tap(_ => this.log(`updated mouv id=${mouv.id}`)),
        catchError(this.handleError<any>('updateMouv'))
    );
  }

  /** DELETE: delete the mouv from the server */
  deleteMouv (mouv: Mouvement | number): Observable<Mouvement> {
    const id = typeof mouv === 'number' ? mouv : mouv.id;
    // const url = `${this.mouvsUrl}/${id}`;
    return this.http.delete<Mouvement>(this.Url + '/mouv/' + id, httpOptions).pipe(
      tap(_ => this.log(`deleted mouv id=${id}`)),
      catchError(this.handleError<Mouvement>('deleteMouv'))
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
