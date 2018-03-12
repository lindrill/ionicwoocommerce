import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProductDetailsPage } from '../product-details/product-details';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-product-by-categories',
  templateUrl: 'product-by-categories.html',
})
export class ProductByCategoriesPage {

	Woocommerce: any;
  products_by_cat:any = [];
	page: number;
	category: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public plt: Platform) {

  	this.page = 1;
    this.products_by_cat = this.navParams.get("productsbycategory")
    this.category = this.navParams.get("category")

    this.Woocommerce = WC({
      url: "http://localhost/wordpress",
      consumerKey: 'ck_6c57fb4427600f212a94317e36b282094513910f',
      consumerSecret: 'cs_0a49c15c4036fe48bfe6dd62f6bfda600bc48b28',
      wpAPI: true,
      version: 'wc/v2',
      queryStringAuth: true
    });

  }

  openProductDetailsPage(product) {
    this.navCtrl.push(ProductDetailsPage, {'product_details': product});
  }

  ngOnInit() {
    console.log('ngOnInit', this.products_by_cat);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad');
  }

}
