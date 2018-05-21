import { Component,ViewChild } from '@angular/core';
import { TradePage } from '../trade/trade';
import {IonicPage,Tabs,ModalController,Events,App} from "ionic-angular";
import { NewsPage } from '../news/news';
import { MyPage } from '../my/my';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import {GlobalData} from "../../providers/GlobalData";

@Component({
    selector: 'page-Tabs',
    templateUrl: 'tabs.html'
})
export class TabsPage {
	@ViewChild('mainTabs') tabs: Tabs;
	private tab1Root:any= HomePage;
	private tab2Root:any = TradePage;
	private tab3Root:any = NewsPage;
	private tab4Root:any;
	
	constructor(
		private globalData: GlobalData,
		private app:App,
		private events: Events,
		private modalCtrl: ModalController,
		
	) {
		events.subscribe('user:logintab', (val)=>{
			this.tab4Root=MyPage;
		})
		events.subscribe('user:logout', ()=>{
			this.tab4Root='';
			this.tabs.select(0);
		})
		events.subscribe('trade', ()=>{
			this.tabs.select(1);
		})
	}
	ionViewDidLoad() {

		
	}
	tabchange(event){
		//如果未登录则弹出登录modal
		if(event.tabTitle=="我的"&&!this.globalData.childAccountNo){
			let modal=this.modalCtrl.create(LoginPage);
			modal.present();
		}
	}
}
