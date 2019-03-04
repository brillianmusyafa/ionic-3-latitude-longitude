import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the TambahPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tambah',
  templateUrl: 'tambah.html',
})
export class TambahPage {
  data:any;
  modelTambah:any = {};
  allData:any = [];
  constructor(public navCtrl: NavController, 
    public storage: Storage,
    public toasCtrl: ToastController,
    public navParams: NavParams, public viewCtrl:ViewController) {
    this.data = this.navParams.get('param');
    this.modelTambah.lat = this.data.lat;
    this.modelTambah.lng = this.data.lng;
    console.log(this.modelTambah);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TambahPage');
  }

  dismiss(){
    this.viewCtrl.dismiss(); 
  }

  tambahData(){
    this.storage.get('data').then((val)=>{
      if(val==null){
        this.storage.set('data',[this.modelTambah]).then((data)=>{
          console.log(data);
        });
      }
      else{
        this.allData = val;
        this.allData.push(this.modelTambah);
        this.storage.set('data',this.allData);
      }

      this.dismiss();
      this.presetnToast();
    });
  }

  presetnToast(){
    let toast = this.toasCtrl.create({
      'message':'Data Berhasil Disimpan',
      'duration':3000
    });

    toast.present();
  }

}
