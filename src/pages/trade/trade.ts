import { App } from 'ionic-angular';  
import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Content,Events } from 'ionic-angular';
import { TradeService } from './tradeService';
import { ProductPage } from './product/product';
import { OrderPage } from './order/order';
import { SocketService } from '../../providers/SocketService';
import {GlobalData} from "../../providers/GlobalData";
import{SOCKET_SERVE_URL_Trade} from '../../assets/config/config';
/**
 * Generated class for the TradePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-trade',
    templateUrl: 'trade.html',
})
export class TradePage {
    @ViewChild(Content) content: Content;
    private futures:string='International';
    private orderPage:any=OrderPage;
    private innerdata:any=[];//国内期货数据
    private outerdata:any=[];//国际期货数据
    private inner_scroll:number=0;//记录滚动状态
    private outer_scroll:number=0;
    private holdData:any=[];//持仓信息
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private tradeService: TradeService,
        private app: App,
        private alertCtrl: AlertController,
        private events: Events,
        private globalData: GlobalData,
        private ws:SocketService
    ) {
        events.subscribe('subject:holdDataAll',(val)=>{
            this.holdData=val;
        })
    }
    //每次进入页面  每次进行订阅
    ionViewWillEnter(){
        if(this.globalData.childAccountNo){
            this.globalData.showLoading=false;
            // this.getPositions();//每次进入页面刷新持仓信息
            this.events.publish('getHoldList');
        }
    }
    //页面销毁
    ionViewWillUnload(){
		if(this.globalData.isSimulate){
            this.globalData.isSimulate=false;
            this.globalData.childAccountNo=this.globalData.tempAccountNo;
            this.events.unsubscribe('quotesSocketData:tradeSimulate');
            let tempHref:any=document.getElementById('theme');
            if(!this.globalData.isNight){
                tempHref.href = "assets/skin/theme-sun.css"; 
                this.events.publish('changeStatus','#DF3F43')
            }else{
                tempHref.href = "assets/skin/theme-dark.css"; 
                this.events.publish('changeStatus','#1F2029')
            }
        }
	}
    //即将离开页面
    ionViewWillLeave(){
    }
    //首次加载页面
    ionViewDidLoad() {
        if(this.globalData.isSimulate&&!this.globalData.isNight){
            let tempHref:any=document.getElementById('theme');
            tempHref.href = "assets/skin/theme-sun1.css";
        }
        this.innerdata=this.globalData.innerdata;
        this.outerdata=this.globalData.outerdata;
        this.holdData=[];
        this.holdData=this.globalData.holdDataAll;
    }
    //获取持仓信息
	// getPositions(){
    //     if(!this.globalData.childAccountNo)return;
	// 	this.tradeService.getAllPositions()
	// 	.subscribe(res => {
	// 		// console.log('持仓信息',res)
	// 		if(res.success=="true"){
    //             if(!res.data)return;
    //             this.holdData=res.data;
	// 		}else{
	// 			this.alertCtrl.create({
	// 				title: res.errorMsg,
	// 				subTitle: '',
	// 				buttons: [{text: '确定'}]
	// 				}).present();
	// 		}
	// 	})
	// }
    //选项卡切换
    segmentChanged(){
        switch(this.futures){
            case "domestic":
                // this.innerdata.length==0&&this.getdata(1);
                this.content.scrollTo(0, this.inner_scroll, 0);
                break;
            case "International":
                // this.outerdata.length==0&&this.getdata(0);
                this.content.scrollTo(0, this.outer_scroll, 0);
                break;
        }
    }
    //记录滚动值
    scrollHandler(){
        switch(this.futures){
            case "domestic":
                this.inner_scroll=this.content.scrollTop;
                break;
            case "International":
                this.outer_scroll=this.content.scrollTop;
                break;
        }
    }
    //进入product页面
    goNextPage(val,value){
        this.navCtrl.push(ProductPage,{
            code:val.futuresCode,
            contract:val.contract,
            way:val.way,
            codeName:val.futuresName,
            isTradeTime:val.isTradeTime,
            type:value,
        });  
    }
}
