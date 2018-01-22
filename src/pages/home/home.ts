import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BeansSite } from '../beans/beans';
import { CapsSite } from '../caps/caps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  clickBeans(event) {
    this.navCtrl.push(BeansSite);
  }

  clickCaps(event) {
    this.navCtrl.push(CapsSite);
  }

}
