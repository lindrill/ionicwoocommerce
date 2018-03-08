import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-product-by-categories',
  templateUrl: 'product-by-categories.html',
})
export class ProductByCategoriesPage {

	Woocommerce: any;
	// products_by_cat: { [id: string]: any; } = [];
  // public products_by_cat: [];
  products_by_cat: any;

	page: number;
	category: any;
  sample: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public plt: Platform) {

  	this.page = 1;
    // this.setProductsByCat();
  	
    // setTimeout(function() {
      // this.products_by_cat = self.navParams.get("productsbycategory");
      this.category = this.navParams.get("category");
    // }, 1000);
    

    // this.plt.ready().then((readySource) => {
    //   console.log('Platform ready from', readySource);
    //   // Platform now ready, execute any required native code
    // });

    this.Woocommerce = WC({
      url: "http://localhost/wordpress",
      consumerKey: 'ck_6c57fb4427600f212a94317e36b282094513910f',
      consumerSecret: 'cs_0a49c15c4036fe48bfe6dd62f6bfda600bc48b28',
      wpAPI: true,
      version: 'wc/v2',
      queryStringAuth: true
    });

    this.Woocommerce.getAsync("products?category=" + this.category.id).then((data) => {
      let prodcat: any[] = JSON.parse(data.body);
      // let current_catid = prodcat[0].categories[0].id;
      // console.log('cat_id_stored:', current_catid);
      // if(this.category.id == current_catid) {
        // console.log('the same')
        // this.storage.set('prodcat', prodcat); 
        this.products_by_cat = prodcat;
        console.log('products_by_cat', this.products_by_cat);
        
        // setTimeout(function() {
          // console.log(self.storage.get('prodcat'));
          // self.storage.set('prodcat', prodcat); 
          // console.log('set products')
        // }, 1000);
      // } else {
      //   console.log('not the same');
      //   // this.storage.remove('prodcat');
      //   // this.storage.set('prodcat', prodcat); 
      // }
      
    }, (err) => {
      console.log(err);
    });

  }

  setProductsByCat() {
    // this.Woocommerce.getAsync("products?category=" + this.category.id).then((data) => {
    //   let prodcat: any[] = JSON.parse(data.body);
    //   let current_catid = prodcat[0].categories[0].id;
    //   console.log('cat_id_stored:', current_catid);
    //   // if(this.category.id == current_catid) {
    //     // console.log('the same')
    //     // this.storage.set('prodcat', prodcat); 
    //     this.products_by_cat = prodcat;
    //     // console.log('products_by_cat', this.products_by_cat);
        
    //     // setTimeout(function() {
    //       // console.log(self.storage.get('prodcat'));
    //       // self.storage.set('prodcat', prodcat); 
    //       // console.log('set products')
    //     // }, 1000);
    //   // } else {
    //   //   console.log('not the same');
    //   //   // this.storage.remove('prodcat');
    //   //   // this.storage.set('prodcat', prodcat); 
    //   // }
      
    // }, (err) => {
    //   console.log(err);
    // });
  }


  ionViewDidLoad() {
    // self = this;
    // self.setProductsByCat();
    console.log('ionViewDidLoad', self.products_by_cat);
    // console.log('navParams', this.navParams.get("productsbycategory"));
    // this.storage.get('prodcat').then((result) => {
    //   this.products_by_cat = result;
    //   console.log('result', result);
    // });
    // console.log('products', this.products_by_cat);
    // if(this.category.id) {
    //   this.setProductsByCat();
    //   // this.getProductsByCat();
    //   this.getProductsByCat().then((result) => {
    //       this.products_by_cat = result;
    //       console.log('result', result);
    //   });
    // }
  }

  ionViewWillLeave() {
    this.products_by_cat = null;
    console.log('ionViewWillLeave', this.products_by_cat);
  }

  ionViewCanEnter() {
    console.log('ionViewCanEnter');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
  }

  // setProductsByCat() {
    


  //   this.Woocommerce.getAsync("products?category=" + this.category.id).then((data) => {
  //     let temp: any[] = JSON.parse(data.body);
  //     this.storage.set('temp', temp);

  //   }, (err) => {
  //     console.log(err);
  //   });
  // }

  // async getProductsByCat() {
  //   return this.storage.get('temp');
  // }

  // ionViewDidLeave() {
  //   this.storage.remove('prodcat');
  // } 

}
