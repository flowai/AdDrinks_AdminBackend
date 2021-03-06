import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { environment } from '../environments/environment'

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BeansSite } from '../pages/beans/beans';
import { CapsSite } from '../pages/caps/caps';
import { CoffeeSite } from '../pages/coffee/coffee';
import { PadsSite } from '../pages/pads/pads';
import { NewEntrySite } from '../pages/newentry/newentry';
import { TypesSite } from '../pages/types/types';
import { LoginPage } from '../pages/login/login';

import { AuthService } from '../auth/auth.service';
import { PartnerSite } from '../pages/partner/partner';
import { InputValidator } from '../validators/inputValidator';
import { UploadService } from '../provider/UploadService';
import { PartnerNewSite } from '../pages/partner/partnernew';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BeansSite,
    CapsSite,
    CoffeeSite,
    PadsSite,
    PartnerSite,
    PartnerNewSite,
    NewEntrySite,
    TypesSite,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment),
    AngularFirestoreModule.enablePersistence(), //.enablePersistence() used for offline storage
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BeansSite,
    CapsSite,
    CoffeeSite,
    PadsSite,
    PartnerSite,
    PartnerNewSite,
    NewEntrySite,
    TypesSite,
    LoginPage
  ],
  providers: [
    InputValidator,
    AuthService,
    UploadService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
