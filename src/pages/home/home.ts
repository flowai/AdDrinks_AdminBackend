import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { BeansSite } from '../beans/beans';
import { CapsSite } from '../caps/caps';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private afAuth: AngularFireAuth, private toast: ToastController, public navCtrl: NavController) {

  }

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid) {
        this.toast.create({
          message: 'Welcome to APP_NAME, ${data.email}',
          duration: 3000
        }).present();
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

}
