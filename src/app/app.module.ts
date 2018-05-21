import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import {IonicStorageModule} from '@ionic/storage';
import { MyApp } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TradeModule } from '../pages/trade/trade.module';
import { NewsModule } from '../pages/news/news.module';
import { MyModule } from '../pages/my/my.module';
import { HomeModule } from '../pages/home/home.module';
import { TabsModule } from '../pages/tabs/tabs.module';
import { LoginModule } from '../pages/login/login.module';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import { File } from '@ionic-native/file';
import {AppVersion} from '@ionic-native/app-version';
import {Toast} from '@ionic-native/toast';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {FileTransfer} from '@ionic-native/file-transfer';
import {FileOpener} from '@ionic-native/file-opener';
import {Network} from '@ionic-native/network';
import {AppMinimize} from '@ionic-native/app-minimize';
import {JPush} from "../../typings/modules/jpush/index";
import { Clipboard } from '@ionic-native/clipboard';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
// import { Alipay} from '@ionic-native/alipay';

import {Helper} from "../providers/Helper";
import {HttpModule} from "@angular/http";
import {NativeService} from "../providers/NativeService";
import {HttpService} from "../providers/HttpService";
import {GlobalData} from "../providers/GlobalData";

@NgModule({
	declarations: [MyApp],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpModule,
		IonicModule.forRoot(MyApp, 
			{
				mode:'ios',
				backButtonText: '',
				tabsHideOnSubPages:true
		}),
		IonicStorageModule.forRoot(),
		TradeModule,
		NewsModule,
		MyModule,
		HomeModule,
		TabsModule,
		LoginModule
	],
	bootstrap: [IonicApp],
	entryComponents: [MyApp],
	providers: [
		StatusBar,
        SplashScreen,
        AppVersion,
        Toast,
        InAppBrowser,
        FileTransfer,
        File,
        Network,
		AppMinimize,
		HttpService,
        JPush,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        NativeService,
        Helper,
		GlobalData,
		FileOpener,
		// Alipay,
		ScreenOrientation,
		Clipboard
	]
})
export class AppModule {}
