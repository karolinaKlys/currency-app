import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SplashScreenComponent} from './components/splash-screen/splash-screen.component';
import {HomeComponent} from './components/home/home.component';
import {DBConfig, NgxIndexedDBModule} from "ngx-indexed-db";
import {HttpClientModule} from "@angular/common/http";

const dBConfig: DBConfig = {
  name: 'db',
  version: 1,
  objectStoresMeta: [{
    store: 'currency',
    storeConfig: {keyPath: 'code', autoIncrement: false},
    storeSchema: [
      {name: 'currency', keypath: 'currency', options: {unique: false}},
      {name: 'mid', keypath: 'mid', options: {unique: false}}
    ]
  },
    {
      store: 'image',
      storeConfig: {keyPath: 'url', autoIncrement: false},
      storeSchema: [
        {name: 'base64', keypath: 'base64', options: {unique: false}},
      ]
    }
  ]
}

@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    HomeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxIndexedDBModule.forRoot(dBConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
