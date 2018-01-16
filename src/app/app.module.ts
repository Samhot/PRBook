import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WodsComponent } from './wods/wods.component';
import { WodsDetailComponent } from './wods-detail/wods-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    WodsComponent,
    WodsDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
