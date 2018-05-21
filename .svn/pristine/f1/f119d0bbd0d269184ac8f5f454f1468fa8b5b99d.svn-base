import { Injectable } from '@angular/core';
import { $WebSocket,WebSocketSendMode } from 'angular2-websocket/angular2-websocket';
import {Events,AlertController} from "ionic-angular";
import { load } from "protobufjs";
import {Subject} from 'rxjs';
@Injectable()
export class SocketService {
    public _socket;
    public _tradeSocket;
    
    private OrderInfo:any;
	private SocketRequest:any;
	private SocketRespone:any;
	private OMSMessage:any;
    private Reply:any;
    private socketDec1:any;//反序列化后的数据
	private socketDec2:any;//反序列化后的数据
	private socketDec3:any;//反序列化后的数据
    private socketDecDate:any;//反序列化后的数据
    constructor(
        private events:Events,
        private alertCtrl: AlertController
    ){
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
    }
  
    get socket(){
        return this._socket;
    }
    set socket(url) {
        this._socket = new $WebSocket(url,null,JSON.parse('{"reconnectIfNotNormalClose": "true"}'));
        this._socket.setSend4Mode(WebSocketSendMode.Direct);
        this._socket.onMessage(
			(msg: MessageEvent)=> {
                this.events.publish('quotesSocketData:home',msg);
                this.events.publish('quotesSocketData:trade',msg);
                this.events.publish('quotesSocketData:product',msg);
                this.events.publish('quotesSocketData:positons',msg);
                this.events.publish('quotesSocketData:delegation',msg);
                this.events.publish('quotesSocketData:tradeSimulate',msg);
            }
        )
    }
    get tradeSocket(){
        return this._tradeSocket;
    }
    set tradeSocket(url) {
        this._tradeSocket = new $WebSocket(url,null,JSON.parse('{"reconnectIfNotNormalClose": "true"}'),'arraybuffer');
        this._tradeSocket.onMessage(
			(msg: MessageEvent)=> {
                this.events.publish('tradeSocketData:purchase',msg)
                this.events.publish('tradeSocketData:positions',msg)
                this.events.publish('tradeSocketData:delegation',msg)
                let responeDataView1 = new Uint8Array(msg.data);
                this.socketDec1 = this.SocketRespone.decode(responeDataView1);
                switch(this.socketDec1.Type){
                    case 0://报单即时消息
                        this.events.publish('getHoldList');
                        // this.socketDec2 = this.Reply.decode(this.socketDec1.Data);
                        // switch(this.socketDec2.Code){
                        //     case 0:
                        //         this.alertCtrl.create({
                        //             title: '已报单',
                        //             subTitle: '',
                        //             buttons: [{text: '确定'}]
                        //         }).present();
                        //         break;
                        //     default:
                        //         console.log('进入错误'+this.socketDec2.Message)
                        //         this.alertCtrl.create({
                        //             title: this.socketDec2.Message,
                        //             subTitle: '',
                        //             buttons: [{text: '确定'}]
                        //         }).present();
                        //         break;
                        // }
                        break;
                    case 4://成交消息
                        this.events.publish('getHoldList');
                        // this.socketDec3 = this.OMSMessage.decode(this.socketDec1.Data);
                        // console.log('成交码',this.socketDec3.orderstatus)
                        // switch(this.socketDec3.orderstatus){
                        //     case '5'://废单
                        //         this.alertCtrl.create({
                        //             title:'操作失败',
                        //             subTitle: this.socketDec3.remarks,
                        //             buttons: [{text: '确定'}]
                        //         }).present();
                        //         break;
                        //     case '9'://废单
                        //         this.alertCtrl.create({
                        //             title:'操作失败',
                        //             subTitle: this.socketDec3.remarks,
                        //             buttons: [{text: '确定'}]
                        //         }).present();
                        //         break;
                        //     case '7'://成交
                        //         this.alertCtrl.create({
                        //             title:'操作成功',
                        //             subTitle: this.socketDec3.remarks,
                        //             buttons: [{text: '确定'}]
                        //         }).present();
                        //         break;
                        // }
                        break;
                }
            }
        )
        // this._tradeSocket.setSend4Mode(WebSocketSendMode.Direct);
    }
    // if(!this.socket){
    //     this.socket = new $WebSocket(SOCKET_SERVE_URL,null,JSON.parse('{"reconnectIfNotNormalClose": "true"}'));
    // }

   
}