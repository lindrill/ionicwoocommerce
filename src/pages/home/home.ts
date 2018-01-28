import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	
	Woocommerce: any;
	products: any[];
	page: number;
	more_products: any[];

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {

  	this.page = 2;

  	this.Woocommerce = WC({
  		url: "http://localhost/wordpress",
  		consumerKey: 'ck_edcc047b31c7c20e86885fd4e28c25e105fa190b',
  		consumerSecret: 'cs_ce1dc538100cc2a86d2be05304b548b32902c483',
  		wpAPI: true,
  		version: 'wc/v2',
  		queryStringAuth: true
  	});

  	this.loadMoreProducts(null);

  	this.Woocommerce.getAsync("products").then((data) => {
  		// console.log(JSON.parse(data.body));
  		this.products = JSON.parse(data.body);
  	}, (err) => {
  		console.log(err);
  	});
  }

  loadMoreProducts(event) {
  	if(event == null) {
  		this.page = 1;
  		this.more_products = [];
  	} else {
  		this.page++;
  	}
  	this.Woocommerce.getAsync("products?page=" + this.page).then((data) => {
  		console.log(JSON.parse(data.body));
  		this.more_products = this.more_products.concat(JSON.parse(data.body));
  		
  		if (event != null) {
  			event.complete();
  		}

  		console.log("length" + JSON.parse(data.body).length);

  		if(JSON.parse(data.body).length == 0) {
  			event.enable(false);
  			this.toastCtrl.create({
  				message: "No more products.",
  				duration: 3000
  			}).present();
  		} 

  	}, (err) => {
  		console.log(err);
  	});
  }

}
