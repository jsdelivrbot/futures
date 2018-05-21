import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SiBankcardPage } from './si-bankcard/si-bankcard';
import { SiDrawpasswordPage } from './si-drawpassword/si-drawpassword';
import { SiIdentifyPage } from './si-identify/si-identify';
import { SiLoginpasswordPage } from './si-loginpassword/si-loginpassword';
import { SiPhonePage } from './si-phone/si-phone';
import { GlobalData } from "../../../providers/GlobalData";
@IonicPage()
@Component({
	selector: 'page-self-info',
	templateUrl: 'self-info.html',
})
export class SelfInfoPage {

	constructor(
		private navCtrl: NavController,
		private navParams: NavParams,
		private globaldata: GlobalData
		) {
	}

	ionViewDidLoad() {
	}
	gochildpage(val){
		switch(val){
			case '实名认证':
				!this.globaldata.authState&&this.navCtrl.push(SiIdentifyPage);
				break;
			case '手机号码':
				this.navCtrl.push(SiPhonePage);
				break;
			case '登录密码':
				this.navCtrl.push(SiLoginpasswordPage);
				break;
			case '提现密码':
				this.navCtrl.push(SiDrawpasswordPage);
				break;
			case '我的银行卡':
				this.navCtrl.push(SiBankcardPage);
				break;
		}
	}
}
