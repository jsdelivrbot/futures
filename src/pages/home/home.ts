import { App } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ModalController,Events } from 'ionic-angular';
import { HomeService } from './homeService';
import { PromotionPage } from '../my/promotion/promotion';
import { NoviceWelfarePage } from './novice-welfare/novice-welfare';
import { NoviceSchoolPage } from './novice-school/novice-school';
import { CustomerServicePage } from './customer-service/customer-service';
import { IMAGE_IP } from '../../assets/config/config';
import { ProductPage } from '../trade/product/product';
import { SocketService } from '../../providers/SocketService';
import { GlobalData } from "../../providers/GlobalData";
import { LoginPage } from '../login/login';
import { TradePage } from '../trade/trade';
import {NativeService} from "../../providers/NativeService";
import {SOCKET_SERVE_URL_Quotes} from '../../assets/config/config'
@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
})
export class HomePage {
	//屏幕分辨比
	private dpr:string=sessionStorage.dpr;
	//图片ip
	private img_ip:string=IMAGE_IP;
	//内盘数据
	private innerdata:any=[];
	//外盘数据
	private outerdata:any=[];
	//内盘数据
	private homeinnerdata:any=[];
	//外盘数据
	private homeouterdata:any=[];
	//持仓数据
	private holdData:any=[];
	//持仓总量
	private holdDataAll:any=[];
	//在线人数
	private online:number;
	//banner数据
	private bannerdata:any=[];
	private status1:boolean=false;
	private status2:boolean=false;
	private status3:boolean=false;
	private status4:boolean=false;
	private status5:boolean=false;
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private homeservice: HomeService,
		private app: App,
		private globalData: GlobalData,
		private events: Events,
		private alertCtrl: AlertController,
		private nativeService: NativeService,
		private modalCtrl: ModalController,
		private ws:SocketService
	) {
		events.subscribe('user:reLogin',()=>{//订阅刷新token失效重新登陆
			this.modalCtrl.create(LoginPage).present();
		})
		if(this.globalData.childAccountNo){
			events.publish('user:logintab');
		}
	}
	ionViewDidLoad() {
		function clearIn(inter){
			clearInterval(inter)
		}
		let inter=setInterval(()=>{
			if(!this.globalData.childAccountNo){
				if(this.status1&&this.status4&&this.status5){
					clearIn(inter)
					this.outerdata.forEach((value,index,arr)=>{
						this.ws.socket.send('{"Type":"Minute_Time","Sub":"1","FuturesCode":"'+value.futuresCode+value.contract+'"}');
					})
					this.innerdata.forEach((value,index,arr)=>{
						this.ws.socket.send('{"Type":"Minute_Time","Sub":"1","FuturesCode":"'+value.futuresCode+value.contract+'"}');
					})
					this.ws.socket.send('{"Type":"Home","Sub":"1","FuturesCode":"Home"}');
				}
			}else if(this.status1&&this.status2&&this.status3&&this.status4&&this.status5){
				clearIn(inter)
				this.outerdata.forEach((value,index,arr)=>{
					this.ws.socket.send('{"Type":"Minute_Time","Sub":"1","FuturesCode":"'+value.futuresCode+value.contract+'"}');
				})
				this.innerdata.forEach((value,index,arr)=>{
					this.ws.socket.send('{"Type":"Minute_Time","Sub":"1","FuturesCode":"'+value.futuresCode+value.contract+'"}');
				})
				this.ws.socket.send('{"Type":"Home","Sub":"1","FuturesCode":"Home"}');
			}
		},100)
		// if(this.nativeService.isMobile()){
		// 	this.homeservice.showModule()
		// 	.subscribe(res => {
		// 		if(res.success=='true'){
		// 			this.globalData.showModule=!res.data;
		// 		}})
		// }else{
		// 	this.globalData.showModule=true;
		// }
		this.ws.socket=SOCKET_SERVE_URL_Quotes+'Chat';//打开行情socket
		this.getData();
		this.getAllFutures();
		this.getBanner();
		//获取持仓列表操纵
		this.getHoldList();
		this.events.subscribe('getHoldList',()=>{
			this.globalData.showLoading=false;
			this.getHoldList();
		})
		this.events.subscribe('quotesSocketData:home',(msg)=>{
			let tempdata=JSON.parse(msg.data);
			if(tempdata.code=='01'){
				let tempdata1=JSON.parse(tempdata.data);
				this.innerdata.forEach((value,index,arr)=>{
					if(value.futuresCode+value.contract==tempdata1.instrumentId){
						if(this.innerdata[index].nowPrice){
							if(Number(this.innerdata[index].nowPrice)!=Number(tempdata1.nowPrice))
								this.innerdata[index].nowPrice=Number(tempdata1.nowPrice);
						}else{
							this.innerdata[index].nowPrice=Number(tempdata1.nowPrice);
						}
						if(this.innerdata[index].rating){
							if(this.innerdata[index].rating!=((Number(tempdata1.nowPrice)-Number(tempdata1.preClosePrice))/Number(tempdata1.preClosePrice)*100).toFixed(2)){
								this.innerdata[index].rating=((Number(tempdata1.nowPrice)-Number(tempdata1.preClosePrice))/Number(tempdata1.preClosePrice)*100).toFixed(2)
							}
						}else{
							this.innerdata[index].rating=((Number(tempdata1.nowPrice)-Number(tempdata1.preClosePrice))/Number(tempdata1.preClosePrice)*100).toFixed(2)
						}
					}
				})
				this.outerdata.forEach((value,index,arr)=>{
					if(value.futuresCode+value.contract==tempdata1.instrumentId){
						if(this.outerdata[index].nowPrice){
							if(Number(this.outerdata[index].nowPrice)!=Number(tempdata1.nowPrice))
								this.outerdata[index].nowPrice=Number(tempdata1.nowPrice);
						}else{
							this.outerdata[index].nowPrice=Number(tempdata1.nowPrice);
						}
						if(this.outerdata[index].rating){
							if(this.outerdata[index].rating!=((Number(tempdata1.nowPrice)-Number(tempdata1.preClosePrice))/Number(tempdata1.preClosePrice)*100).toFixed(4)){
								this.outerdata[index].rating=((Number(tempdata1.nowPrice)-Number(tempdata1.preClosePrice))/Number(tempdata1.preClosePrice)*100).toFixed(4)
							}
						}else{
							this.outerdata[index].rating=((Number(tempdata1.nowPrice)-Number(tempdata1.preClosePrice))/Number(tempdata1.preClosePrice)*100).toFixed(2)
						}
						
					}
				})
				let canPush=true;
				for(let i=0;i<this.globalData.socketdata.length;i++){
					if(this.globalData.socketdata[i].instrumentId==tempdata1.instrumentId){
						this.globalData.socketdata[i]=JSON.parse(JSON.stringify(tempdata1));
						canPush=false;
					}
				}
				if(canPush){
					this.globalData.socketdata.push(tempdata1)
				}
				//持仓数据
				this.holdData.forEach((value,index,arr)=>{
					if(value.contractCode==tempdata1.instrumentId){
						//最新价
						this.holdData[index].nowPrice=Number(tempdata1.nowPrice);
						//最低最高价
						this.holdData[index].upperLimitPrice=Number(tempdata1.upperLimitPrice);
						this.holdData[index].lowerLimitPrice=Number(tempdata1.lowerLimitPrice);
						//买一卖一
						if(value.positionFlag=='买涨'){
							this.holdData[index].oppoPrice=Number(tempdata1.bidPrice1);
							//浮动盈亏计算
							this.holdData[index].floatPrice=((tempdata1.nowPrice-this.holdData[index].openPrice)/this.holdData[index].minFluctuation*this.holdData[index].minFluctuationMoney)*this.holdData[index].holdAmount*this.holdData[index].buyPrice;
						}else{
							this.holdData[index].oppoPrice=Number(tempdata1.askPrice1);
							this.holdData[index].floatPrice=((this.holdData[index].openPrice-tempdata1.nowPrice)/this.holdData[index].minFluctuation*this.holdData[index].minFluctuationMoney)*this.holdData[index].holdAmount*this.holdData[index].buyPrice;
						}
					}
				})
				this.holdDataAll.forEach((value,index,arr)=>{
					value.floatPrice=0;
				})
				//持仓数据
				this.holdDataAll.forEach((value,index,arr)=>{
					this.holdData.forEach((value1,index1,arr1)=>{
						if(value.stockCode==value1.contractCode){
							value.floatPrice+=Number(value1.floatPrice);
						}
					})
				})
				let tempFloat:number=0.00;
				this.holdData.forEach((value,index,arr)=>{
					if(value.floatPrice){
						tempFloat+=Number(value.floatPrice)
					}
				})
				this.globalData.totalFloatPrice=tempFloat;
			}
			if(tempdata.code=='00'){
				if(this.online!=tempdata.data)this.online=tempdata.data.onlineCount;
				this.globalData.isTradeTime=tempdata;
				//内盘数据
				if(this.innerdata.length!=0){
					this.innerdata.forEach((value,index,arr)=>{
						tempdata.data.tradeTimes.forEach((value1,index1,arr1)=>{
							if(value.futuresCode==value1.futuresCode){
								this.innerdata[index].isTradeTime=value1.isTradeTime;
							}
						})
					})
				}
				//外盘数据
				if(this.outerdata.length!=0){
					this.outerdata.forEach((value,index,arr)=>{
						tempdata.data.tradeTimes.forEach((value1,index1,arr1)=>{
							if(value.futuresCode==value1.futuresCode){
								this.outerdata[index].isTradeTime=value1.isTradeTime;
							}
						})
					})
				}
				//持仓数据
				if(this.holdData.length!=0){
					this.holdData.forEach((value,index,arr)=>{
						tempdata.data.tradeTimes.forEach((value1,index1,arr1)=>{
							if(value.contractCode.includes(value1.futuresCode)){
								this.holdData[index].isTradeTime=value1.isTradeTime;
							}
						})
					})
				}
			}
			this.globalData.innerdata=this.innerdata;
			this.globalData.outerdata=this.outerdata;
			
			this.globalData.holdData=this.holdData;
			this.globalData.holdDataAll=this.holdDataAll;
			this.events.publish('subject:holdData',this.holdData);
			this.events.publish('subject:holdDataAll',this.holdDataAll);
			//首页数据操作
			let temp1=[];
			this.homeinnerdata.forEach((value1)=>{
				this.innerdata.forEach((value2)=>{
					if(value1.id==value2.id){
						temp1.push(value2);
					}
				})
			})
			if(temp1.length!=0)this.homeinnerdata=temp1;
			let temp2=[];
			this.homeouterdata.forEach((value1)=>{
				this.outerdata.forEach((value2)=>{
					if(value1.id==value2.id){
						temp2.push(value2);
					}
				})
			})
			if(temp2.length!=0)this.homeouterdata=temp2;
		})
	}
	//进入下一页
	goNextPage(val,params,value){
		switch(val){
			case 'promotion':
				if(this.globalData.account){
					this.navCtrl.push(PromotionPage);
				}else{
					let modal=this.modalCtrl.create(LoginPage);
					modal.present();
				}
				break;
			case 'novicewelfare':
				this.navCtrl.push(NoviceWelfarePage);  
				break;
			case 'simulation':
				this.globalData.isSimulate=true;
				this.globalData.childAccountNo=this.globalData.simuAccountNo;
				this.navCtrl.push(TradePage);  
				this.events.publish('changeStatus','#378AD6');
				break;
			case 'customerservice':
				this.navCtrl.push(CustomerServicePage);  
				break;
			case 'futures':
				this.navCtrl.push(ProductPage,{
					code:params.futuresCode,
					contract:params.contract,
					way:params.way,
					codeName:params.futuresName,
					type:value,
					isTradeTime:params.isTradeTime
				});  
				break;
			case 'noviceschoolpage':
				this.navCtrl.push(NoviceSchoolPage);  
				break;	
			case 'trade':
				this.events.publish('trade')
				break;	
		}
	}
	//获取推荐期货品种
	getData(){
		this.homeservice.getFutures()
		.subscribe(res => {
			if(res.success=='true'){
				this.status1=true;
				res.data.forEach((value,index,arr)=>{
					if(value.type==0){
						this.homeouterdata.push(value);
					}else if(value.type==1){
						this.homeinnerdata.push(value);
					}
				})
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
					}).present();
			}
		});
	}
	//获取持仓列表
	getHoldList(){
		if(!this.globalData.childAccountNo)return;
		this.homeservice.getPositions()
		.subscribe(res => {
			if(res.success=='true'){
				this.status2=true;
				if(res.data==null)return;
				this.holdData=res.data;
				if(this.holdData.length!=0){
                    this.holdData.forEach((value,index,arr)=>{
						if(!this.globalData.isTradeTime)return;
                        this.globalData.isTradeTime.data.tradeTimes.forEach((value1,index1,arr1)=>{
                            if(value.contractCode.includes(value1.futuresCode)){
                                this.holdData[index].isTradeTime=value1.isTradeTime;
                            }
                        })
					})
				}
				this.events.publish('subject:holdData',this.holdData);
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
					}).present();
			}
		});
		this.homeservice.getAllPositions()
		.subscribe(res => {
			if(res.success=='true'){
				this.status3=true;
				if(res.data==null)return;
				this.holdDataAll=res.data;
				this.holdDataAll.forEach((value,index,arr)=>{
					value.floatPrice=0;
				})
				//持仓数据
				// this.holdDataAll.forEach((value,index,arr)=>{
				// 	this.holdData.forEach((value1,index1,arr1)=>{
				// 		if(value.stockCode==value1.contractCode){
				// 			value.floatPrice+=Number(value1.floatPrice);
				// 		}
				// 	})
				// })
				this.events.publish('subject:holdDataAll',this.holdDataAll);
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
					}).present();
			}
		});
	}
	//获取所有品种
	getAllFutures(){
		this.homeservice.getAllFutures(0)
		.subscribe(res => {
			if(res.success=='true'){
				this.status4=true;
				res.data.forEach((value,index,arr)=>{
					this.outerdata.push(value);
				})
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
					}).present();
			}
		});
		this.homeservice.getAllFutures(1)
		.subscribe(res => {
			if(res.success=='true'){
				this.status5=true;
				res.data.forEach((value,index,arr)=>{
					this.innerdata.push(value);
				})
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
					}).present();
			}
		});
	}
	//获取首页轮播图
	getBanner(){
		this.homeservice.getBanner()
		.subscribe(res => {
			if(res.success=='true'){
				this.bannerdata=res.data;
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
