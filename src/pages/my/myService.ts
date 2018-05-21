import {Injectable} from '@angular/core';
import {Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {HttpService} from "../../providers/HttpService";
import { APP_SERVE_URL } from "../../assets/config/config";
import {GlobalData} from "../../providers/GlobalData";
@Injectable()
export class myService {
  constructor(public httpService: HttpService,private globalData:GlobalData) {
  }
	//获取用户信息
    getUserInfo(userId){
		return this.httpService.get(APP_SERVE_URL+'ChildAccounts?accountNo='+this.globalData.childAccountNo).map((res: Response) =>  res.json());
    }
	//实名认证 
	nameVerify(userId,val){
		return this.httpService.patch(APP_SERVE_URL+'ChildAccounts/RealNameAuthentication?accountNo='+this.globalData.childAccountNo,{
			realName :val.name,
			identityCard :val.verify
		}).map((res: Response) =>  res.json());
	}
	//修改手机号
	modifyPhone(userId,val){
		return this.httpService.patch(APP_SERVE_URL+'ChildAccounts/PhoneMob?accountNo='+this.globalData.childAccountNo,{
			phoneMob :val.account,
			verifyCode :val.verify
		}).map((res: Response) =>  res.json());
	}
	//修改登录密码
	modifyLoginPassword(userId,val){
		return this.httpService.patch(APP_SERVE_URL+'ChildAccounts/Password?accountNo='+this.globalData.childAccountNo,{
			oldPassword :val.oldpassword,
			newPassword :val.newpassword,
			confirmPassword :val.confirmpassword
		}).map((res: Response) =>  res.json());
	}
	//设置提现密码
	setDrawPassword(userId,val){
		return this.httpService.post(APP_SERVE_URL+'ChildAccounts/MentionPassword?accountNo='+this.globalData.childAccountNo,{
			password :val.drawpassword,
			confirmPassword :val.confirmpassword
		}).map((res: Response) =>  res.json());
	}
	//修改提现密码
	modifyDrawPassword(userinfo,val){
		return this.httpService.patch(APP_SERVE_URL+'ChildAccounts/MentionPassword?accountNo='+this.globalData.childAccountNo,{
			phoneMob:userinfo.account,
			newPassword :val.password,
			verifyCode :val.verify
		}).map((res: Response) =>  res.json());
	}
	//获取优惠券
	getCoupon(userId){
		return this.httpService.get(APP_SERVE_URL+'ChildAccounts/Coupon?accountNo='+this.globalData.childAccountNo).map((res: Response) =>  res.json());
	}
	
	//提现
	withDraw(amount,bankCardId,mentionPassword){
		return this.httpService.post(APP_SERVE_URL+'WithdrawRecords',{
			amount:amount,
			bankCardId:bankCardId,
			mentionPassword:mentionPassword
		}).map((res: Response) =>  res.json());
	}
	//获取全部资金明细
	getAllDetail(userId,pageIndex,pageSize,classId){
		return this.httpService.get(APP_SERVE_URL+'CapitalFlows?accountNo='+this.globalData.childAccountNo+'&pageIndex='+pageIndex+'&pageSize='+pageSize+'&classId='+classId).map((res: Response) =>  res.json());
	}
	//获取银行卡
	getBankCard(userId){
		return this.httpService.get(APP_SERVE_URL+'ChildAccounts/BankCard?accountNo='+this.globalData.childAccountNo).map((res: Response) =>  res.json());
	}
	//解绑银行卡
	delBankCard(userId,id){
		return this.httpService.patch(APP_SERVE_URL+'AccountBankCards',{
			id:id,
			accountNo:this.globalData.childAccountNo
		}).map((res: Response) =>  res.json());
	}
	//添加银行卡
	addBankCard(accountNo ,bank,branch ,province ,city ,bankCardNumber ,realName ,identityCard ){
		return this.httpService.post(APP_SERVE_URL+'AccountBankCards',{
			accountNo:this.globalData.childAccountNo ,
			bank:bank,
			branch:branch ,
			province:province ,
			city:city ,
			bankCardNumber:bankCardNumber ,
			realName :realName,
			identityCard:identityCard
		}).map((res: Response) =>  res.json());
	}
	//获取省市区联动数据
	getCityData(){
		return this.httpService.get('assets/data/cityData.json').map((res: Response) =>  res.json());
	}
	//获取推广详情数据
	getPromoteData(userId){
		return this.httpService.get(APP_SERVE_URL+'ChildAccounts/Promotion?accountNo='+this.globalData.childAccountNo).map((res: Response) =>  res.json());
	}
	//获取我的下线列表
	getMyUser(userId){
		return this.httpService.get(APP_SERVE_URL+'ChildAccounts/PromotionAccount?accountNo='+this.globalData.childAccountNo).map((res: Response) =>  res.json());
	}
	getLevelDetail(){
		return this.httpService.get(APP_SERVE_URL+'PromotionLevels').map((res: Response) =>  res.json());
	}
	//充值
	recharge(userId,tradeWay,moneyType,totalFee){
		return this.httpService.post(APP_SERVE_URL+'CapitalFlows',{
			accountNo :this.globalData.childAccountNo,
			tradeType :'充值存入',
			tradeWay:tradeWay,
			moneyType:moneyType,
			totalFee:totalFee,
		}).map((res: Response) =>  res.json());
	}
	Payment(Amount,PayCode){
		return this.httpService.post(APP_SERVE_URL+'CapitalFlows/Payment?Amount='+Amount+'&PayCode='+PayCode).map((res: Response) =>  res.json());
	}
	//线下充值
	offLinePay(amount,way,realName,fundAccount){
		return this.httpService.post(APP_SERVE_URL+'OfflineRecharges',{
			amount:amount,
			way:way,
			realName:realName,
			fundAccount:fundAccount
		}).map((res: Response) =>  res.json());
	}
	//获取线下充值记录
	getPayRecord(pageIndex,pageSize){
		return this.httpService.get(APP_SERVE_URL+'OfflineRecharges?pageIndex='+pageIndex+'&pageSize='+pageSize).map((res: Response) =>  res.json());
	}
	//获取出金记录
	getInRecord(pageIndex,pageSize){
		return this.httpService.get(APP_SERVE_URL+'WithdrawRecords?pageIndex='+pageIndex+'&pageSize='+pageSize).map((res: Response) =>  res.json());
	}
	//标记订单状态
	signStatus(id){
		return this.httpService.patch(APP_SERVE_URL+'OfflineRecharges/UpdateStatus/'+id+'?status=1').map((res: Response) =>  res.json());
	}
	//获取支付宝
	getZhiFuBao(){
		return this.httpService.get(APP_SERVE_URL+'SysDatas/Alipay').map((res: Response) =>  res.json());
	}
	//获取银行卡信息
	getBank(){
		return this.httpService.get(APP_SERVE_URL+'SysDatas/BankCard').map((res: Response) =>  res.json());
	}
}
