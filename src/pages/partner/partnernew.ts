import { Component } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { NavController, LoadingController } from "ionic-angular";
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, Reference } from "angularfire2/firestore";
import * as firebase from 'firebase';

interface Partner {
    companyname: string;
    companyaddress: {
      street: string,
      number: string,
      zipcode: number,
      city: string
    };
    website: string;
    logoref: string;
  }


@Component({
    selector: 'page-partner',
    templateUrl: 'partnernew.html'
})
export class PartnerNewSite {
    partnerNewEntry: FormGroup;

    email: string;

    partnerCol: AngularFirestoreCollection<Partner>;
    partners: any;

    //File Upload
    selectedFiles: FileList
    uploadTask: firebase.storage.UploadTask;

    constructor(private authService: AuthService, public navCtrl: NavController, private afs: AngularFirestore, public formBuilder: FormBuilder, public loadingCtrl: LoadingController) {
        this.partnerCol = this.afs.collection<Partner>('partner');
        
            //Create Validators
        this.partnerNewEntry = formBuilder.group({
            companyname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            street: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            number: ['11'],
            zipcode: ['', Validators.compose([Validators.maxLength(5), Validators.pattern('[0-9]*'), Validators.required])],
            city: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            website: ['http://www.testurl.de']
            //website: ['', Validators.compose([urlImageValidator.isValid, Validators.required])]
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

  /*
  * Helper for the file Upload
  */
 selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  createPartner(newEntry) {
    if(this.partnerNewEntry.valid){
        let loader = this.loadingCtrl.create({
          content: "Please wait..."
        });

        //map newEntry -> partner
        let partner: Partner = {
            companyname: newEntry.controls.companyname.value,
            companyaddress: {
                city: newEntry.controls.city.value,
                number: newEntry.controls.number.value,
                street: newEntry.controls.street.value,
                zipcode: newEntry.controls.zipcode.value
            },
            logoref: '',
            website: newEntry.controls.website.value
        }

        let partnerRef = this.partnerCol;
          //File Upload
          const file = this.selectedFiles.item(0);
          const filePath = `partnerLogo/${file.name}`;
        loader.present().then(() => {
          let storageReference = firebase.storage().ref(filePath);
          this.uploadTask = storageReference.put(file);
          this.uploadTask.on('state_changed', function(snapshot) {
            // progress
          }, function(error) {
            console.log(error+error.name);
          }, function() {
            storageReference.getDownloadURL().then(url => {
              partner.logoref = url;
              partnerRef.add(partner);
              loader.dismiss();
              console.log('Saved Bean in Firestore: ' + partner.companyname);
            });
  
          })
        });
        
      } else {
        console.log('Error - wrong entry details');
        alert('Bitte beachten Sie die rot markierten Eingabefelder.');
      }
  }
}