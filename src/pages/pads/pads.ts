import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

interface Pad {
  title: string;
  value: number;
  src: string;
}

@Component({
  selector: 'page-pads',
  templateUrl: 'pads.html'
})
export class PadsSite {

  email: string;

  padsCol: AngularFirestoreCollection<Pad>;
  pads: any;

  title: string;
  value: number;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, private afs: AngularFirestore, public alertCtrl: AlertController) {
    this.padsCol = this.afs.collection<Pad>('pads');
    this.pads = this.padsCol.snapshotChanges()
                        .map(actions => {
                            return actions.map(a => {
                              const data = a.payload.doc.data() as Pad;
                              const id = a.payload.doc.id;
                              return {id, data};
                            })
                          })
    //const groceryListRef = this.fireStore.collection<Grocery>(`/groceryList`);
  }

  ionViewWillLoad() {
    this.email = this.afAuth.auth.currentUser.email;
    console.log(this.email);
  }

  addEntry(event) {
    let alert = this.alertCtrl.create({
      title: 'Neuer Eintrag (Pads)',
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
            console.log('Cancel new Pad');
          }
        },
        {
          text: 'Speichern',
          handler: data => {
            this.addPost(data.Sorte, data.Anzahl, data.Link);
            console.log('Saved Pad');
          }
        }
      ]
    });
    alert.present();
  }

  addPost(title: string, value: number, src: string) {
    this.padsCol.add({'title': title, 'value': value, 'src': src});
    console.log('Saved Pad in Firestore: ' + title);
  }

  deleteEntry(id) {
    this.afs.doc('pads/'+id).delete();
  }

}
