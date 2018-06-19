import { Component, OnInit } from '@angular/core';
import { MouvService } from '../services/mouv.service';
import { TodoService } from '../services/todo.service';
import { WodService } from '../services/wod.service';
import { Mouvement } from '../_models/mouvements';
import { Todo } from '../_models/todo';
import { Wod } from '../_models/wod';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  wods: Wod[] = [];
  todos: Todo[] = [];
  mouvs: Mouvement[] = [];

  constructor(private mouvService: MouvService, private todoService: TodoService, private wodService: WodService) { }

  ngOnInit() {
    this.getWods();
    this.getTodos();
    this.getMouvs();
  }

  getWods(): void {
    this.wodService.getWods()
      .subscribe(wods => this.wods = wods.slice(1, 5));
  }

  getMouvs(): void {
    this.mouvService.getMouvs()
      .subscribe(mouvs => this.mouvs = mouvs.slice(0, 5));
  }

  getTodos(): void {
    this.todoService.getTodos()
      .subscribe(todo => this.todos = todo.slice(0, 5));
  }

}
