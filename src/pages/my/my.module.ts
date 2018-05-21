import { NgModule } from '@angular/core';
import {IonicModule} from 'ionic-angular';
import { MyPage } from './my';
import { MoneyDetailModule } from './money-detail/money-detail.module';
import { SelfInfoModule } from './self-info/self-info.module';
import { RechargePage } from './recharge/recharge';
import { WithdrawPage } from './withdraw/withdraw';
import { RiskWarnPage } from './risk-warn/risk-warn';
import { CouponPage } from './coupon/coupon';
import { UseRulesPage } from './coupon//use-rules/use-rules';
import { PromotionPage } from './promotion/promotion';
import { OrderPage } from '../trade/order/order';
import { MyUsersComponent } from './promotion/my-users/my-users';
import { PromoteDetailsComponent } from './promotion/promote-details/promote-details';
import { myService } from "./myService";
import { IonicImageViewerModule } from 'ionic-img-viewer';
import {cardHide} from"../../pipes/cardHide";
import {OnlineRechargePage} from './online-recharge/online-recharge';
import {BankPage} from './online-recharge/bank/bank';
import {ZhiFuBaoPage} from './online-recharge/zhifubao/zhifubao';
import {OrDetailPage} from './online-recharge/or-detail/or-detail';
import {OrRecordPage} from './online-recharge/or-record/or-record';
import {OrInRecordPage} from './online-recharge/or-inRecord/or-inRecord';
@NgModule({
    imports: [IonicModule,MoneyDetailModule,SelfInfoModule,IonicImageViewerModule],
    declarations: [MyPage,RechargePage,OrInRecordPage,OrRecordPage,OrDetailPage,ZhiFuBaoPage,BankPage,OnlineRechargePage,WithdrawPage,RiskWarnPage,cardHide,CouponPage,UseRulesPage,PromotionPage,MyUsersComponent,PromoteDetailsComponent],
    entryComponents: [MyPage,RechargePage,OrInRecordPage,OrRecordPage,OrDetailPage,ZhiFuBaoPage,BankPage,OnlineRechargePage,WithdrawPage,RiskWarnPage,CouponPage,UseRulesPage,PromotionPage,MyUsersComponent,PromoteDetailsComponent,OrderPage],
    providers: [myService],
    exports: [IonicModule]
})
export class MyModule {
}
