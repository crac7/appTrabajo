import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
@Component({
  templateUrl: 'menu.html',
})
export class MenuPage {

  public rootPage: any;

  constructor(private navCtrl: NavController) {
        this.rootPage = LoginPage;
  }

}