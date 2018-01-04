import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Facebook } from '@ionic-native/facebook';
import { UsuarioProvider } from '../../providers/usuario/usuario';
@Component({
  templateUrl: 'menu.html',
})
export class MenuPage {

  public rootPage: any;
  public userData=null;
  constructor(private navCtrl: NavController,
              private facebook: Facebook,
              private navParams:NavParams,
               private _usuarioStg: UsuarioProvider) {
        this.rootPage = HomePage;

        this.userData = this._usuarioStg.userData;
  }

}
