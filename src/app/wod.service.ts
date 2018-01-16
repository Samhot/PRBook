import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Wod } from './wod';
import { WODS } from './mock-wods';
import { MessageService } from './message.service';

@Injectable()
export class WodService {

  constructor(private messageService: MessageService) { }

  getWods(): Observable<Wod[]> {
    this.messageService.add('WodService: fetched wods');
    return of(WODS);
  }

  getWod(id: number): Observable<Wod> {
    // Todo: send the message _after_ fetching the wod
    this.messageService.add(`WodService: fetched wod id=${id}`);
    return of(WODS.find(wod => wod.id === id));
  }

}
