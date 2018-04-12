import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpModule,Http } from '@angular/http';

import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatProgressSpinnerModule } from '@angular/material';
import { CommonService } from "./common.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: [
    CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
