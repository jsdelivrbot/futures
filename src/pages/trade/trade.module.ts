import { NgModule } from '@angular/core';
import {IonicModule} from 'ionic-angular';
import { TradePage } from './trade';
import { TradeService } from './tradeService';
import { ProductPage } from './product/product';
import { PurchasePage } from './purchase/purchase';
import { CouponModalComponent } from './purchase/coupon-modal/coupon-modal';
import { OrderPage } from './order/order';
import { RechargePage } from "../my/recharge/recharge";
import { PositionsPage } from "./order/positions/positions";
import { SettlementPage } from "./order/settlement/settlement";
import { CouponPage } from "../my/coupon/coupon";
import { NoviceDetailPage } from "../home/novice-detail/novice-detail";
import { LoginPage } from '../login/login';
import { DelegationPage } from "./order/delegation/delegation";
import { SiIdentifyPage } from '../my/self-info/si-identify/si-identify';
@NgModule({
    imports: [IonicModule],
    declarations: [TradePage,ProductPage,PurchasePage,OrderPage,PositionsPage,SettlementPage,CouponModalComponent,DelegationPage],
    entryComponents: [TradePage,ProductPage,SiIdentifyPage,RechargePage,PurchasePage,OrderPage,PositionsPage,LoginPage,SettlementPage,CouponPage,DelegationPage,CouponModalComponent,NoviceDetailPage],
    providers: [TradeService],
    exports: [IonicModule]
})
export class TradeModule {}