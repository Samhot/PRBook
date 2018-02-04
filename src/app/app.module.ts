import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router/src/router_module';
import { RoutesRecognized } from '@angular/router/src/events';
import { MaterialModule } from './material.modules';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    MaterialModule
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
