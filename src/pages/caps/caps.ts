import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

interface Product {
  manufacturer: string;
  src: string;
  title: string;
  value: number;
  type: string;
  manufacturerName: string;
}

@Component({
  selector: 'page-caps',
  templateUrl: 'caps.html'
})
export class CapsSite {

  email: string;

  capsCol: AngularFirestoreCollection<Product>;
  caps: any;

  title: string;
  value: number;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, private afs: AngularFirestore, public alertCtrl: AlertController) {
    this.capsCol = this.afs.collection<Product>('products', ref => ref.where('type', '==', 'CAPS'));
    this.caps = this.capsCol.snapshotChanges()
                        .map(actions => {
                            return actions.map(a => {
                              const data = a.payload.doc.data() as Product;
                              const id = a.payload.doc.id;
                              return {id, data};
                            })
                          })
  }

  ionViewWillLoad() {
    this.email = this.afAuth.auth.currentUser.email;
    console.log(this.email);
  }

  /*addEntry(event) {
    let alert = this.alertCtrl.create({
      title: 'Neuer Eintrag (Caps)',
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
            console.log('Cancel new Cap');
          }
        },
        {
          text: 'Speichern',
          handler: data => {
            this.addPost(data.Sorte, data.Anzahl, data.Link);
            console.log('Saved Cap');
          }
        }
      ]
    });
    alert.present();
  }*/

  /*addPost(title: string, value: number, src: string) {
    this.capsCol.add({'title': title, 'value': value, 'src': src});
    console.log('Saved Cap in Firestore: ' + title);
  }*/

  deleteEntry(id) {
    this.afs.doc('caps/'+id).delete();
  }

}
