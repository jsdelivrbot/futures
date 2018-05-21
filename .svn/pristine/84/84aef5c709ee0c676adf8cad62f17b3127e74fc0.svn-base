import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/forms';
import { myService } from "../../myService";
import { GlobalData } from "../../../../providers/GlobalData";
import { LoginService } from '../../../login/LoginService';
@Component({
	selector: 'page-si-phone',
	templateUrl: 'si-phone.html',
})
export class SiPhonePage {
	private verifystate:string='获取验证码';
	private submitstate:boolean=false;//获取验证码状态控制
	private timing:number=60;//计时
    //屏幕分辨比
	private dpr:string=sessionStorage.dpr;
	passwordForm: any;
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private formBuilder: FormBuilder,
		private myservice: myService,
		private globaldata: GlobalData,
		private loginservice:LoginService,
		private alertCtrl: AlertController
	) {
		this.passwordForm = this.formBuilder.group({
			account: ['', [Validators.required,Validators.pattern("^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$")]],
			verify: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(4)]],
    	});
	}

	ionViewDidLoad() {
	}
	//获取验证码
	getVerifyCode(phone){
		this.submitstate=true;
		this.loginservice.getVerifyCode(phone)
			.subscribe(res => {
				if(res.success=='true'){
					//验证码计时控制
					var inter=setInterval(()=>{
						this.timing--;
						this.verifystate='重新发送'+this.timing+'s';
						if(this.timing<=0)clearinter();
					},1000)
					var clearinter=(()=>{
						clearInterval(inter);
						this.verifystate='获取验证码';
						this.submitstate=false;
						this.timing=60;
					})
				}else{
					this.alertCtrl.create({
						title: res.errorMsg,
						subTitle: '',
						buttons: [{text: '确定'}]
					  }).present();
					this.submitstate=false;
				}
			});
	}
	//修改手机号
	modify(val){
		this.myservice.modifyPhone(this.globaldata.userId,val)
		.subscribe(res => {
			if(res.success=="true"){
				this.globaldata.authState=true;
				this.globaldata.account=val.account;
				this.alertCtrl.create({
					title: '修改成功！',
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
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
				  }).present();
			}
		})
	}
}
