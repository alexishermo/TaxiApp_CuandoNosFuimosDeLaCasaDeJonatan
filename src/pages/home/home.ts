import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { Taxista } from '../taxista/taxista';
import { Usuario } from '../usuario/usuario';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public http:Http,public alertCtrl:AlertController) {
     console.log('PETICION GET');
    this.http.get('http://taxi.camarena.tk/api/test/travel').map(res=>res.json()).subscribe(data=>{console.log(data)});
    console.log('FIN PETICION GET');
  
  }//constructor

  authTaxi(user, password){
    let data = {
      permission_number: user,
      password: password,
    };
    let headers = {'Content-Type': 'application/json'};
    console.log(data);
    this.http.post('http://taxi.camarena.tk/api/test/driver/login',data,headers)
    .map(res => res.json())
      .subscribe(response => {
        console.log(response);

        if(response.code==200){
          this.navCtrl.push(Taxista);
        }
    });
  }

  authUser(user, password){
    let data = {
      email: user,
      password: password,
    };
    let headers = {'Content-Type': 'application/json'};
    console.log(data);
    this.http.post('http://taxi.camarena.tk/api/test/user/login',data,headers)
    .map(res => res.json())
      .subscribe(response => {
        console.log(response);
        if(response.code==200){
          this.navCtrl.push(Usuario);
        }
    });
  }

  loginTaxista() {
  let alert = this.alertCtrl.create({
    title: 'Login',
    inputs: [
      {
        name: 'username',
        placeholder: 'Username'
      },
      {
        name: 'password',
        placeholder: 'Password',
        type: 'password'
      }
    ],
    buttons: [
      {
        text: 'Aceptar',
        role: 'aceptar',
        handler: data => {
          this.authTaxi(data.username,data.password);

        }
      },
      {
        text: 'Cancelar',
        role: 'cancelar',
        handler: data => {
          
        }
      }
    ]
  });
  alert.present();
}

loginUsuario() {
  let alert = this.alertCtrl.create({
    title: 'Login',
    inputs: [
      {
        name: 'username',
        placeholder: 'Username'
      },
      {
        name: 'password',
        placeholder: 'Password',
        type: 'password'
      }
    ],
    buttons: [
      {
        text: 'Aceptar',
        role: 'aceptar',
        handler: data => {
          this.authUser(data.username,data.password);
        }
      },
      {
        text: 'Cancelar',
        role: 'cancelar',
        handler: data => {
          
        }
      }
    ]
  });
  alert.present();
}


}
