import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorage } from 'angularfire2/storage';
import { Upload } from './Upload';

@Injectable()
export class UploadService {

  constructor(private af: AngularFireModule, private db: AngularFireDatabase, private afstorage: AngularFireStorage) { }

  private basePath:string = '/productPic';

/*  pushUpload(upload: Upload, progress: boolean) : Upload {
    const file = upload.file;
    const filePath = '${this.basePath}/${upload.file.name}';
    const task = this.afstorage.upload(filePath, file);

    task.on(this.firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        progress = false;
        // upload in progress
        //const snap = snapshot as firebase.storage.UploadTaskSnapshot
        //upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100
      },
      (error) => {
        // upload failed
        progress = true;
        console.log(error)
      },
      () => {
        // upload success
        progress = true;
        upload.url = uploadTask.snapshot.downloadURL
        upload.name = upload.file.name
      }
    );
    return(upload);
  }*/



  // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
    this.db.list(`${this.basePath}/`).push(upload);
  }
}