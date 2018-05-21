import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,Tabs,Events } from 'ionic-angular';
import { MyUsersComponent } from './my-users/my-users';
import { PromoteDetailsComponent } from './promote-details/promote-details';
import { WithdrawPage } from "../withdraw/withdraw";
@Component({
	selector: 'page-promotion',
	templateUrl: 'promotion.html',
})
export class PromotionPage {
	@ViewChild('promotionTabs') tabs: Tabs;
	private tab1Root:any= PromoteDetailsComponent;
	private tab2Root:any = MyUsersComponent;
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private events: Events,
	) {
	}
	//页面销毁
    ionViewWillUnload(){
		this.events.unsubscribe('pd-nextPage');
	}
	ionViewDidLoad() {
		this.events.subscribe('pd-nextPage',()=>{
			this.navCtrl.push(WithdrawPage)
		})
	}
	
}
