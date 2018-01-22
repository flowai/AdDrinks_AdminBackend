import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';

interface Bean {
  title: string;
  value: number;
  src: string;
}

@Component({
  selector: 'page-beans',
  templateUrl: 'beans.html'
})
export class BeansSite {

  beansCol: AngularFirestoreCollection<Bean>;
  beans: any;

  title: string;
  value: number;

  constructor(public navCtrl: NavController, private afs: AngularFirestore, public alertCtrl: AlertController) {
    this.beansCol = this.afs.collection<Bean>('beans');
    this.beans = this.beansCol.snapshotChanges()
                        .map(actions => {
                            return actions.map(a => {
                              const data = a.payload.doc.data() as Bean;
                              const id = a.payload.doc.id;
                              return {id, data};
                            })
                          })
    //const groceryListRef = this.fireStore.collection<Grocery>(`/groceryList`);
  }

  addEntry(event) {
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
            this.addPost(data.Sorte, data.Anzahl, data.Link);
            console.log('Saved Bean');
          }
        }
      ]
    });
    alert.present();
  }

  addPost(title: string, value: number, src: string) {
    this.beansCol.add({'title': title, 'value': value, 'src': src});
    console.log('Saved Bean in Firestore: ' + title);
  }

  deleteEntry(id) {
    this.afs.doc('beans/'+id).delete();
  }

}
