import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { AlertController } from 'ionic-angular';
import { AuthService } from '../../auth/auth.service';
import { LoginPage } from '../login/login';
import { PartnerNewSite } from './partnernew';

interface Partner {
  companyname: string;
  companyaddress: {
    street: string,
    number: string,
    zipcode: number,
    city: string
  };
  logo: string;
}

@Component({
  selector: 'page-partner',
  templateUrl: 'partner.html'
})
export class PartnerSite {

  email: string;

  partnerCol: AngularFirestoreCollection<Partner>;
  partners: any;

  title: string;
  value: number;

  constructor(private authService: AuthService, public navCtrl: NavController, private afs: AngularFirestore, public alertCtrl: AlertController) {
    this.partnerCol = this.afs.collection<Partner>('partner');
    this.partners = this.partnerCol.snapshotChanges()
                        .map(actions => {
                            return actions.map(a => {
                              console.log("Debug a:" + a.payload.doc.data());
                              const data = a.payload.doc.data() as Partner;
                              const id = a.payload.doc.id;
                              return {id, data};
                            })
                          })
    //const groceryListRef = this.fireStore.collection<Grocery>(`/groceryList`);
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

  //deprecated - due to new create screen
  /*addEntry(event) {
    let alert = this.alertCtrl.create({
      title: 'Neuer Eintrag (Partner)',
      inputs: [{
        name: 'companyname',
        placeholder: 'Firmenname'
      },{
        name: 'street',
        placeholder: 'Musterstraße'
      },{
        name: 'number',
        placeholder: '12'
      },{
        name: 'zipcode',
        placeholder: '66111'
      },{
        name: 'city',
        placeholder: 'Saarbrücken'
      },{
        name: 'logo',
        placeholder: 'https://example.com/logo.jpg'
      }],
      buttons: [
        {
          text: 'Abbrechen',
          handler: data => {
            console.log('Cancel new Partner');
          }
        },
        {
          text: 'Speichern',
          handler: data => {
            this.addPost(data.companyname, data.street, data.number, data.zipcode, data.city, data.logo);
            console.log('Saved Partner');
          }
        }
      ]
    });
    alert.present();
  }

  addPost(companyname: string, street: string, number: string, zipcode: number, city: string, logo: string) {
    this.partnerCol.add({'companyname': companyname, 'companyaddress': {'street': street, 'number': number, 'zipcode': zipcode, 'city': city}, 'logo': logo});
    console.log('Saved Partner in Firestore: ' + companyname);
  }*/

  deleteEntry(id) {
    this.afs.doc('partner/'+id).delete();
  }

  create() {
    this.navCtrl.push(PartnerNewSite);
  }

  logout() {
    console.log("pressed Logout");
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
  }
}
