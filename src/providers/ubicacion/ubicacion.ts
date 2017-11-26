import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
//import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
;@Injectable()
export class UbicacionProvider {

  items: Observable<any[]>;

  constructor( private geolocation: Geolocation,
            //   private afDB: AngularFireDatabase
          ){
    console.log('Hello UbicacionProvider Provider');
  }

  iniciar_localizacion(){
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
 // data can be a set of coordinates, or an error (if an error occurred).
 // data.coords.latitude
 // data.coords.longitude
    console.log(data);
});

  }

}
