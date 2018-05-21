import { Component } from '@angular/core';
import { NavController, NavParams,AlertController} from 'ionic-angular';
import { HomeService } from '../homeService';
@Component({
	selector: 'page-novice-welfare',
	templateUrl: 'novice-welfare.html',
})
export class NoviceWelfarePage {
    //屏幕分辨比
	private dpr:string=sessionStorage.dpr;
	private data:any=[];
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private homeService: HomeService,
		private alertCtrl: AlertController,
		
	) {
	}

	ionViewDidLoad() {
		this.homeService.getCoupon()
		.subscribe(res => {
			if(res.success=='true'){
				this.data=res.data;
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
					}).present();
			}
		});	
	}
	
}
