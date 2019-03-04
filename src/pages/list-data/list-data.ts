import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as papa  from 'papaparse';
import { File } from '@ionic-native/file';

/**
 * Generated class for the ListDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-data',
  templateUrl: 'list-data.html',
})
export class ListDataPage {

  data:any = [];

  constructor(public navCtrl: NavController, 
    public storage: Storage,
    public alertCtrl : AlertController,
    public file: File,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListDataPage');

    this.loadFromStorage();
  }

  loadFromStorage(){
    this.storage.get('data').then((val)=>{
      this.data = val;
      console.log(this.data);
    });
  }

  downloadCsvData(){
    let csv = papa.unparse({
      fields: ['lat','lng','nik','nama'],
      data: this.data
    })

    // Dummy implementation for Desktop download purpose
    var blob = new Blob([csv]);
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "newdata.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    this.getStoragePath().then(val=>{
      let timestamp = new Date();
      let filename = 'new_data_'+timestamp.getTime()+'.csv';
      this.file.writeFile(val,filename,blob).catch(err=>{
        console.log(err)
      }).then(result=>{
        console.log(result);

        let alert = this.alertCtrl.create({
          title:'Download',
          subTitle:'Data berhasil disimpan di : ' + result.fullPath
        });
        alert.present();
      });
    });
  }

  getStoragePath(){
    let file = this.file;
    return this.file.resolveDirectoryUrl(this.file.externalRootDirectory).then(function (directoryEntry) {
        return file.getDirectory(directoryEntry, "brilliancode.mylatlng", {
            create: true,
            exclusive: false
        }).then(function () {
            return directoryEntry.nativeURL + "brilliancode.mylatlng/";
        });
    });
  }

}
