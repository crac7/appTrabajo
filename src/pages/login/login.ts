import  { Component } from '@angular/core';
import {  AlertController, LoadingController, MenuController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import {MenuPage} from '../menu/menu';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { TabsPage } from '../tabs/tabs';
/////////Fin//////////7
@Component({
	 selector:'page-login',
	 templateUrl: 'login.html'
})

export class LoginPage{
user={"email":"", "password":""};

	constructor(private alertCtrl:AlertController,
				public loadingCtrl:LoadingController,
				public navCtrl: NavController,
		   private _usuarioStg: UsuarioProvider) {




	}
	ngOnInit(){
		console.log("arranco");
	}


	Login() {

				this._usuarioStg.signFacebook()
				  .then(()=>{
						this._usuarioStg.Carga_storage()
						 .then(()=>{
							 if(this._usuarioStg.userData.username){
									this.navCtrl.push(TabsPage);
							 }
						 });
					});




	}

}
