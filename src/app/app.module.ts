import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router/src/router_module';
import { RoutesRecognized } from '@angular/router/src/events';
import { MaterialModule } from './material.modules';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
// test auth
import { AuthGuard } from './auth/auth.guard';
import { AuthenticationService } from './_services/auth.service';
import { UserService} from './_services/user.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { WodsComponent } from './wods/wods.component';
import { WodsDetailComponent } from './wods-detail/wods-detail.component';
import { WodSearchComponent } from './wod-search/wod-search.component';
import { WodService } from './_services/wod.service';

import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './_services/message.service';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TodosComponent } from './todos/todos.component';
import { TodoService } from './_services/todo.service';
import { TodosDetailComponent } from './todos-detail/todos-detail.component';

// import { PublicDealsComponent } from './public-deals/public-deals.component';
// import { PrivateDealsComponent } from './private-deals/private-deals.component';
// import { DealService } from './deal.service';
// import { CallbackComponent } from './callback.component';


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
    // PublicDealsComponent,
    // CallbackComponent,
    // PrivateDealsComponent,
    HomeComponent,
    LoginComponent,
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
    // DealService,
    UserService,
    AuthenticationService,
    AuthGuard,
    // providers used to create fake backend
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
