import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Facebook } from '@ionic-native/facebook';
////////////////////Firebase/////////////////////////////////
import firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from '../config/firebase.config'
///////////////////////////////////////////////////////////
import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule } from '@agm/core';

import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { UbicacionProvider } from '../providers/ubicacion/ubicacion';
import { UsuarioProvider } from '../providers/usuario/usuario';
/*
firebase.initializeApp({
     apiKey: "AIzaSyB2hysmMp3kA96yZBZTc5zyXn5TBFyofYI",
    authDomain: "tiendaexpress-107f0.firebaseapp.com",
    databaseURL: "https://tiendaexpress-107f0.firebaseio.com",
    projectId: "tiendaexpress-107f0",
    storageBucket: "tiendaexpress-107f0.appspot.com",
    messagingSenderId: "88038932763"
});*/
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
    MenuPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, links),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDaVGrPaQpEfUfc8mMtVrNKvI62vjHvH2M'
    }),
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
    UbicacionProvider,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UbicacionProvider,
    UsuarioProvider

  ]
})
export class AppModule {}
