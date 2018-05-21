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
	selector: 'page-positions',
	templateUrl: 'positions.html',
})
export class PositionsPage {
	private holdData:any=[];
	private tempIndex:number;
	private noData:boolean=false;
	private dpr=sessionStorage.dpr;
	private totalFloatPrice:number=0.00;
	private socketDec1:any;//反序列化后的数据
	private socketDec2:any;//反序列化后的数据
	private socketDec3:any;//反序列化后的数据
	private socketDecDate:any;//反序列化后的数据
	private OrderInfo:any;
	private SocketRequest:any;
	private SocketRespone:any;
	private Reply:any;
	private OMSMessage:any;
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
		// this.events.unsubscribe('quotesSocketData:positons');
		this.events.unsubscribe('closePosition');
		this.events.unsubscribe('tradeSocketData:positions');
		this.events.unsubscribe('subject:holdData');
	}
	ionViewWillLeave(){
		this.events.unsubscribe('tradeSocketData:positions');
	}
	ionViewWillEnter(){
		this.events.publish('changeTitle','持仓');
		this.events.subscribe('tradeSocketData:positions',(msg)=>{
			let responeDataView1 = new Uint8Array(msg.data);
			this.socketDec1 = this.SocketRespone.decode(responeDataView1);
			console.log('进入平仓接收',this.socketDec1.Type)
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
									}
								}]
							  })
							tempAlert.present();
							break;
						case 4://成交消息
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
		this.holdData=[];
		this.events.subscribe('subject:holdData',(val)=>{
			this.holdData=val;
			this.noData=this.holdData.length==0?true:false;
        })
		let _that=this;
		load("assets/proto/TradeSer.proto", function(err, root) {
			if (err)
			  console.log('err',err)
			// example code
			_that.OrderInfo = root.lookupType("TradeSer.OrderInfo");
			_that.SocketRequest = root.lookupType("TradeSer.SocketRequest");
			_that.SocketRespone = root.lookupType("TradeSer.SocketRespone");
			_that.Reply = root.lookupType("TradeSer.Reply");
			_that.OMSMessage = root.lookupType("TradeSer.OMSMessage");

		});
		
		this.events.subscribe('closePosition',(val)=>{
			console.log('平仓信息'+val)
			let tempWay:number=val.way;
			if(this.globalData.isSimulate){
				tempWay=0;
			} 
			
			let OrderDirection:string;
			if(val.positionFlag=="买涨"){
				OrderDirection='W';
			}else{
				OrderDirection='Y';
			}
			let tempCode:string='';
			let tempcontr:string='';
			val.contractCode.split('').forEach((value:any,index,arr)=>{
				if(!isNaN(value)){
					tempcontr+=value;
				}else{
					tempCode+=value;
				}
			})
			let InstrumentID:string;
			if(val.way==1){//ctp  需要code+合约
				InstrumentID=tempCode+tempcontr;
			}else{
				InstrumentID=tempcontr;
			}
			_that.nativeService.showLoading();
			let upDownPrice:string;
			if(val.positionFlag=='买涨'){
				upDownPrice=String(val.lowerLimitPrice);
			}else if(val.positionFlag=='买跌'){
				upDownPrice=String(val.upperLimitPrice);
			}
			let orderDate= this.OrderInfo.create({
				UnitID: this.globalData.childAccountNo,//子账号
				InstrumentID:InstrumentID,//合约代码(期货对应日期)
				OrderPriceType:'2',//报单价格条件(限价:1,市价:2,限价止损3,市价止损4)
				OrderDirection:OrderDirection,//买卖方向X卖出开仓、Y买入平仓、V买入开仓、W卖出平仓
				CombOffsetFlag:'2',//组合开平标志(开仓0，平仓1，平今2，平昨3，强平4)
				LimitPrice:val.nowPrice,//价格
				VolumeTotalOriginal:val.holdAmount,//数量
				StopLossMoney:'',//止损金额 ,比如1400，就代表该笔交易亏1400元人民币就平仓， 0代表没有设置
				StopProfitMoney:'',//止盈金额，比如2000，就代表该笔交易赚2000元人民币就平仓， 0代表没有设置
				UnitTeamID:val.assetunitId,//资产单元ID
				CombHedgeFlag:'1',//投资类型，投机:1,套保:2,套利:3
				CommodityNo:tempCode  ,//商品代码,针对易盛接口(如:CL)
				secType:'',//安全类型(IB接口,有效值查看api)
				ExchangeID:upDownPrice,//市场
				Deposit:'',//每手保证金额
				RiskPlanID:val.riskPlanId,//风控方案Id
				Fees:'',//单笔交易手续费
				TimeCondition:'DAY',//有效期类型(DAY, GTD, GTC)
				GTDDate:'',//有效期日期
				Type:String(val.type),//品种类型 1:内盘，0：外盘 
				Way:tempWay,//报单接口类型  1：ctp, 2: 易盛，3：盈透, 0:模拟 
				PositionNO:Number(val.detailId),//持仓编号，用于平仓时，如果该字段有值，则平该持仓编号对应的持仓，如果该值为""，则按照时间的先后顺序进行平仓。
				CouponID:'',//优惠券Id。
				FundPoolID:val.fundPoolId,//资金池ID
				OrderId:'',//委托ID
				channel:'',//通道
				APIType:val.way //该品种所属API通道 1：ctp, 2: 易盛，3：盈透
			});
			// 报单请求Action
			// 201  Svc_TradeOrderReq
			// 撤单操作Action
			// 202 Svc_TradeOrderActionReq
			//一次序列化
			let buf_orderDate=  this.OrderInfo.encode(orderDate).finish();
			
			let SocketRequestDate =  this.SocketRequest.create({
				Action: 201,
				Token:this.globalData.token,
				TimeStamp:new Date().getTime(),
				Data:buf_orderDate
			});
			//二次序列化
			let buf_SocketRequestDate= this.SocketRequest.encode(SocketRequestDate).finish();
			this.ws.tradeSocket.send(buf_SocketRequestDate,WebSocketSendMode.Direct,true);//发送二进制数据
			console.log('进入发送')
		})
		
	}
	//平仓
	ClosePosition(val,index){
		this.alertCtrl.create({
			title: '确定平仓?',
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
					this.events.publish('closePosition',val);
					this.tempIndex=index;
				}
			  }
			]
		  }).present();
	}
}