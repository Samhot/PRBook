import { Component, OnInit } from '@angular/core';
import { Wod } from '../_models/wod';
import { Todo } from '../_models/todo';
import { WodService } from '../_services/wod.service';
import { TodoService } from '../_services/todo.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  wods: Wod[] = [];
  todos: Todo[] = [];


  constructor(private wodService: WodService, private todoService: TodoService) { }

  ngOnInit() {
    this.getWods();
    this.getTodos();
  }

  getWods(): void {
    this.wodService.getWods()
      .subscribe(wods => this.wods = wods.slice(1,5));
  }

  getTodos(): void {
    this.todoService.getTodos()
      .subscribe(todo => this.todos = todo.slice(0,5));
  }

}
