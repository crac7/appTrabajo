import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';

import {LoginPage} from '../pages/login/login';
import {MenuPage} from '../pages/menu/menu';

firebase.initializeApp({
     apiKey: "AIzaSyB2hysmMp3kA96yZBZTc5zyXn5TBFyofYI",
    authDomain: "tiendaexpress-107f0.firebaseapp.com",
    databaseURL: "https://tiendaexpress-107f0.firebaseio.com",
    projectId: "tiendaexpress-107f0",
    storageBucket: "tiendaexpress-107f0.appspot.com",
    messagingSenderId: "88038932763"
});
// refavtor por router
var links =[
 { component: LoginPage, name:'Login', segment:'Login'},
 { component:  HomePage, name:'Home' , segment:'Home' }
];


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MenuPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MenuPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
