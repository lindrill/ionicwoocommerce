import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProductDetailsPage } from '../product-details/product-details';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

	cartItems: any[] = [];
	total: any;
	showEmptyCartMessage: boolean = false;
	total_cart: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public viewCtrl: ViewController, public appCtrl: App) {

  	this.total = 0;

  	this.storage.ready().then( () => {
  		this.storage.get('cart').then((data) => {
  			this.cartItems = data;
  			console.log('cartItems', this.cartItems);

  			if(this.cartItems.length > 0) {
  				let self = this; 
  				this.cartItems.forEach(function(item, index) {
  					self.total = self.total + (item.product.price * item.qty);
  				})
  			} else {
  				this.showEmptyCartMessage = true;
  			}

  			console.log('total inside', this.total);

  		})
  	})
  }
  

  removeFromCart(item, i) {

  	let price = item.product.price;
  	let qty = item.qty;

  	this.cartItems.splice(i, 1);

  	this.storage.set("cart", this.cartItems).then( () => {
  		// console.log('total_remove', this.total);
  		this.total = this.total - (price * qty);
  	})

  	if(this.cartItems.length == 0) {
  		this.showEmptyCartMessage = true;
  	}
  }


  checkOut() {

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

}
