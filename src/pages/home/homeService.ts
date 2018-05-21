import {Injectable} from '@angular/core';
import {Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {HttpService} from "../../providers/HttpService";
import { APP_SERVE_URL } from "../../assets/config/config";
import {GlobalData} from "../../providers/GlobalData";
@Injectable()
export class HomeService {
  constructor(public httpService: HttpService,public globalData:GlobalData) {
	}
	//获取推荐期货列表
	getFutures(){
		return this.httpService.get(APP_SERVE_URL+'Futureses/Recommend').map((res: Response) =>  res.json());
	}
	//获取内外盘期货列表
	getAllFutures(type){
		return this.httpService.get(APP_SERVE_URL+'Futureses?type='+type).map((res: Response) =>  res.json());
    }
	//获取轮播图
	getBanner(){
		return this.httpService.get(APP_SERVE_URL+'Banners').map((res: Response) =>  res.json());
	}
	//获取文本资源
	getText(id){
		return this.httpService.get(APP_SERVE_URL+'Raiderses?id='+id).map((res: Response) =>  res.json());
	}
	getIdText(id){
		return this.httpService.get(APP_SERVE_URL+'NoviceCourses/'+id).map((res: Response) =>  res.json());
	}
		//获取新手学堂列表
	getNoviceList(){
		return this.httpService.get(APP_SERVE_URL+'NoviceCourses').map((res: Response) =>  res.json());
	}
	getCoupon(){
		return this.httpService.get(APP_SERVE_URL+'NoviceWelfares').map((res: Response) =>  res.json());
	}
	//上架接口屏蔽
	showModule(){
		return this.httpService.get(APP_SERVE_URL+'Start/IsShield').map((res: Response) =>  res.json());
	}
	//获取持仓列表
    getPositions(){
        return this.httpService.get(APP_SERVE_URL+'FuturesHolds?accountNo='+this.globalData.childAccountNo).map((res: Response) =>  res.json());
	}
	//获取持仓总量
    getAllPositions(){
        return this.httpService.get(APP_SERVE_URL+'StockPositions?accountNo='+this.globalData.childAccountNo).map((res: Response) =>  res.json());
    }
}
