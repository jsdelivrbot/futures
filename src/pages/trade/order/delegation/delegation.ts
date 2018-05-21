import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController,Events} from 'ionic-angular';
import { TradeService } from '../../tradeService';
import {GlobalData} from "../../../../providers/GlobalData";
import { load } from "protobufjs";
import { SocketService } from '../../../../providers/SocketService';
import {NativeService} from "../../../../providers/NativeService";
import { WebSocketSendMode } from 'angular2-websocket/angular2-websocket';
import { OrderPage } from '../order';
@Component({
	selector: 'page-delegation',
	templateUrl: 'delegation.html',
})
export class DelegationPage {
	private holdData:any=[];
	private tempIndex:number;
	private dpr=sessionStorage.dpr;
	private noData:boolean=false;
	private socketDec1:any;//反序列化后的数据
	private socketDec2:any;//反序列化后的数据
	private socketDec3:any;//反序列化后的数据
	private socketDecDate:any;//反序列化后的数据
	private OrderInfo:any;
	private SocketRequest:any;
	private SocketRespone:any;
	private Reply:any;
	private OMSMessage:any;
	private OrderCancelReq:any;
	private OrderAbnormalCancelReq:any;
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private alertCtrl: AlertController,
		private tradeService: TradeService,
		private globalData: GlobalData,
		private ws: SocketService, 
		private nativeService: NativeService, 
		private events: Events, 
	) {	
		
	}
	//页面销毁
    ionViewWillUnload(){
		// this.events.unsubscribe('quotesSocketData:delegation');
		this.events.unsubscribe('withdrawal');
		this.events.unsubscribe('tradeSocketData:delegation');
		// this.holdData.forEach((value,index,arr)=>{
		// 	this.ws.socket.send('{"Type":"Minute_Time","Sub":"0","FuturesCode":"'+this.holdData.contractCode+'"}');
		// })
	}
	ionViewWillLeave(){
		this.events.unsubscribe('tradeSocketData:delegation');
	}
	ionViewDidEnter(){
		this.getDelegation();
		this.events.publish('changeTitle','委托');
		this.events.subscribe('tradeSocketData:delegation',(msg)=>{
			let responeDataView1 = new Uint8Array(msg.data);
			this.socketDec1 = this.SocketRespone.decode(responeDataView1);
			console.log('进入接收',this.socketDec1.Type)
			switch(this.socketDec1.Type){
				case 0://报单即时消息
					this.nativeService.hideLoading();
					this.socketDec2 = this.Reply.decode(this.socketDec1.Data);
					switch(this.socketDec2.Code){
						case 0:
							let tempAlert=this.alertCtrl.create({
								title: '操作成功',
								subTitle: '',
								buttons: [{
									text: '确定',
									handler: () => {
										this.getDelegation();//初始化数据
									}
								}]
							  });
							  tempAlert.present();
							break;
						case 4://成交消息
							this.getDelegation();
							break;
						default:
							console.log('进入错误'+this.socketDec2.Message)
							let tempAlert1=this.alertCtrl.create({
								title: '操作失败',
								subTitle: this.socketDec2.Message,
								buttons: [{text: '确定'}]
							});
							tempAlert1.present();
							break;
					}
					break;
			}
			
		})
	}
	ionViewDidLoad(){
		
		// this.events.subscribe('quotesSocketData:delegation',(msg)=>{
		// 	let tempdata=JSON.parse(msg.data);
		// 		switch(tempdata.code){
		// 			case '01':
		// 				let tempdata1=JSON.parse(tempdata.data);
		// 				if(this.holdData.length==0)return;
		// 				this.holdData.forEach((value,index,arr)=>{
		// 					if(value.stockCode==tempdata1.instrumentId){
		// 						if(this.holdData[index].nowPrice){
		// 							if(Number(this.holdData[index].nowPrice)!=Number(tempdata1.nowPrice))
		// 								this.holdData[index].nowPrice=Number(tempdata1.nowPrice);
		// 						}else{
		// 							this.holdData[index].nowPrice=Number(tempdata1.nowPrice);
		// 						}
		// 						// this.holdData[index].upperLimitPrice=Number(tempdata1.upperLimitPrice);
		// 						// this.holdData[index].lowerLimitPrice=Number(tempdata1.lowerLimitPrice);
		// 					}
		// 				})
		// 				break;
		// 			case '00':
		// 				// if(this.holdData.length!=0){
		// 				// 	this.holdData.forEach((value,index,arr)=>{
		// 				// 		tempdata.data.tradeTimes.forEach((value1,index1,arr1)=>{
		// 				// 			if(value.stockCode+value.contract==value1.futuresCode){
		// 				// 				this.holdData[index].isTradeTime=value1.isTradeTime;
		// 				// 			}
		// 				// 		})
		// 				// 	})
		// 				// }
		// 		}
				
		// 	},
		// );
		let _that=this;
		load("assets/proto/TradeSer.proto", function(err, root) {
			if (err)
			  console.log('err',err)
			// example code
			_that.OrderCancelReq = root.lookupType("TradeSer.OrderCancelReq");
			_that.OrderAbnormalCancelReq = root.lookupType("TradeSer.OrderAbnormalCancelReq");
			_that.SocketRespone = root.lookupType("TradeSer.SocketRespone");
			_that.Reply = root.lookupType("TradeSer.Reply");
			_that.SocketRequest = root.lookupType("TradeSer.SocketRequest");
		});
		this.events.subscribe('withdrawal',(val)=>{
			
			let orderDate:any;
			let buf_orderDate:any;
			let SocketRequestDate:any;
			// if(val.orderStatus!='1'){
			orderDate= this.OrderCancelReq.create({
				iOrderNo:val.id
			});
			buf_orderDate=  this.OrderCancelReq.encode(orderDate).finish();
			SocketRequestDate =  this.SocketRequest.create({
				Action: 203,
				Token:this.globalData.token,
				TimeStamp:new Date().getTime(),
				Data:buf_orderDate
			});
			// }else{
			// 	orderDate= this.OrderAbnormalCancelReq.create({
			// 		iOrderNo:val.id
			// 	});
			// 	buf_orderDate=  this.OrderCancelReq.encode(orderDate).finish();
			// 	SocketRequestDate =  this.SocketRequest.create({
			// 		Action: 202,
			// 		Token:this.globalData.token,
			// 		TimeStamp:new Date().getTime(),
			// 		Data:buf_orderDate
			// 	});
			// }
			let buf_SocketRequestDate= this.SocketRequest.encode(SocketRequestDate).finish();
			this.ws.tradeSocket.send(buf_SocketRequestDate,WebSocketSendMode.Direct,true);//发送二进制数据
			console.log('进入发送')
		})
		
	}
	//获取为委托信息
	getDelegation(){
		this.tradeService.getDelegation(this.globalData.childAccountNo)
		.subscribe(res => {
			console.log('委托信息',res)
			if(res.success=="true"){
				if(res.data==null){
					this.noData=true
					return;
				}
				this.holdData=res.data;
				let tempArr:any=[];
				this.holdData.forEach((value,index,arr)=>{
					if(!tempArr.includes(value.contractCode)){
						tempArr.push(value.contractCode);
					}
				})
				// tempArr.forEach((value,index,arr)=>{
				// 	this.ws.socket.send('{"Type":"Minute_Time","Sub":"1","FuturesCode":"'+value+'"}');
				// })
				if(this.holdData.length!=0){
                    this.holdData.forEach((value,index,arr)=>{
						if(!this.globalData.isTradeTime)return;
                        this.globalData.isTradeTime.data.tradeTimes.forEach((value1,index1,arr1)=>{
                            if(value.stockCode ==value1.futuresCode){
                                this.holdData[index].isTradeTime=value1.isTradeTime;
                            }
                        })
					})
					this.noData=false;
				}else{
					this.noData=true;
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
	//撤单
	ClosePosition(val,index){
		this.alertCtrl.create({
			title: '确定撤单?',
			buttons: [
			  {
				text: '取消',
				role: 'cancel',
				handler: () => {
				}
			  },
			  {
				text: '确定',
				handler: () => {
					this.events.publish('withdrawal',val);
					this.tempIndex=index;
				}
			  }
			]
		  }).present();
		
	}
}