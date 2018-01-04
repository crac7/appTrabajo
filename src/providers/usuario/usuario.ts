import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {  AlertController } from 'ionic-angular';
//liberias para login con facebook
import firebase from 'firebase';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { AngularFireAuth } from 'angularfire2/auth';
import { Platform } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
/////////Fin//////////7
import { Storage } from '@ionic/storage';
@Injectable()
export class UsuarioProvider {
	userFirebase: AngularFireObject<any>;
  userData= {
					 			email:null,
				 				username: null,
				 				picture: null,
				 				uid: null
					};

  constructor(private alertCtrl:AlertController,
							 private facebook: Facebook,
							 private afAuth: AngularFireAuth,
							 private platform: Platform,
						   private db: AngularFireDatabase,
						   private storage:Storage) {
    console.log('Hello UsuarioProvider Provider');
  }
	signFacebook() {
		if (this.platform.is('cordova')) {//// si esta un dispositivo movil
			return this.facebook.login(['email', 'public_profile']).then((res: FacebookLoginResponse) => {
				//////////////////////////////////UID Firebase////////////////////////////////////////////////////////////
				const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
				 firebase.auth().signInWithCredential(facebookCredential);
				 /////////////////////////////////Datos de Facebook///////////////////////////////////////////
				 const user = firebase.auth().currentUser;
				/////////////Url que conecta don firebase el cual le envia el uid///////////////////////////////
			         this.userFirebase = this.db.object('Usuarios/'+user.uid);
				//////////////////////////Llenando Objeto userData/////////////////////////////////////////////
												this.userData= {
																					email: user.email,
																					username: user.displayName,
																					picture: user.photoURL,
																					uid: user.uid
																				}
        //////////////////////////Guardando los datos del obejto en firebase/////////////////////////////
																this.userFirebase.set(this.userData);
			 ///////////////////////////Guardando el objeto en el Storage////////////////////////////////////////
																	this.Guardar_storage();
			})
			 .catch( (error) => this.ErrorAlert(`Error en promesa de Facebook ${ JSON.stringify(error) }`));
		 }
	}

	Guardar_storage(){
						 let promesa = new Promise((resolve,reject)=>{
							   if (this.platform.is('cordova')) {//// si esta un dispositivo movil
  							 				this.storage.set('user',this.userData);
											 }
						 })
						  .catch( (error) => this.ErrorAlert(`Error en promesa de GuardaStorage ${ JSON.stringify(error) }`));
						 return promesa;
			}
  Carga_storage(){

			 let promesa = new Promise((resolve,reject)=>{
				 if (this.platform.is('cordova')) {//// si esta un dispositivo movil
					 		this.storage.get('user').then((val) => {
								//LLenando el obejto con el storage
								 this.userData=val;
								   resolve();
								});
						}
			 })
			 .catch( (error) => this.ErrorAlert(`Error en promesa de Carga_storage ${ JSON.stringify(error) }`));
			 return promesa;
		 }
		 signOut() {
		    this.afAuth.auth.signOut();
		  }

			 ErrorAlert(error) {
		     let alert = this.alertCtrl.create({
		       title: 'ERROR',
		       subTitle: error ,
		       buttons: ['OK']
		     });
		     alert.present();
		   }
}
