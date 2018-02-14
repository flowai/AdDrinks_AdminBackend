import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AuthService } from './../../auth/auth.service';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(private authService: AuthService, public navCtrl: NavController, public navParams: NavParams) {
    console.log('Login Page loading...');
  }

  loginUser(user: User) {
    if(this.authService.loginUser(user)){
      this.navCtrl.setRoot(HomePage);
    }
  }

  /*
  async loginUser(user: User) {
    try {
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log(result);
      if(result){
        //sets root instead of login
     	  this.navCtrl.setRoot(HomePage);
      }
    } catch(e){
      console.error(e);
    }
  }*/
}
