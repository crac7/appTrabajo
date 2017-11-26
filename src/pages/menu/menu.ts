import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Facebook } from '@ionic-native/facebook';
@Component({
  templateUrl: 'menu.html',
})
export class MenuPage {

  public rootPage: any;
  public userData=null;
  constructor(private navCtrl: NavController, private facebook: Facebook, private navParams:NavParams) {
        this.rootPage = HomePage;
        this.userData = {
         email:  navParams.get('email'),
         first_name:  navParams.get('first_name'),
         picture:  navParams.get('picture'),
         username:  navParams.get('username'),
         uid:  navParams.get('uid'),
         };
  }

}
