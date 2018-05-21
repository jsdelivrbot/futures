import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/forms';
import { myService } from "../../myService";
import { GlobalData } from "../../../../providers/GlobalData";
@Component({
	selector: 'page-si-identify',
	templateUrl: 'si-identify.html',
})
export class SiIdentifyPage {

	passwordForm: any;
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private formBuilder: FormBuilder,
		private myservice: myService,
		private globaldata: GlobalData,
		private alertCtrl: AlertController
		
	) {
		this.passwordForm = this.formBuilder.group({
			name: ['', [Validators.required,Validators.pattern("^[\u4e00-\u9fa5]{2,4}$")]],// 第一个参数是默认值, Validators.minLength(4)
			verify: ['', [Validators.required,Validators.pattern(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)]],
    	});
	}

	ionViewDidLoad() {
	}
	//实名认证
	nameVerify(val){
		this.myservice.nameVerify(this.globaldata.userId,val)
			.subscribe(res => {
				if(res.success=="true"){
					if(res.data){
						this.globaldata.authState=true;
						this.alertCtrl.create({
							title: '认证成功',
							subTitle: '',
							buttons: [ {
								text: '确定',
								role: 'cancel',
								handler: () => {
									  this.navCtrl.pop();
								}
							  }]
						  }).present();
					}else{
						this.alertCtrl.create({
							title: '认证失败',
							subTitle: '',
							buttons: [ {
								text: '确定',
								role: 'cancel',
								handler: () => {
								}
							  }]
						  }).present();
					}
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
