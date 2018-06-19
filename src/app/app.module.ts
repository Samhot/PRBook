import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material.module';
import { MessagesComponent } from './messages/messages.component';
import { MouvementsDetailComponent } from './mouvements-detail/mouvements-detail.component';
import { MouvementsComponent } from './mouvements/mouvements.component';
import { MessageService } from './services/message.service';
import { MouvService } from './services/mouv.service';
import { TodoService } from './services/todo.service';
import { WodService } from './services/wod.service';
import { TodosDetailComponent } from './todos-detail/todos-detail.component';
import { TodosComponent } from './todos/todos.component';
import { WodSearchComponent } from './wod-search/wod-search.component';
import { WodsDetailComponent } from './wods-detail/wods-detail.component';
import { WodsComponent } from './wods/wods.component';
import { AdminComponent } from './admin/admin.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MessagesComponent,
    TodosComponent,
    TodosDetailComponent,
    WodSearchComponent,
    WodsComponent,
    WodsDetailComponent,
    MouvementsComponent,
    MouvementsDetailComponent,
    LoginComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    LoginRoutingModule
  ],
  providers: [
    WodService,
    MessageService,
    TodoService,
    MouvService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
