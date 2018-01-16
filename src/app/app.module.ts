import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WodsComponent } from './wods/wods.component';
import { WodsDetailComponent } from './wods-detail/wods-detail.component';
import { WodService } from './wod.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router/src/router_module';
import { RoutesRecognized } from '@angular/router/src/events';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    WodsComponent,
    WodsDetailComponent,
    MessagesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [WodService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
