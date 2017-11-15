import  { Component } from '@angular/core';
import {  AlertController, LoadingController, MenuController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import {MenuPage} from '../menu/menu';
//liberias para login con facebook
import firebase from 'firebase';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
/////////Fin//////////7
@Component({
	 selector:'page-login',
	 templateUrl: 'login.html'
})

export class LoginPage{
	userData=null;
	user={"email":"", "password":""};
	constructor(private alertCtrl:AlertController,
				public loadingCtrl:LoadingController,
				public navCtrl: NavController,
				private facebook: Facebook,
				 private menuCtrl :MenuController){

	}
	ngOnInit(){
		console.log("arranco");
	}

	login = ():void=>{
		 if(this.user.email !="" && this.user.password!=""){
		 	 let loading = this.loadingCtrl.create({
		 	 	content:"Cargando..."
		 	 });
		 	 loading.present();
		 	 setTimeout(()=>{
		 	 	loading.dismiss();
		 	 	this.navCtrl.push(HomePage);
		 	 },500);
		 }
	}

      loginFacebook(){
		   this.facebook.login(['email','public_profile']).then((response: FacebookLoginResponse) => {
		    this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)',[]).then(profile => {
		       this.userData= {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'],username: profile['name']};
		         //////Pasar datos una nueva pagina///////
		         let loading = this.loadingCtrl.create({
		 	 			content:"Cargando ..."
		 			 });
		 	 	 loading.present();
		 	 	 setTimeout(()=>{
		 	 	 	loading.dismiss();
		 	 	 	this.navCtrl.push(HomePage, this.userData);
		 	 	 },500);
		         ////////////////////////////////////////
		    })
		   })

      }
			mostrarMenu(){
				 this.menuCtrl.toggle();
			}

}
