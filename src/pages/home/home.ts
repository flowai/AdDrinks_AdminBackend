import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { BeansSite } from '../beans/beans';
import { CapsSite } from '../caps/caps';
import { CoffeeSite } from '../coffee/coffee';
import { PadsSite } from '../pads/pads';
import { PartnerSite } from '../partner/partner';
import { NewEntrySite } from '../newentry/newentry';
import { TypesSite } from '../types/types';
import { AuthService } from '../../auth/auth.service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  email: string;

  constructor(private authService: AuthService, private toast: ToastController, public navCtrl: NavController) {

  }

  //Do not enter Page if not logged in
  ionViewCanEnter() {
     console.log("check if view can be entered");
     return (this.authService.getUser() != null);
  }

  ionViewWillLoad() {
        this.toast.create({
          message: 'Welcome to AdDrinks Adminpanel.',
          duration: 3000
        }).present();
        this.getEmail(this.authService.getUser().email);
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

  clickPartner(event) {
    this.navCtrl.push(PartnerSite);
  }

  clickNewEntry(event) {
    this.navCtrl.push(NewEntrySite);
  }

  clickType(event) {
    this.navCtrl.push(TypesSite);
  }

  getEmail(email) {
    console.log("User is: "+ email);
    this.email = email;
  }

  logout() {
    console.log("pressed Logout");
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
  }

}
