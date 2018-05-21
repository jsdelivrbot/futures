import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController} from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/forms';
import { myService } from "../../../myService";
import { GlobalData } from "../../../../../providers/GlobalData";
@Component({
	selector: 'page-sb-addcard',
	templateUrl: 'sb-addcard.html',
})
export class SbAddcardPage {
	private bankdata;
	private place;
	private choosedbank:string='';
	private branch :string='';
	private choosedplace:string='';
	passwordForm: any;
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private formBuilder: FormBuilder,
		private myservice: myService,
		private globalData: GlobalData,
		private alertCtrl: AlertController
	) {
		this.passwordForm = this.formBuilder.group({
			banknumber:['',[Validators.required,Validators.minLength(18),Validators.maxLength(21)]],
			name: ['', [Validators.required,Validators.pattern("^[\u4e00-\u9fa5]{2,4}$")]],// 第一个参数是默认值, Validators.minLength(4)
			verify: ['', [Validators.required,Validators.pattern(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)]],
    	});
		this.bankdata = [
			{
				options: [
					{ text: '中国银行', value: '中国银行' },
					{ text: '工商银行', value: '工商银行' },
					{ text: '农业银行', value: '农业银行' },
					{ text: '建设银行', value: '建设银行' },
					{ text: '交通银行', value: '交通银行' },
					{ text: '浦发银行', value: '浦发银行' },
					{ text: '广发银行', value: '广发银行' },
					{ text: '光大银行', value: '光大银行' },
					{ text: '招商银行', value: '招商银行' },
					{ text: '平安银行', value: '平安银行' },
					{ text: '汇丰银行', value: '汇丰银行' },
					{ text: '兴业银行', value: '兴业银行' },
					{ text: '民生银行', value: '民生银行' },
					{ text: '中信银行', value: '中信银行' },
				]
			}
		];
		//空数据用于渲染
		this.place = [
			{
				options: [
					
				]
			},{
				options: [
					
				]
			},{
				options: [
					
				]
			}
		];
		myservice.getCityData()
		.subscribe(res => {
			let tempoptions=[];
			let tempoptions1=[];
			let tempoptions2=[];
			res.forEach((value,index,arr) => {
				//省数据
				tempoptions.push({
					text:value.name,
					value:value.name,
				})
				// 市数据
				value.children.forEach((value1,index1,arr1)=>{
					tempoptions1.push({
						text:value1.name,
						value:value1.name,
						parentVal:value.name
					})
					//区数据
					value1.children.forEach((value2,index2,arr2)=>{
						tempoptions2.push({
							text:value2.name,
							value:value2.name,
							parentVal:value1.name
						})
					})					
				})

			});
			
			this.place=[
				{
					options:tempoptions,
				},
				{
					options:tempoptions1
				},
				{
					options:tempoptions2
				}
			]
		})
		
	}
	ionViewDidLoad() {
	}
	//添加银行卡
	addCard(val){
		this.myservice.addBankCard(this.globalData.userId,this.choosedbank,this.branch ,this.choosedplace,this.choosedplace,val.banknumber,val.name,val.verify)
		.subscribe(res => {
			if(res.success=="true"){
				this.globalData.isBankCard=true;
				this.globalData.cardCount++;
			}
			this.alertCtrl.create({
				title: res.errorMsg||'添加成功',
				subTitle: '',
				buttons: [{text: '确定'}]
				}).present();
		})
	}
}
