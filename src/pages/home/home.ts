import { Component } from '@angular/core';
import { NavController ,NavParams , MenuController } from 'ionic-angular';
import firebase from 'firebase';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import {MenuPage} from '../menu/menu';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 userData=null;
  constructor(public navCtrl: NavController, private facebook: Facebook, private navParams:NavParams, private menuCtrl :MenuController) {
      this.userData = {
       email:  navParams.get('email'),
       first_name:  navParams.get('first_name'),
       picture:  navParams.get('picture'),
       username:  navParams.get('username')
       };

  }
  login(){
   this.facebook.login(['email','public_profile']).then((response: FacebookLoginResponse) => {
    this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)',[]).then(profile => {
       this.userData= {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'],username: profile['name']};
    })
   })
  }
  mostrarMenu(){
     this.menuCtrl.toggle();
  }
}
