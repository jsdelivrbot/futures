import {Injectable} from '@angular/core';
import {Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {HttpService} from "../../providers/HttpService";
import { APP_SERVE_URL } from "../../assets/config/config";
import {GlobalData} from "../../providers/GlobalData";
@Injectable()
export class TradeService {
    constructor(public httpService: HttpService,private globalData:GlobalData) {
    }
    
    //获取蜡烛图历史行情
    getCandle(futuresCode,endTime,days,minute,way){
        return this.httpService.get(APP_SERVE_URL+'Futureses/Market?futuresCode='+futuresCode+'&endTime='+endTime+'&days='+days+'&minute='+minute+'&way='+way).map((res: Response) =>  res.json());
    }
    //获取交易时间
	getTime(futuresCode){
		return this.httpService.get(APP_SERVE_URL+'Futureses/MarketTime?futuresCode='+futuresCode).map((res: Response) =>  res.json());
    }
    //获取下单初始化信息
    getPurchaseInfo(accountId,futuresCode){
        return this.httpService.get(APP_SERVE_URL+'Futureses/Position?accountNo='+this.globalData.childAccountNo+'&futuresCode='+futuresCode).map((res: Response) =>  res.json());
    }
    //获取持仓列表
    getPositions(accountId){
        return this.httpService.get(APP_SERVE_URL+'FuturesHolds?accountNo='+this.globalData.childAccountNo).map((res: Response) =>  res.json());
    }
    //获取委托列表
    getDelegation(accountId){
        return this.httpService.get(APP_SERVE_URL+'StockOrders?accountNo='+this.globalData.childAccountNo).map((res: Response) =>  res.json());
    }
    //获取持仓总量
    getAllPositions(){
        return this.httpService.get(APP_SERVE_URL+'StockPositions?accountNo='+this.globalData.childAccountNo).map((res: Response) =>  res.json());
    }
    //获取结算列表
    getSettlement(){
        return this.httpService.get(APP_SERVE_URL+'FuturesHolds/Settle?accountNo='+this.globalData.childAccountNo).map((res: Response) =>  res.json());
    }
}