import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from './../models/user';

import { Observable } from 'rxjs/Observable';

import { LoginPage } from '../pages/login/login';

@Injectable()
export class AuthService {
  private user: any;

  constructor(private auth: AngularFireAuth) {
    this.user = auth.authState;
  }

  // At the moment not required. Users will be manually inserted in Firebase Console, due to Admin Panel
  /*signup(email: string, password: string) {
    this.auth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });    
  }*/

  getUser() {
    return this.auth.auth.currentUser;
  }

  async loginUser(user: User) {
    try {
      const result = this.auth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log(result);
      if(result){
        return true;
      }
    } catch(e){
      console.error(e);
      return false;
    }
  }

  logout() {
    console.log("function triggered");
    this.auth
      .auth
      .signOut();
  }

}