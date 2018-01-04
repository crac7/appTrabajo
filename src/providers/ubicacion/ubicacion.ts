import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {UsuarioProvider} from '.././usuario/usuario'
;@Injectable()
export class UbicacionProvider {

  usuario1: AngularFireObject<any>;
  usuario2: AngularFireObject<any>;

  constructor( private geolocation: Geolocation,
                private afDB: AngularFireDatabase,
               private _usarioStg: UsuarioProvider
          ){
   this.usuario1 = this.afDB.object('/Usuarios/'+this._usarioStg.userData.uid);
   this.usuario2 = this.afDB.object('/Usuarios/1kvun7ptZsTAM01992UxVGMvT4O2/');

  }

  ubicacion(){
    let watch = this.geolocation.watchPosition()
                watch.subscribe((data) => {
                      this.usuario1.update({lat:data.coords.latitude, lng:data.coords.longitude});
//    this.usuario2.update({lat:data.coords.latitude, lng:data.coords.longitude});
        });

  }

}
