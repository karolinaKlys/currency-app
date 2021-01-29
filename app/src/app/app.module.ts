import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {VerifyEmailComponent} from './components/verify-email/verify-email.component';
import {AuthService} from './shared/services/auth.service';
import {DBConfig, NgxIndexedDBModule} from 'ngx-indexed-db';
import {HttpClientModule} from '@angular/common/http';
import {SplashScreenComponent} from './components/splash-screen/splash-screen.component';
import {CurrencyDisplayPipe} from './shared/services/currency.pipe';

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
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    SplashScreenComponent,
    CurrencyDisplayPipe
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    NgxIndexedDBModule.forRoot(dBConfig),
    HttpClientModule
  ],
  providers: [AuthService, CurrencyDisplayPipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
