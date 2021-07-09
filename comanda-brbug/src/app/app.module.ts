import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Interception } from "./services/Interception";
import { PipesModule } from './pipes/pipes/pipes.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],

  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HttpClientModule,
    PipesModule
  ],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, {provide: HTTP_INTERCEPTORS, useClass: Interception, multi: true}],

  bootstrap: [AppComponent],
})
export class AppModule {}
