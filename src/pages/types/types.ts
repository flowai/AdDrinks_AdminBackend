import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AlertController } from 'ionic-angular';
import { AuthService } from './../../auth/auth.service';
import { LoginPage } from '../login/login';

interface Type {
    type: string;
}

@Component({
  selector: 'page-types',
  templateUrl: 'types.html'
})
export class TypesSite {
  email: string;

  types: AngularFirestoreCollection<Type>;
  productTypes: any;

  title: string;
  value: number;

  constructor(public authService: AuthService, public navCtrl: NavController, private afs: AngularFirestore, public alertCtrl: AlertController) {
    this.types = this.afs.collection<Type>('productTypes');
    this.productTypes = this.types.snapshotChanges()
                        .map(actions => {
                          return actions.map(a => {
                            const data = a.payload.doc.data() as Type;
                            const id = a.payload.doc.id;
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

  addType() {
    console.log("AddType Methode");
    let prompt = this.alertCtrl.create({
      title: 'Neuer Produkttyp',
      message: "Bitte einen neuen Produkttypen eingeben - ohne Umlaute",
      inputs: [
        {
          name: 'type',
          placeholder: 'BEISPIEL_TYP'
        },
      ],
      buttons: [
        {
          text: 'Abbruch',
          handler: data => {
            console.log('Kein neuer Produkttyp angelegt');
          }
        },
        {
          text: 'Hinzufügen',
          handler: data => {
            this.addTypeToDB(data.type);
            console.log("Neuer Produkttyp: "+ data.type.toUpperCase() + " angelegt.");
          }
        }
      ]
    });
    prompt.present();
  }

  addTypeToDB(type: string) {
    this.types.add({'type': type});
    console.log("Neuer Produkttyp " + type + " angelegt.");
  }

  logout() {
    console.log("pressed Logout");
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
  }
}
