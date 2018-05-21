/**
 * Created by siyongkang. 2017/6/22
 */
import {Injectable} from '@angular/core';
@Injectable()
export class GlobalData {

  private _userId: string;//用户id
  private _account: string;//账户名
  private _childAccountNo : number;//子账户名
  private _simuAccountNo : number;//模拟子账户名
  private _tempAccountNo : number;//空存储子账户名

  private _nickname: string;//昵称
  private _token: string;//token
  private _portrait: string;//头像
  private _refreshToken: string;//刷新token

  private _funds: number;//账户余额
  private _cardCount: number=0;//银行卡数量
  private _authState: boolean;//实名认证状态
  private _isMentionPassword: boolean;//是否设置提现密码 
  private _isBankCard: boolean;//是否绑定银行卡

  //设置http请求是否显示loading,注意:设置为false,接下来的请求会不显示loading,请求执行完成会自动设置为true
  private _showLoading: boolean = true;
  
  //是否是模拟练习状态
  private _isSimulate: boolean = false;

  //是否是黑夜模式
  private _isNight: boolean = false;

  //app更新进度.默认为0,在app升级过程中会改变
  private _updateProgress: number = -1;
  
  private _isTradeTime:any;
  private _innerdata:any;
  private _outerdata:any;
  private _socketdata:any=[];
  private _holdData:any;
  private _holdDataAll:any;
  private _totalFloatPrice:number=0.00;
  // private _isFirstInTradePage:boolean=true;

  // get isFirstInTradePage(): boolean {
  //   return this._isFirstInTradePage;
  // }
  // set isFirstInTradePage(value: boolean) {
  //   this._isFirstInTradePage = value;
  // }
  private _showModule:boolean=true;//上架隐藏
  private _realName: string;//真实姓名

  set realName(value: string) {
    this._realName = value;
  }
  get realName(): string {
    return this._realName;
  }
  
  get showModule(): boolean {
    return this._showModule;
  }

  set showModule(value: boolean) {
    this._showModule = value;
  }

  get isTradeTime(): any {
    return this._isTradeTime;
  }
  set isTradeTime(value: any) {
    this._isTradeTime = value;
  }
  get holdData(): any {
    return this._holdData;
  }
  set holdData(value: any) {
    this._holdData = value;
  }
  get holdDataAll(): any {
    return this._holdDataAll;
  }
  set holdDataAll(value: any) {
    this._holdDataAll = value;
  }

  get innerdata(): any {
    return this._innerdata;
  }
  set innerdata(value: any) {
    this._innerdata = value;
  }
  get outerdata(): any {
    return this._outerdata;
  }
  set outerdata(value: any) {
    this._outerdata = value;
  }
  get socketdata(): any {
    return this._socketdata;
  }
  set socketdata(value: any) {
    this._socketdata = value;
  }

  get simuAccountNo(): number {
    return this._simuAccountNo;
  }
  set simuAccountNo(value: number) {
    this._simuAccountNo = value;
  }
  get totalFloatPrice(): number {
    return this._totalFloatPrice;
  }
  set totalFloatPrice(value: number) {
    this._totalFloatPrice = value;
  }


  get tempAccountNo(): number {
    return this._tempAccountNo;
  }

  set tempAccountNo(value: number) {
    this._tempAccountNo = value;
  }


  get funds(): number {
    return this._funds;
  }

  set funds(value: number) {
    this._funds = value;
  }
  get refreshToken(): string {
    return this._refreshToken;
  }
  set refreshToken(value: string) {
    this._refreshToken = value;
  }
  get childAccountNo(): number {
    return this._childAccountNo;
  }
  set childAccountNo(value: number) {
    this._childAccountNo = value;
  }
  get authState(): boolean {
    return this._authState;
  }

  set authState(value: boolean) {
    this._authState = value;
  }
  get isMentionPassword(): boolean {
    return this._isMentionPassword;
  }

  set isMentionPassword(value: boolean) {
    this._isMentionPassword = value;
  }
  get isSimulate(): boolean {
    return this._isSimulate;
  }

  set isSimulate(value: boolean) {
    this._isSimulate = value;
  }
  get isNight(): boolean {
    return this._isNight;
  }

  set isNight(value: boolean) {
    this._isNight = value;
  }
  get isBankCard(): boolean {
    return this._isBankCard;
  }

  set isBankCard(value: boolean) {
    this._isBankCard = value;
  }


  get userId(): string {
    return this._userId;
  }

  set userId(value: string) {
    this._userId = value;
  }

  get account(): string {
    return this._account;
  }

  set account(value: string) {
    this._account = value;
  }

  get nickname(): string {
    return this._nickname;
  }

  set nickname(value: string) {
    this._nickname = value;
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  get showLoading(): boolean {
    return this._showLoading;
  }

  set showLoading(value: boolean) {
    this._showLoading = value;
  }

  get cardCount(): number {
    return this._cardCount;
  }

  set cardCount(value: number) {
    this._cardCount = value;
  }

  get updateProgress(): number {
    return this._updateProgress;
  }

  set updateProgress(value: number) {
    this._updateProgress = value;
  }

  get portrait(): string {
    return this._portrait;
  }

  set portrait(value: string) {
    this._portrait = value;
  }
}