import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { HomeService } from '../homeService';
@Component({
	selector: 'page-novice-detail',
	templateUrl: 'novice-detail.html',
})
export class NoviceDetailPage {
    //屏幕分辨比
	private dpr:string=sessionStorage.dpr;
	private title:string;
	private id:number;
	private data:any=[];
	private type:string;
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private alertCtrl: AlertController,
		private homeService: HomeService,
	) {
		this.id=this.navParams.get('id');
		this.title=this.navParams.get('title');
		this.type=this.navParams.get('type');
	}
	//todo:将静态页面与动态获取划分好
	ionViewDidLoad() {
		if(this.type=='Novice'){
			this.homeService.getIdText(this.id)
			.subscribe(res => {
				console.log('res111',res)
				if(res.success=='true'){
					this.data=res.data;
					let temp:any=document.getElementById('_html');
					temp.innerHTML=res.data.html;
				}else{
					this.alertCtrl.create({
						title: res.errorMsg,
						subTitle: '',
						buttons: [{text: '确定'}]
						}).present();
				}
			})
		}else{
			this.homeService.getText(this.id)
			.subscribe(res => {
				console.log('res111',res)
				if(res.success=='true'){
					this.data=res.data
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
	
}
