import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProductByCategoriesPage } from '../product-by-categories/product-by-categories';
import { Storage } from '@ionic/storage';

import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

	Woocommerce: any;
	categories = [];

	homePage: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {

  	this.homePage = HomePage;

  	this.Woocommerce = WC({
  		url: "http://localhost/wordpress",
  		consumerKey: 'ck_6c57fb4427600f212a94317e36b282094513910f',
  		consumerSecret: 'cs_0a49c15c4036fe48bfe6dd62f6bfda600bc48b28',
  		wpAPI: true,
  		version: 'wc/v2',
  		queryStringAuth: true
  	});

  	this.Woocommerce.getAsync("products/categories").then((data) => {
  		// console.log('Categories: ' + JSON.parse(data.body));
  		let filter_cat: any[] = JSON.parse(data.body);
  		let self = this;
  		
  		//filter parent categories
  		filter_cat.forEach(function(value) {
  			if(value.parent == 0) {

  				if(value.slug == 'footwear') {
  					value.icon = 'walk';
  				}
  				if(value.slug == 'swimwear') {
  					value.icon = 'sunny';
  				}

  				self.categories.push(value);
  			}
  		});

  	}, (err) => {
  		console.log(err);
  	});
  	
  }

  //pass in parameter category to products by category page
  openCategoryPage(category) {
  	// this.navCtrl.push(ProductByCategoriesPage, { "category": category  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
