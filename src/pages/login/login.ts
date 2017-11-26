import  { Component } from '@angular/core';
import {  AlertController, LoadingController, MenuController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import {MenuPage} from '../menu/menu';
//liberias para login con facebook
import firebase from 'firebase';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { AngularFireAuth } from 'angularfire2/auth';
import { Platform } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
/////////Fin//////////7
@Component({
	 selector:'page-login',
	 templateUrl: 'login.html'
})

export class LoginPage{
	userData=null;
	user={"email":"", "password":""};
	itemRef: AngularFireObject<any>;

	constructor(private alertCtrl:AlertController,
				public loadingCtrl:LoadingController,
				public navCtrl: NavController,
				private facebook: Facebook,
				 private menuCtrl :MenuController,
			 private afAuth: AngularFireAuth,
			 private platform: Platform,
		   private db: AngularFireDatabase) {

    afAuth.authState.subscribe(user => {
      if (!user) {
        this.userData = null;
        return;
      }
      this.userData = user.displayName;
    });


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



			signInWithFacebook() {
		    if (this.platform.is('cordova')) {//// si esta un dispositivo movil
		      return this.facebook.login(['email', 'public_profile']).then((res: FacebookLoginResponse) => {
						//////////////////////////////////UID Firebase////////////////////////////////////////////////////////////
						const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
						 firebase.auth().signInWithCredential(facebookCredential);
						 /////////////////////////////////Datos de Facebook///////////////////////////////////////////
						 const user = firebase.auth().currentUser;
						this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)',[]).then(profile => {
						/////////////Url que conecta don firebase el cual le envia el uid///////////////////////////////
          this.itemRef = this.db.object('Usuarios'+user.uid);

						this.userData= {
								 							email: profile['email'],
							 								first_name: profile['first_name'],
															picture: profile['picture_large']['data']['url'],
															username: profile['name'],
															uid: user.uid
														};

                      this.itemRef.set(this.userData);
							//////Pasar datos una nueva pagina///////
								   	let loading = this.loadingCtrl.create({content:"Cargando ..."});
									 	loading.present();
									 	setTimeout(()=>{
										loading.dismiss();
										this.navCtrl.push(MenuPage, this.userData);//
							//////////////////////Firebase////////////////////////////////////

						 },500);
						})
						///////////////////////////////////////////////////////////////////////////////////////////////////
		      })
		    }
		    else {
		      return this.afAuth.auth
		        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
		        .then(res => console.log(res));
		    }
		  }

}
