import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthService } from '../../auth/auth.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { valueNewEntryValidator } from '../../validators/valueNewEntryValidator';
import { urlImageValidator } from '../../validators/urlValidator';
import { Upload } from '../../provider/Upload';
import { UploadService } from '../../provider/UploadService';
import { LoadingController } from 'ionic-angular';
import { AngularFireStorage } from 'angularfire2/storage';

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
    pic: Upload;
}

interface Type {
  type: string;
}


@Component({
  selector: 'page-newentry',
  templateUrl: 'newentry.html'
})
export class NewEntrySite {
  newEntryForm: FormGroup;

  email: string;
  newEntry = {} as Product;
  helperManu: any;

  manu: AngularFirestoreCollection<Manufacturer>;
  ref: any;

  products: AngularFirestoreCollection<Product>;
  productTypes: AngularFirestoreCollection<Type>;
  productTypeValues: any;

  typeSet = false;
  manufacturerSet = false;

  title: string;
  value: number;

  //File Upload
  selectedFiles: FileList
  currentFileUpload: Upload
  progress = true;

  constructor(private authService: AuthService, public navCtrl: NavController, private afs: AngularFirestore, public alertCtrl: AlertController, public formBuilder: FormBuilder, private uploadService: UploadService, public loadingCtrl: LoadingController, private afstorage: AngularFireStorage) {
    this.manu = this.afs.collection<Manufacturer>('partner');
    this.ref = this.manu.snapshotChanges()
                        .map(actions => {
                          return actions.map(a => {
                            const data = a.payload.doc.data() as Manufacturer;
                            const id = a.payload.doc.id;
                            return {id, data};
                          })
                        })
    this.products = this.afs.collection<Product>('products'); 
    this.loadProductTypes();
    
    //Create Validators
    this.newEntryForm = formBuilder.group({
      title: ['', Validators.compose([Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      value: ['', Validators.compose([Validators.maxLength(5), valueNewEntryValidator.isValid, Validators.required])],
      src: ['', Validators.compose([urlImageValidator.isValid, Validators.required])]
  });
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

  changedValueReference() {
    console.log("Reference: " + this.helperManu.id + ", Name: " + this.helperManu.data.companyname);

    this.newEntry.manufacturer = this.helperManu.id;
    this.newEntry.manufacturerName = this.helperManu.data.companyname;

    this.loadProductTypes();
    this.manufacturerSet = true;
  }

  changedValueProduct() {
    this.typeSet = true;
    console.log("Product: " + this.newEntry.type);
  }

  /*
  * Helper for the file Upload
  */
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  createNewEntry(product: Product) {
    if(this.newEntryForm.valid && this.manufacturerSet == true && this.typeSet == true){
      let loader = this.loadingCtrl.create({
        content: "Please wait..."
      });

      //Put Values to Product interface
      product.title = this.newEntryForm.controls.title.value
      product.value = this.newEntryForm.controls.value.value
      product.src = this.newEntryForm.controls.src.value
        //File Upload
        const file = this.selectedFiles.item(0);
        const filePath = `productPic/${file.name}`;
        const task = this.afstorage.upload(filePath, file);
      loader.present().then(() => {
        //product.src = task.downloadURL();
        this.products.add(product);
        console.log('Saved Bean in Firestore: ' + product.title);
      });
      task.percentageChanges();
      loader.dismiss();
    } else {
      console.log('Error - wrong entry details');
      alert('Bitte beachten Sie die rot markierten Eingabefelder.');
    }
 
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

  logout() {
    console.log("pressed Logout");
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
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
