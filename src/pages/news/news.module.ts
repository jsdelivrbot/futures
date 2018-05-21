import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import { NewsPage } from './news';
import { NewsCrudeComponent } from './news-crude/news-crude';
import { NewsGoldComponent } from './news-gold/news-gold';
import { NewsInfoComponent } from './news-info/news-info';
import { NewsNoticeComponent } from './news-notice/news-notice';
import { NewsDetailPage } from './news-detail/news-detail';
import { ThumbnailComponent } from '../../component/thumbnail/thumbnail';
import { newsService } from "./newsService";
import { SocketService } from '../../providers/SocketService';
@NgModule({
    imports: [IonicModule],
    declarations: [NewsPage,NewsCrudeComponent,NewsGoldComponent,NewsInfoComponent,NewsNoticeComponent,ThumbnailComponent,NewsDetailPage],
    entryComponents: [NewsPage,NewsCrudeComponent,NewsGoldComponent,NewsInfoComponent,NewsNoticeComponent,ThumbnailComponent,NewsDetailPage],
    providers: [newsService,SocketService],
    exports: [IonicModule]
})
export class NewsModule {}
