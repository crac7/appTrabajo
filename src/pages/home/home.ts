import { Component } from '@angular/core';
import { NavController ,NavParams  } from 'ionic-angular';
import firebase from 'firebase';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { MenuPage } from '../menu/menu';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 userData=null;


 lat: number = 51.678418;
 lng: number = 7.809007;

 
  constructor(public navCtrl: NavController,
              private facebook: Facebook,
              private navParams:NavParams,
              private _ubicacion: UbicacionProvider) {
      /*this.userData = {
       email:  navParams.get('email'),
       first_name:  navParams.get('first_name'),
       picture:  navParams.get('picture'),
       username:  navParams.get('username')
     };*/

      // this._ubicacion.iniciar_localizacion();

  }
  login(){
   this.facebook.login(['email','public_profile']).then((response: FacebookLoginResponse) => {
    this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)',[]).then(profile => {
       this.userData= {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'],username: profile['name']};
    })
   })
  }

}
