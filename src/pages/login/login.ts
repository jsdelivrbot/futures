import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,IonicApp,Events } from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/forms';
import { RegisterPage } from './register/register';
import { FverifyPage } from './find-verify/fverify';
import { LoginService } from './LoginService';
import {AlertController} from "ionic-angular";
import {Storage} from '@ionic/storage';
import {GlobalData} from "../../providers/GlobalData";
import { SocketService } from '../../providers/SocketService';
import{SOCKET_SERVE_URL_Trade} from '../../assets/config/config';
@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {
//屏幕分辨比
	private dpr:string=sessionStorage.dpr;
	private registerpage:any=RegisterPage;//注册页面
	private fverifypage:any=FverifyPage;//登录页面
	private showPicVerify:boolean=false;//登录页面
	private imgUrl:string;
	passwordForm: any;
	constructor(
		private navCtrl: NavController,
		private formBuilder: FormBuilder,
		private ionicApp: IonicApp,
		private loginservice:LoginService,
		private storage: Storage,
		private globalData: GlobalData,
		private events: Events,
		private ws:SocketService,
		private alertCtrl: AlertController
	) {
		let preAccount=''	;
		if(localStorage.preAccount)preAccount=localStorage.preAccount;
		this.passwordForm = this.formBuilder.group({
			account: [preAccount, [Validators.required,Validators.pattern("^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$")]],// 第一个参数是默认值, Validators.minLength(4)
			password: ['', [Validators.required,Validators.pattern(/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,20}$/)]],
			verifyCode:['']
		});
	}

	ionViewDidLoad() {
		if(localStorage.preLogin=='false'){
			let temp={
				account:localStorage.preAccount
			}
			this.refreshcode(temp)
		}
	}

	//登录
	login(val){
		localStorage.preAccount=val.account;
		this.loginservice.login(val)
		.subscribe(res => {
			console.log(11111,res)
			if(res.success=='true'){
				localStorage.preLogin='true';
				//存储账户信息
				// localStorage.userInfo=JSON.stringify(
				// 	{
				// 		account:val.account,
				// 		childAccountNo:res.data.childAccountNo,
				// 		token:res.data.accessToken,
				// 		refreshToken:res.data.refreshToken,
				// 		userId:res.data.id,
				// 		nickname:res.data.nickname,
				// 		portrait:res.data.portrait
				// 	}
				// )
				this.storage.set('userInfo',{
					account:val.account,
					childAccountNo:res.data.childAccountNo,
					tempAccountNo:res.data.childAccountNo,
					token:res.data.accessToken,
					refreshToken:res.data.refreshToken,
					userId:res.data.id,
					nickname:res.data.nickname,
					portrait:res.data.portrait,
					simuAccountNo:res.data.simuAccountNo
				})
				this.globalData.account=val.account;
				this.globalData.childAccountNo=res.data.childAccountNo;
				this.globalData.tempAccountNo = res.data.childAccountNo;
				this.globalData.token=res.data.accessToken;
				this.globalData.refreshToken=res.data.refreshToken;
				this.globalData.userId=res.data.id;
				this.globalData.nickname=res.data.nickname;
				this.globalData.portrait=res.data.portrait;
				this.globalData.simuAccountNo = res.data.simuAccountNo;
				this.ws.tradeSocket=SOCKET_SERVE_URL_Trade+'Transfer?name='+this.globalData.childAccountNo+'&type=2&token='+this.globalData.token;
				this.events.publish('user:logintab');
				//发布登录事件
				this.events.publish('user:login',{
					account:val.account,
					childAccountNo:res.data.childAccountNo,
					tempAccountNo:res.data.childAccountNo,
					token:res.data.accessToken,
					userId:res.data.id,
					nickname:res.data.nickname,
					portrait:res.data.portrait,
					refreshToken:res.data.refreshToken,
					simuAccountNo:res.data.simuAccountNo
				});
				//关闭登录页面
				this.ionicApp._modalPortal.getActive().dismiss();
				// this.storage.get('userInfo').then((val) => {
				// 	console.log(val);
				//   });
			}else{
				localStorage.preLogin='false';
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
				  }).present();
				if(res.errorMsg=='账号已禁用')return;
				this.refreshcode(val);
			}
		})
	}
	//获取验证码
	refreshcode(val){
		this.loginservice.getPicVerify(val.account)
		.subscribe(res => {
			if(res.success=='true'){
				this.imgUrl='data:image/png;base64,'+res.data;
				this.showPicVerify=true;
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
				}).present();
			}
		})
	}
	//关闭登陆modal
	closelogin(){
		this.ionicApp._modalPortal.getActive().dismiss();
	}
}