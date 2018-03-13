import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProductDetailsPage } from '../product-details/product-details';

@Component({
  selector: 'page-product-by-categories',
  templateUrl: 'product-by-categories.html',
})
export class ProductByCategoriesPage {

  products_by_cat:any = [];
	page: number;
	category: any[];
  total_cart: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public plt: Platform) {

  	this.page = 1;
    this.products_by_cat = this.navParams.get("productsbycategory")
    this.category = this.navParams.get("category")

  }

  openProductDetailsPage(product) {
    this.navCtrl.push(ProductDetailsPage, {'product_details': product});
  }

  ngOnInit() {
    console.log('ngOnInit', this.products_by_cat);
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad');
    this.storage.get('cart').then((data)=>{
      this.total_cart = data.length;
    });
  }

}
