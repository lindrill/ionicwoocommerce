import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-product-by-categories',
  templateUrl: 'product-by-categories.html',
})
export class ProductByCategoriesPage {

	Woocommerce: any;
	products = [];
	page: number;
	category: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  	this.page = 1;
  	this.category = this.navParams.get("category");
  	self = this;

  	this.Woocommerce = WC({
  		url: "http://localhost/wordpress",
  		consumerKey: 'ck_6c57fb4427600f212a94317e36b282094513910f',
  		consumerSecret: 'cs_0a49c15c4036fe48bfe6dd62f6bfda600bc48b28',
  		wpAPI: true,
  		version: 'wc/v2',
  		queryStringAuth: true
  	});

  	//show products by category
  	this.Woocommerce.getAsync("products").then((data) => {
  		let temp: any[] = JSON.parse(data.body);

  		temp.forEach(function(value) {
  			let cat: any[] = value.categories;
  			cat.forEach(function(cat_value) {
  				if(cat_value.slug == self.category.slug) {
  					self.products.push(value);
  				} 
  			});
	  		// self.products.push(value);
	  		// if(value.categories.slug == self.category.slug) {
	  		// 	console.log(value);
	  		// }
	  	});

  	}, (err) => {
  		console.log(err);
  	});

  	// console.log(this.category);
  	

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductByCategoriesPage');
  }

}
