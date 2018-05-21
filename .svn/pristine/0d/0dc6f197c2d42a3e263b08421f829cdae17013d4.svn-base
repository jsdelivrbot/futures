import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController,Events} from 'ionic-angular';
import{TradeService} from'../../tradeService'
@Component({
	selector: 'page-settlement',
	templateUrl: 'settlement.html',
})
export class SettlementPage {
	private hideit:boolean=true;
	private noData:boolean=false;
	private data:any=[];
	private dpr=sessionStorage.dpr;
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private events: Events,
		private tradeService: TradeService,
		private alertCtrl: AlertController
	) {
		
	}
	ionViewDidLoad(){
		this.getdata();
	}
	ionViewDidEnter(){
		this.events.publish('changeTitle','结算');
	}
	hideShow(val){
		val.hideit=val.hideit?false:true;
	}
	getdata(){
		this.tradeService.getSettlement()
		.subscribe(res => {
			console.log('信息',res)
			if(res.success=="true"){
				if(res.data==null){
					this.noData=true
					return;
				}
				this.data=res.data;
				if(res.data.length==0)this.noData=true
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
					}).present();
			}
		})
	}
}
