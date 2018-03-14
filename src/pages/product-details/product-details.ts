import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CartPage } from '../cart/cart';
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
	total_cart: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public toastCtrl: ToastController, public modalCtrl: ModalController) {

  	this.product_details.push(this.navParams.get("product_details"));

  	this.Woocommerce = WC({
  		url: "http://localhost/wordpress",
  		consumerKey: 'ck_6c57fb4427600f212a94317e36b282094513910f',
  		consumerSecret: 'cs_0a49c15c4036fe48bfe6dd62f6bfda600bc48b28',
  		wpAPI: true,
  		version: 'wc/v2',
  		queryStringAuth: true
  	});

  	this.Woocommerce.getAsync("products/" + this.product_details[0].id + "/reviews").then((data) => {
  		this.reviews = JSON.parse(data.body);
  	}, (err) => {
  		console.log(err);
  	});
  }

  addToCart(product) {

  	// this.storage.remove('cart');
  	this.storage.get("cart").then((data) => {

  		let self = this;

  		if(data == null || data.length == 0) {

  			self.cart.push({
  				"product": product,
  				"qty": 1,
  				"amount": parseFloat(product.price)
  			});
  			this.storage.set('cart', self.cart).then( () => {
  				console.log('Cart Updated');
  				this.toastCtrl.create({
  					message: "Cart Updated",
  					duration: 2000
  				}).present();
  			})

  		} else {
  			let added = 0;
  			console.log('else');
  			for(let i = 0; i < data.length; i++) { // find product in cart

  				if(product.id == data[i].product.id) {
  					console.log('found match', data[i]);
  					let new_qty = data[i].qty;

  					data[i].qty = new_qty + 1;
  					data[i].amount = parseFloat(data[i].amount) + parseFloat(data[i].product.price);
  					added = 1;

  					this.storage.set('cart', data).then( () => {
		  				console.log('Cart Updated');
		  				this.toastCtrl.create({
		  					message: "Cart Updated",
		  					duration: 2000
		  				}).present();
		  			})
  				}
	  		}

	  		if(added == 0) { // if product does not exist in the cart, add it
	  			console.log('New product');
	  			let temp: any[] = [{
	  				"product": product,
	  				"qty": 1,
	  				"amount": parseFloat(product.price)
	  			}];

	  			this.storage.set('cart', data.concat(temp)).then( () => {
	  				console.log('Cart Updated');
	  				this.toastCtrl.create({
	  					message: "Cart Updated",
	  					duration: 2000
	  				}).present();
  				});

	  		}
	  	}
  	})

  	setTimeout(() => {
      this.storage.get('cart').then((data)=>{
				console.log('final storage', data);
				this.total_cart = data.length;
				// console.log('total cart', this.total_cart)
  		});
    }, 1000);
	  
  }

  openCart() {
  	// let modal = this.modalCtrl.create(CartPage);
   //  modal.present();
    this.navCtrl.push(CartPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
    this.storage.get('cart').then((data)=>{
      this.total_cart = data.length;
    });
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.storage.get('cart').then((data)=>{
      this.total_cart = data.length;
    });
  }

}
