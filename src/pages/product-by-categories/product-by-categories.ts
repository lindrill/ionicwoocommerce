import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-product-by-categories',
  templateUrl: 'product-by-categories.html',
})
export class ProductByCategoriesPage {

	Woocommerce: any;
	// products_by_cat: { [id: string]: any; } = [];
  public products_by_cat: any[];
  async_products: any[];

	page: number;
	category: any;
  sample: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {

  	this.page = 1;
  	this.category = this.navParams.get("category");

  }

  setProductsByCat() {
    this.Woocommerce = WC({
      url: "http://localhost/wordpress",
      consumerKey: 'ck_6c57fb4427600f212a94317e36b282094513910f',
      consumerSecret: 'cs_0a49c15c4036fe48bfe6dd62f6bfda600bc48b28',
      wpAPI: true,
      version: 'wc/v2',
      queryStringAuth: true
    });


    this.Woocommerce.getAsync("products?category=" + this.category.id).then((data) => {
      let temp: any[] = JSON.parse(data.body);
      this.storage.set('temp', temp);

    }, (err) => {
      console.log(err);
    });
  }

  async getProductsByCat() {
    return this.storage.get('temp');
  }

  ionViewDidLoad() {
    if(this.category.id) {
      this.setProductsByCat();
      // this.getProductsByCat();
      this.getProductsByCat().then((result) => {
          this.products_by_cat = result;
          console.log('result', result);
      });
    }
  }

  ionViewWillLeave() {
    // this.products_by_cat = null;
  } 

}
