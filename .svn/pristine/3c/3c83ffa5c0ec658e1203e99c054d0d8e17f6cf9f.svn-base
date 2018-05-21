import { Component ,ViewChild} from '@angular/core';
import { NavController, NavParams ,AlertController,Tabs,Events } from 'ionic-angular';
import { RechargePage } from "../../my/recharge/recharge";
import { PositionsPage } from "../order/positions/positions";
import { SettlementPage } from "../order/settlement/settlement";
import { DelegationPage } from "../order/delegation/delegation";
@Component({
	selector: 'page-order',
	templateUrl: 'order.html',
})
export class OrderPage {
	private title='持仓';
	@ViewChild('subTabs') tabs: Tabs;
	private recharge:any=RechargePage;
	private tab1Root:any= PositionsPage;
	private tab2Root:any = DelegationPage;
	private tab3Root:any = SettlementPage;
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private events: Events,
		private alertCtrl: AlertController
	) {
	}
	ionViewWillEnter(){
		this.events.publish('getHoldList');
	}
	ionViewDidLoad(){
		this.events.subscribe('changeTitle',(val)=>{
			this.title=val;
		})
	}
	
}