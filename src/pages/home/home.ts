import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { BeansSite } from '../beans/beans';
import { CapsSite } from '../caps/caps';
import { CoffeeSite } from '../coffee/coffee';
import { PadsSite } from '../pads/pads';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  email: string;

  constructor(private afAuth: AngularFireAuth, private toast: ToastController, public navCtrl: NavController) {

  }

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid) {
        this.toast.create({
          message: 'Welcome to APP_NAME, ${data.email}',
          duration: 3000
        }).present();
        this.getEmail(data.email);
      } else {
        this.toast.create({
          message: 'Could not find Authentification Details',
          duration: 3000
        }).present();
      }
    });
  }

  clickBeans(event) {
    this.navCtrl.push(BeansSite);
  }

  clickCaps(event) {
    this.navCtrl.push(CapsSite);
  }

  clickCoffee(event) {
    this.navCtrl.push(CoffeeSite);
  }

  clickPads(event) {
    this.navCtrl.push(PadsSite);
  }

  getEmail(email) {
    console.log("User is: "+ email);
    this.email = email;
  }

}
