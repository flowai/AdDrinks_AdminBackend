import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthService } from '../../auth/auth.service';

interface Product {
  manufacturer: string;
  src: string;
  title: string;
  value: number;
  type: string;
  manufacturerName: string;
}

@Component({
  selector: 'page-beans',
  templateUrl: 'beans.html'
})
export class BeansSite {

  email: string;

  beansCol: AngularFirestoreCollection<Product>;
  beans: any;

  title: string;
  value: number;

  constructor(private authService: AuthService, public navCtrl: NavController, private afs: AngularFirestore, public alertCtrl: AlertController) {
    this.beansCol = this.afs.collection<Product>('products', ref => ref.where('type', '==', 'BEANS'));
    this.beans = this.beansCol.snapshotChanges()
                        .map(actions => {
                            return actions.map(a => {
                              const data = a.payload.doc.data() as Product;
                              const id = a.payload.doc.id;
                              //const manu = this.afs.doc('data.manufacturer.path');
                              return {id, data};
                            })
                          })
  }

  //Do not enter Page if not logged in
  ionViewCanEnter() {
    console.log("check if view can be entered");
    return (this.authService.getUser() != null);
  }

  ionViewWillLoad() {
    this.email = this.authService.getUser().email;
    console.log(this.email);
  }

  /*addEntry(event) {
    let alert = this.alertCtrl.create({
      title: 'Neuer Eintrag (Bohnen)',
      inputs: [{
        name: 'Sorte',
        placeholder: 'Sorte'
      },{
        name: 'Anzahl',
        placeholder: 'Anzahl'
      },{
        name: 'Link',
        placeholder: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/275px-A_small_cup_of_coffee.JPG'
      }],
      buttons: [
        {
          text: 'Abbrechen',
          handler: data => {
            console.log('Cancel new Bean');
          }
        },
        {
          text: 'Speichern',
          handler: data => {
            //this.addPost(data.Sorte, data.Anzahl, data.Link);
            console.log('Saved Bean');
          }
        }
      ]
    });
    
    alert.present();
  }*/

/*  addPost(title: string, value: number, src: string) {
    this.beansCol.add({'title': title, 'value': value, 'src': src});
    console.log('Saved Bean in Firestore: ' + title);
  }*/

  deleteEntry(id) {
    this.afs.doc('products/'+id).delete();
  }

  logout() {
    console.log("pressed Logout");
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
  }

}
