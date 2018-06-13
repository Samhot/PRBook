import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { WodService } from '../services/wod.service';
import { Todo } from '../todo';
import { Wod } from '../wod';


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
      .subscribe(wods => this.wods = wods.slice(1, 5));
  }

  getTodos(): void {
    this.todoService.getTodos()
      .subscribe(todo => this.todos = todo.slice(0, 5));
  }

}
