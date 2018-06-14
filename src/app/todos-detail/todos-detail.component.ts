import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { Todo } from '../_models/todo';

@Component({
  selector: 'app-todos-detail',
  templateUrl: './todos-detail.component.html',
  styleUrls: ['./todos-detail.component.css']
})
export class TodosDetailComponent implements OnInit {

  @Input() todo: Todo;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getTodo();
  }

  getTodo(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.todoService.getTodo(id)
      .subscribe(todo => this.todo = todo);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.todoService.updateTodo(this.todo)
      .subscribe(() => this.goBack());
  }

}
