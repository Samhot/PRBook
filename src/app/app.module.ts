import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddDialogComponent } from './dialogs/add/add.dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';
import { EditDialogComponent } from './dialogs/edit/edit.dialog.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material.module';
import { MessagesComponent } from './messages/messages.component';
import { MouvementsDetailComponent } from './mouvements-detail/mouvements-detail.component';
import { MouvementsComponent } from './mouvements/mouvements.component';
import { DataService } from './services/data.service';
import { MessageService } from './services/message.service';
import { MouvService } from './services/mouv.service';
import { TodoService } from './services/todo.service';
import { WodService } from './services/wod.service';
import { TodosDetailComponent } from './todos-detail/todos-detail.component';
import { TodosComponent } from './todos/todos.component';
import { WodSearchComponent } from './wod-search/wod-search.component';
import { WodsDetailComponent } from './wods-detail/wods-detail.component';
import { WodsComponent } from './wods/wods.component';


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
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    LoginRoutingModule,
  ],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent
  ],
  providers: [
    WodService,
    MessageService,
    TodoService,
    MouvService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
