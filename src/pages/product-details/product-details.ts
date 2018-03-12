import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

	Woocommerce: any;
	product_details:any = [];
	reviews: any[];
	cart: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public toastCtrl: ToastController) {
  	this.product_details.push(this.navParams.get("product_details"));
  	console.log('prod', this.product_details);

  	this.Woocommerce = WC({
  		url: "http://localhost/wordpress",
  		consumerKey: 'ck_6c57fb4427600f212a94317e36b282094513910f',
  		consumerSecret: 'cs_0a49c15c4036fe48bfe6dd62f6bfda600bc48b28',
  		wpAPI: true,
  		version: 'wc/v2',
  		queryStringAuth: true
  	});

  	this.Woocommerce.getAsync("products/" + this.product_details[0].id + "/reviews").then((data) => {
  		// console.log(JSON.parse(data.body));
  		this.reviews = JSON.parse(data.body);
  		console.log('reviews', this.reviews);
  	}, (err) => {
  		console.log(err);
  	});
  }

  addToCart(product) {

  	// console.log('cart storage', this.storage.get('cart').length);


  	// this.storage.remove('cart');
  	this.storage.get("cart").then((data) => {
  		// let self = this;
  		console.log('storage data', data);
  		if(data == null || data.length == 0) {
  			
  			console.log('null');

  			this.cart.push({
  				"product": product,
  				"qty": 1,
  				"amount": parseFloat(product.price)
  			});

  			this.storage.set('cart', this.cart)
  			console.log('cart', this.cart);
  			// console.log('cart_get', this.storage.get('cart'));

  		} else {
  			// console.log('else');
  			data.forEach(function(value) {
  				let self = this;
  				// console.log('value', value);
  				// console.log('product_id', product.id);
  				if(product.id == value.product.id) {
  					console.log('same, qty + 1')
  					let qty = value.qty + 1;
  					// self.cart.qty = qty;
  					// console.log('cartqty', self.cart);

  				}

  			});
  			// console.log('cart', self.cart);
  			// for(let i = 0; i < data.length; i++) {
  				// console.log('for', data[i]);

	  		// 		if(product.id == data[i].product.id) {
	  		// 			console.log('product added to the cart');

	  		// 			let qty = data[i].qty;

	  		// 			data[i].qty = qty + 1;
	  		// 			data[i].amount = parseFloat(data[i].amount) + parseFloat(data[i].product.price);
	  		// 			added = 1;
	  		// 		}
	  		// 	}
	  		// }
	  	}
  	})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

}
