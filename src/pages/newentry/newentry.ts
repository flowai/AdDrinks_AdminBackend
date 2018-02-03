import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

interface Manufacturer {
    companyname: string;
    companyaddress: {
      street: string,
      number: string,
      zipcode: number,
      city: string
    };
    logo: string; 
}

interface Product {
    manufacturer: string;
    src: string;
    title: string;
    value: number;
    type: string;
    manufacturerName: string;
}

interface Type {
  type: string;
}


@Component({
  selector: 'page-newentry',
  templateUrl: 'newentry.html'
})
export class NewEntrySite {

  email: string;
  newEntry = {} as Product;
  helperManu: any;

  manu: AngularFirestoreCollection<Manufacturer>;
  ref: any;

  products: AngularFirestoreCollection<Product>;
  productTypes: AngularFirestoreCollection<Type>;
  productTypeValues: any;

  title: string;
  value: number;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, private afs: AngularFirestore, public alertCtrl: AlertController) {
    this.manu = this.afs.collection<Manufacturer>('partner');
    this.ref = this.manu.snapshotChanges()
                        .map(actions => {
                          return actions.map(a => {
                            const data = a.payload.doc.data() as Manufacturer;
                            const id = a.payload.doc.id;
                            return {id, data};
                          })
                        })
    this.loadProductTypes();

  }

  ionViewWillLoad() {
    this.email = this.afAuth.auth.currentUser.email;
    console.log(this.email);
  }

  changedValueReference() {
    console.log("Reference: " + this.helperManu.id + ", Name: " + this.helperManu.data.companyname);

    this.newEntry.manufacturer = this.helperManu.id;
    this.newEntry.manufacturerName = this.helperManu.data.companyname;

    this.loadProductTypes();
  }

  changedValueProduct() {
    console.log("Product: " + this.newEntry.type);
  }

  createNewEntry(product: Product) {
    this.products.add(product);
    console.log('Saved Bean in Firestore: ' + product.title);
  }

  loadProductTypes() {
    this.productTypes = this.afs.collection<Type>('productTypes');
    this.productTypeValues = this.productTypes.snapshotChanges()
                    .map(actions => {
                      return actions.map(a => {
                        const data = a.payload.doc.data() as Type;
                        const id = a.payload.doc.id;
                        return {id, data};
                      })
                    })
  }

     /* this.products = this.afs.collection<Product>('products');    
    this.productTypes = this.products.ref.orderBy('type')
                  .get()
                  .then(querySnapshot => {
                    const types = ["PADS", "CAPS", "BEANS", "COFFEE"];

                    querySnapshot.forEach(doc =>{
                      if(types.indexOf(doc.data().type) == -1) {
                        types.push(doc.data().type);
                      }
                    })

                    console.log("productTypes:" + types);
                    return types;
                  })
                  .catch(err => console.log(err))*/
}
