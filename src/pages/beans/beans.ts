import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

interface Bean {
  title: string;
  value: number;
}

@Component({
  selector: 'page-beans',
  templateUrl: 'beans.html'
})
export class BeansSite {

  beansCol: AngularFirestoreCollection<Bean>;
  beans: Observable<Bean[]>;

  constructor(public navCtrl: NavController, private afs: AngularFirestore) {
    this.beansCol = this.afs.collection<Bean>('beans');
    this.beans = this.beansCol.valueChanges();
    //const groceryListRef = this.fireStore.collection<Grocery>(`/groceryList`);
  }

}
