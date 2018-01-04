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
 usuario1:any={};
 usuario2:any={};
  public useruid=null;


  constructor(public navCtrl: NavController,
              private facebook: Facebook,
              private navParams:NavParams,
              private _ubicacion: UbicacionProvider,
              ) {
               this._ubicacion.ubicacion();
                this._ubicacion.usuario1.valueChanges()
                    .subscribe(data =>{
                      this.usuario1 = data;
                    })


                     this._ubicacion.usuario2.valueChanges()
                         .subscribe(data =>{
                           this.usuario2 = data;
                         })



  }



}
