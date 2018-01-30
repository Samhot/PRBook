import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router/src/router_module';
import { RoutesRecognized } from '@angular/router/src/events';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { WodsComponent } from './wods/wods.component';
import { WodsDetailComponent } from './wods-detail/wods-detail.component';
import { WodService } from './wod.service';

import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WodSearchComponent } from './wod-search/wod-search.component';
import { TodosComponent } from './todos/todos.component';
import { TodoService } from './todo.service';
import { TodosDetailComponent } from './todos-detail/todos-detail.component';

// import { TodoListComponent } from './todo-list/todo-list.component';
// import { TodoListFooterComponent } from './todo-list-footer/todo-list-footer.component';
// import { TodoListHeaderComponent } from './todo-list-header/todo-list-header.component';
// import { TodoDataService } from './todo-data.service';
// import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
// import { ApiService } from './api.service';


@NgModule({
  declarations: [
    AppComponent,
    WodsComponent,
    WodsDetailComponent,
    MessagesComponent,
    DashboardComponent,
    WodSearchComponent,
    TodosComponent,
    TodosDetailComponent,
    // TodoListComponent,
    // TodoListFooterComponent,
    // TodoListHeaderComponent,
    // TodoListItemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    WodService,
    MessageService,
    TodoService,
    // ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
