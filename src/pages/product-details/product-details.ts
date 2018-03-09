import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

	product_details: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.product_details = this.navParams.get("product_details");
  	console.log('prod', this.product_details);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

}
