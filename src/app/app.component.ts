import {Component,OnInit} from '@angular/core';
// import {TodoDataService} from './todo-data.service';
// import {Todo} from './todo';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    // TodoDataService
  ]
})
export class AppComponent implements OnInit {
  // todos: Todo[] =[];

  constructor() {
  }

  public ngOnInit() {
  }
}