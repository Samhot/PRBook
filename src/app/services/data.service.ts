import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Issue } from '../_models/issue';
import { Wod } from '../_models/Wod';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataService {
  // private API_URL = 'https://api.github.com/repos/angular/angular/issues';
  private API_URL = 'http://localhost:5000';  // URL to web api

  
  dataChange: BehaviorSubject<Wod[]> = new BehaviorSubject<Wod[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient, private messageService: MessageService) {}

  get data(): Wod[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllWods(): void {
    this.httpClient.get<Wod[]>(this.API_URL + '/wods').subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

  /** GET wods from the server */
  public getWods (): Observable<Wod[]> {
    return this.httpClient.get<Wod[]>(this.API_URL + '/wods')
      .pipe(
        tap(wods => this.log('fetched wods')),
        catchError(this.handleError('getWods', []))
      );
  }

  /** GET wod by id. Will 404 if id not found */
  public getWod(id: number): Observable<Wod> {
    // const url = `${this.wodsUrl}wod/${id}`;
    return this.httpClient.get<Wod>(this.API_URL + '/wod/' + id)
    .pipe(
      tap(_ => this.log(`fetched wod id=${id}`)),
      catchError(this.handleError<Wod>(`getWod id=${id}`))
    );
  }

  /** GET wod by id. Return `undefined` when id not found */
  getWodNo404<Data>(id: number): Observable<Wod> {
    const url = `${this.API_URL}/?id=${id}`;
    return this.httpClient.get<Wod[]>(url)
    .pipe(
      map(wods => wods[0]), // returns a {0|1} element array
      tap(w => {
        const outcome = w ? `fetched` : `did not find`;
        this.log(`${outcome} wod id=${id}`);
      }),
      catchError(this.handleError<Wod>(`getWod id=${id}`))
    );
  }
  

  // // DEMO ONLY, you can find working methods below
  // addIssue (issue: Issue): void {
  //   this.dialogData = issue;
  // }

  /** POST: add a new wod to the server */
  addWod (wod: Wod): Observable<Wod> {
    return this.httpClient.post<Wod>(this.API_URL + '/wod/', wod, httpOptions)
    .pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((wod: Wod) => this.log(`added wod w/ id=${wod.id}`)),
      catchError(this.handleError<Wod>('addWod'))
    );
  }

  // updateIssue (issue: Issue): void {
  //   this.dialogData = issue;
  // }

  /** PUT: update the wod on the server */
  updateWod (wod: Wod): Observable<Wod> {
    return this.httpClient.put(this.API_URL + '/wod/' + wod.id, wod, httpOptions)
      .pipe(
        tap(_ => this.log(`updated wod id=${wod.id}`)),
        catchError(this.handleError<any>('updateWod'))
    );
  }

  // deleteIssue (id: number): void {
  //   console.log(id);
  // }

  /** DELETE: delete the wod from the server */
  deleteWod (wod: Wod | number): Observable<Wod> {
    const id = typeof wod === 'number' ? wod : wod.id;
    // const url = `${this.wodsUrl}/${id}`;
    return this.httpClient.delete<Wod>(this.API_URL + '/wod/' + id, httpOptions).pipe(
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



/* REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:

    // ADD, POST METHOD
    addItem(kanbanItem: KanbanItem): void {
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
      this.dialogData = kanbanItem;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }

    // UPDATE, PUT METHOD
     updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/




