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
  category: any; //on click
  products_by_cat: any[];

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

  setProductsByCat() {
    this.Woocommerce.getAsync("products?category=" + this.category.id).then((data) => {
      let prodcat: any[] = JSON.parse(data.body);
      let current_catid = prodcat[0].categories[0].id;
      console.log('cat_id_stored:', current_catid);
      if(this.category.id == current_catid) {
        // console.log('the same')
        // this.storage.set('prodcat', prodcat); 
        this.products_by_cat = prodcat;
        // console.log('products_by_cat', this.products_by_cat);
        
        // setTimeout(function() {
          // console.log(self.storage.get('prodcat'));
          // self.storage.set('prodcat', prodcat); 
          // console.log('set products')
        // }, 1000);
      } else {
        // console.log('not the same');
        // this.storage.remove('prodcat');
        // this.storage.set('prodcat', prodcat); 
      }
      
    }, (err) => {
      console.log(err);
    });
  }

  // async getProductsByCat() {
  //   return await this.storage.get('prodcat');
  // }

  //onclick get products by category
  getClickedCategory(category) {
    // console.log(this.storage.get('prodcat'));
    console.log('clicked', category.id);
    this.category = category;
    // this.storage.ready().then(() => {
      // this.setProductsByCat();
    // });

    // this.getProductsByCat().then((result) => {
      // this.products_by_cat = result;
      // console.log('result', result);
      this.navCtrl.push(ProductByCategoriesPage, {"category": this.category});
        // this.navCtrl.push(ProductByCategoriesPage, {"productsbycategory": this.products_by_cat});
      // console.log('result', result);
    // });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }
}
