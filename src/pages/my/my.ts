import { App } from 'ionic-angular';  
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events,ModalController,AlertController} from 'ionic-angular';
import { MoneyDetailPage } from './money-detail/money-detail';
import { SelfInfoPage } from './self-info/self-info';
import { LoginPage } from '../login/login';
import { RechargePage } from './recharge/recharge';
import { WithdrawPage } from './withdraw/withdraw';
import { RiskWarnPage } from './risk-warn/risk-warn';
import { OrderPage } from '../trade/order/order';
import { CouponPage } from './coupon/coupon';
import { PromotionPage } from './promotion/promotion';
import { Storage } from '@ionic/storage';
import { myService } from "./myService";
import { GlobalData } from "../../providers/GlobalData";
import { SocketService } from '../../providers/SocketService';
import { SiIdentifyPage } from './self-info/si-identify/si-identify';
/**
 * Generated class for the MyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
	selector: 'page-my',
	templateUrl: 'my.html',
})
export class MyPage {
	//屏幕分辨比
	private dpr:string=sessionStorage.dpr;
	private nightState:boolean=false;
	constructor(
		private navCtrl: NavController,
		private navParams: NavParams,
		private storage: Storage,
		private myservice: myService,
		private globalData: GlobalData,
		private events: Events,
		private app: App,
		private alertCtrl: AlertController,
		private ws:SocketService,
		private modalCtrl: ModalController) {
			
		//订阅登录事件
		events.subscribe('user:login', (val)=>{
			if(val){
				this.globalData.showLoading=false;
				//获取账户信息
				this.myservice.getUserInfo(val.userId)
					.subscribe(res => {
						if(res.success=="true"){
							this.globalData.userId=res.data.id;
							this.globalData.nickname =res.data.nickname ;
							this.globalData.funds =res.data.funds ;
							this.globalData.portrait =res.data.portrait;
							this.globalData.authState =res.data.authState ;
							this.globalData.account =res.data.telphone ;
							this.globalData.isMentionPassword =res.data.isMentionPassword ;
							this.globalData.isBankCard  =res.data.isBankCard ;
							this.globalData.childAccountNo=res.data.childAccountNo;
							this.globalData.cardCount=res.data.cardCount;
							this.globalData.simuAccountNo =res.data.simuAccountNo;
							this.globalData.tempAccountNo =res.data.childAccountNo;
							this.globalData.realName =res.data.realName;
						}else{
							this.alertCtrl.create({
								title: res.errorMsg,
								subTitle: '',
								buttons: [{text: '确定'}]
							  }).present();
						}
					})
			}
		});	
		// this.navCtrl.push(SelfInfoPage);
		// setTimeout(()=>{
		// 	modal.dismiss();
		// },3000)
	}
	//设置夜间模式
	setDayState(){
		if(!this.nightState){//夜间模式转换为白天模式
			let tempHref:any=document.getElementById('theme');
			tempHref.href = "assets/skin/theme-sun.css"; 
			this.events.publish('changeStatus','#DF3F43');//更改statusbar
		}else{
			let tempHref:any=document.getElementById('theme');
			tempHref.href = "assets/skin/theme-dark.css"; 
			this.events.publish('changeStatus','#1F2029');//更改statusbar
		}
	}
	//进入下一页
	goNextPage(val){
		if(!this.globalData.childAccountNo){
			this.alertCtrl.create({
				title: '请先登录',
				buttons: [
				  {
					text: '取消',
					role: 'cancel',
					handler: () => {
					}
				  },
				  {
					text: '登录',
					handler: () => {
						this.modalCtrl.create(LoginPage).present();
					}
				  }
				]
			  }).present();
			return;
		}
		switch(val){
			case 'moneydetail':
				this.navCtrl.push(MoneyDetailPage);  
				break;
			case 'recharge':
				if(!this.globalData.authState){
					this.alertCtrl.create({
						title: '请先实名认证',
						buttons: [
						{
							text: '取消',
							role: 'cancel',
							handler: () => {
							}
						},
						{
							text: '认证',
							handler: () => {
								this.navCtrl.push(SiIdentifyPage);  
							}
						}
						]
					}).present();
					return;
				}
				this.navCtrl.push(RechargePage);  
				break;
			case 'withdraw':
				if(!this.globalData.authState){
					this.alertCtrl.create({
						title: '请先实名认证',
						buttons: [
						{
							text: '取消',
							role: 'cancel',
							handler: () => {
							}
						},
						{
							text: '认证',
							handler: () => {
								this.navCtrl.push(SiIdentifyPage);  
							}
						}
						]
					}).present();
					return;
				}
				this.navCtrl.push(WithdrawPage);  
				break;
			case 'selfinfo':
				this.navCtrl.push(SelfInfoPage);  
				break;
			case 'riskwarn':
				this.navCtrl.push(RiskWarnPage);  
				break;
			case 'coupon':
				this.navCtrl.push(CouponPage);  
				break;
			case 'promotion':
				this.navCtrl.push(PromotionPage);  
				break;
			case 'order':
				this.navCtrl.push(OrderPage);  
				break;
		}
		
	}
	ionViewWillEnter() {
		//发布登录事件
		this.events.publish('user:login',this.globalData);
	}
	//登出
	logout(){
		this.alertCtrl.create({
			title: '确定退出？',
			subTitle: '',
			buttons: [ 
				{
					text: '取消',
					role: 'cancel',
					handler: () => {
					}
				},
				{
					text: '确定',
					handler: () => {
						this.events.publish('user:logout');
						this.globalData.userId=null;
						this.globalData.childAccountNo=null;
						this.globalData.nickname =null;
						this.globalData.funds =null;
						this.globalData.portrait =null;
						this.globalData.authState =null;
						this.globalData.account =null;
						this.globalData.isMentionPassword =null;
						this.globalData.isBankCard =null;
						this.globalData.cardCount=0;
						this.globalData.simuAccountNo =null;
						this.globalData.tempAccountNo =null;
						// localStorage.removeItem('userInfo')
						this.storage.set('userInfo',null);
						this.ws.tradeSocket.close(true,false);
						this.alertCtrl.create({
							title: '退出成功',
							subTitle: '',
							buttons: [ {
								text: '确定',
								role: 'cancel',
								handler: () => {
									this.events.publish('user:logout');
								}
							  }]
						  }).present();
					}

				}
			]
		  }).present();
	}
}
