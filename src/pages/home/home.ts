import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController, AlertController, Platform } from 'ionic-angular';
import { TambahPage } from '../tambah/tambah';
import { ListDataPage } from '../list-data/list-data';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
	selector: 'home-page',
	templateUrl: 'home.html'
})
export class HomePage {

	@ViewChild('map') mapElement: ElementRef;
	map: any;
	marker:any;
	lat:null;
	lng:null;
	latLng:any = null;


	constructor(public navCtrl: NavController,
		public geolocation: Geolocation,
		public platform: Platform,
		public alertCtrl: AlertController,
		public modalCtrl: ModalController) {
			this.platform.ready().then(()=>{
				this.loadMap();
			});

	}

	ionViewDidLoad(){
		
	}

	lihatData(){
		this.navCtrl.push(ListDataPage);
	}

	async getPosisi(){
		// let options = {
		// 	enableHighAccuracy: false,
		// 	timeout: 10000,
		// 	maximumAge: 60000
		// };
		// this.geolocation.getCurrentPosition(options).then(resp=>{
		// 	console.log(resp.coords);
		// 	this.latLng = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
		// 	this.loadMap();
		// 	let alert = this.alertCtrl.create({
		// 		title:'Sukses',
		// 		subTitle:"lat: "+resp.coords.latitude+" Lng: "+resp.coords.longitude
		// 	});
		// 	alert.present();
			
		// }).catch(err=>{
		// 	console.log(err);
		// 	let alert = this.alertCtrl.create({
		// 		title:'Error',
		// 		subTitle:JSON.stringify(err)
		// 	});
		// 	alert.present();
		// });
		let options = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
		navigator.geolocation.getCurrentPosition(resp=>{
			console.log(resp);
				this.latLng = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
				this.loadMap();
		},
			err=>{
				let alert = this.alertCtrl.create({
					title:'Error',
					subTitle:err.message
				});
				alert.present();
			},
			options);

		// navigator.geolocation.getCurrentPosition(()=>function(resp){
		// 	console.log(resp);
		// 	this.latLng = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
		// 	this.loadMap();
		// 	let alert = this.alertCtrl.create({
		// 		title:'Sukses',
		// 		subTitle:"lat: "+resp.coords.latitude+" Lng: "+resp.coords.longitude
		// 	});
		// 	alert.present();
		// });
		// this.geolocation.getCurrentPosition().then((resp) => {
		// 		console.log(resp.coords);
		// 	this.latLng = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
		// 	this.loadMap();
		// 	let alert = this.alertCtrl.create({
		// 		title:'Sukses',
		// 		subTitle:"lat: "+resp.coords.latitude+" Lng: "+resp.coords.longitude
		// 	});
		// 	alert.present();
		//    }).catch((error) => {
		// 	 console.log('Error getting location', error);
		//    });
	}

	loadMap(){
		console.log('load map')
		if(this.latLng == null){
			this.latLng = new google.maps.LatLng(-34.9290, 138.6010);
		}
		// let latLng = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
		let mapOptions = {
			center: this.latLng,
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}

		console.log(mapOptions);

		this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

		google.maps.event.addListener(this.map,'click',(ev)=>{
			this.addMarker(ev);
		});
	}

	addMarker(ev){

		if(this.marker){
			this.marker.setMap(null);
		}
		this.marker = new google.maps.Marker({
			map: this.map,
			draggable:true,
			animation: google.maps.Animation.DROP,
			position: ev.latLng
		});

		this.lat = this.marker.position.lat();
		this.lng = this.marker.position.lng();

		google.maps.event.addListener(this.marker,'drag',()=>{
			this.lat = this.marker.position.lat();
			this.lng = this.marker.position.lng();
		});

		let content = "<h4>Information!</h4>";

		this.addInfoWindow(this.marker, content);

	}

	addInfoWindow(marker, content){

		let infoWindow = new google.maps.InfoWindow({
			content: content
		});

		google.maps.event.addListener(this.marker, 'click', () => {
			infoWindow.open(this.map, this.marker);
			console.log(this.map);
		});

	}

	addData(){
		let param = {
			lat:this.lat,
			lng:this.lng
		};
		let modal = this.modalCtrl.create(TambahPage,{param:param});
		modal.present();
	}
}