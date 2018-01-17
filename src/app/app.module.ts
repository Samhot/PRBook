import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router/src/router_module';
import { RoutesRecognized } from '@angular/router/src/events';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { WodsComponent } from './wods/wods.component';
import { WodsDetailComponent } from './wods-detail/wods-detail.component';
import { WodService } from './wod.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WodSearchComponent } from './wod-search/wod-search.component';


@NgModule({
  declarations: [
    AppComponent,
    WodsComponent,
    WodsDetailComponent,
    MessagesComponent,
    DashboardComponent,
    WodSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    
       // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
       // and returns simulated server responses.
       // Remove it when a real server is ready to receive requests.
       HttpClientInMemoryWebApiModule.forRoot(
         InMemoryDataService, { dataEncapsulation: false }
       )
  ],
  providers: [WodService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
