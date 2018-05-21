/**
 * Created by siyongkang 2017/6/22.
 */
import {Injectable} from '@angular/core';
import {ToastController, LoadingController, Platform, Loading, AlertController} from 'ionic-angular';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AppVersion} from '@ionic-native/app-version';
// import {Camera, CameraOptions} from '@ionic-native/camera';
import {Toast} from '@ionic-native/toast';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {Network} from '@ionic-native/network';
import {FileTransfer,FileTransferObject } from '@ionic-native/file-transfer';//FileUploadOptions, 
import {APP_DOWNLOAD, APK_DOWNLOAD, REQUEST_TIMEOUT} from "../assets/config/config";//IMAGE_SIZE,  QUALITY_SIZE,
import {AppMinimize} from "@ionic-native/app-minimize";
// import {ImagePicker} from '@ionic-native/image-picker';
import {GlobalData} from "./GlobalData";
import {File} from '@ionic-native/file';
import {Utils} from "./Utils";
import {Observable} from "rxjs";
import {FileOpener} from '@ionic-native/file-opener';
// import {Position} from "../model/type";

// declare var LocationPlugin;
// declare var AMapNavigation;
// declare var cordova: any;

@Injectable()
export class NativeService {
	private loading: Loading;
	private loadingIsOpen: boolean = false;

	constructor(
		private platform: Platform,
		private toastCtrl: ToastController,
		private alertCtrl: AlertController,
		private statusBar: StatusBar,
		private splashScreen: SplashScreen,
		private appVersion: AppVersion,
		// private camera: Camera,
		private toast: Toast,
    private transfer: FileTransfer,      
		private file: File,
		private inAppBrowser: InAppBrowser,
		// private imagePicker: ImagePicker,
    private network: Network,
    private fileOpener: FileOpener,
    private globalData: GlobalData,
		private appMinimize: AppMinimize,
		private loadingCtrl: LoadingController) {
	}
	warn(info): void {
		console.log('%cNativeService/' + info, 'color:#e8c406');
	}


	  /**
	   * 通过浏览器打开url
	   */
	openUrlByBrowser(url: string): void {
		this.inAppBrowser.create(url, '_system');
	}

  /**
   * 下载安装app
   */
   downloadApp(): void {
    if (this.isIos()) {//ios打开网页下载
      this.openUrlByBrowser(APP_DOWNLOAD);
    }
    if (this.isAndroid()) {//android本地下载
      let backgroundProcess = false;//是否后台下载
      let alert = this.alertCtrl.create({//显示下载进度
        title: '下载进度：0%',
        enableBackdropDismiss: false,
        buttons: [{
          text: '后台下载', handler: () => {
            backgroundProcess = true;
          }
        }
        ]
      });
      alert.present();

      const fileTransfer: FileTransferObject = this.transfer.create();
      const apk = this.file.externalDataDirectory + 'download/android_update.apk'; //apk保存的目录
      console.log('下载地址',apk)
      //下载并安装apk
      fileTransfer.download(APK_DOWNLOAD, apk,true).then(() => {
        this.fileOpener.open(apk,'application/vnd.android.package-archive');
      }, (error) => {
        this.globalData.updateProgress =-1;
        console.log('error',error)
        alert &&alert.dismiss();
        this.alertCtrl.create({
          title: '前往网页下载',
          subTitle: '本地升级失败',
          buttons: [
            {
              text: '确定',
              handler: () => {
                this.openUrlByBrowser(APP_DOWNLOAD);//打开网页下载
              }
            }
          ]
        }).present();
      });

      let timer = null;//由于onProgress事件调用非常频繁,所以使用setTimeout用于函数节流
      fileTransfer.onProgress((event: ProgressEvent) => {
        let progress = Math.floor(event.loaded / event.total * 100);//下载进度
        this.globalData.updateProgress = progress;
        if (!backgroundProcess) {
          if (progress === 100) {
            alert && alert.dismiss();
          } else {
            if (!timer) {
              timer = setTimeout(() => {
                clearTimeout(timer);
                timer = null;
                let title = document.getElementsByClassName('alert-title')[0];
                title && (title.innerHTML = `下载进度：${progress}%`);
              }, 1000);
            }
          }
        }
      });
    }
  }

 /**
   * 是否真机环境
   */
  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  /**
   * 是否android真机环境
   */
  isAndroid(): boolean {
    return this.isMobile() && this.platform.is('android');
  }

  /**
   * 是否ios真机环境
   */
  isIos(): boolean {
    return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
  }

  alert(title: string, subTitle: string = "",): void {
    this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [{text: '确定'}]
    }).present();
  }

  /**
   * 统一调用此方法显示提示信息
   * @param message 信息内容
   * @param duration 显示时长
   */
  showToast(message: string = '操作完成', duration: number = 2000): void {
    if (this.isMobile()) {
      this.toast.show(message, String(duration), 'center').subscribe();
    } else {
      this.toastCtrl.create({
        message: message,
        duration: duration,
        position: 'middle',
        showCloseButton: false
      }).present();
    }
  };


  /**
   * 统一调用此方法显示loading
   * @param content 显示的内容
   */
	showLoading(content: string = ''): void {
    if (!this.globalData.showLoading) {
      return;
    }
    if (!this.loadingIsOpen) {
      this.loadingIsOpen = true;
      this.loading = this.loadingCtrl.create({
        content: content
      });
      this.loading.present();
      setTimeout(() => {
        this.loadingIsOpen && this.loading.dismiss();
        this.loadingIsOpen = false;
      }, REQUEST_TIMEOUT);
    }
  };

  /**
   * 关闭loading
   */
  hideLoading(): void {
    if (!this.globalData.showLoading) {
      this.globalData.showLoading = true;
    }
    this.loadingIsOpen && this.loading.dismiss();
    this.loadingIsOpen = false;
  };

  /**
   * 使用cordova-plugin-camera获取照片
   * @param options
   * @returns {Promise<string>}
   */
	// getPicture(options: CameraOptions = {}): Promise<string> {
	// 	let ops: CameraOptions = Object.assign({
	// 		sourceType: this.camera.PictureSourceType.CAMERA,//图片来源,CAMERA:拍照,PHOTOLIBRARY:相册
	// 		destinationType: this.camera.DestinationType.DATA_URL,//默认返回base64字符串,DATA_URL:base64   FILE_URI:图片路径
	// 		quality: 100,//图像质量，范围为0 - 100
	// 		allowEdit: true,//选择图片前是否允许编辑
	// 		encodingType: this.camera.EncodingType.JPEG,
	// 		targetWidth: 1000,//缩放图像的宽度（像素）
	// 		targetHeight: 1000,//缩放图像的高度（像素）
	// 		saveToPhotoAlbum: true,//是否保存到相册
	// 		correctOrientation: true//设置摄像机拍摄的图像是否为正确的方向
	// 	}, options);
	// 	return new Promise((resolve) => {
	// 	    this.camera.getPicture(ops).then((imgData: string) => {
	// 	    	resolve(imgData);
	// 	  	}, (err) => {
	// 	    	err == 20 && this.showToast('没有权限,请在设置中开启权限');
	// 	    	this.warn('getPicture:' + err)
	// 	  	});
	// 	});
	// };

  /**
   * 通过拍照获取照片
   * @param options
   * @return {Promise<string>}
   */
	// getPictureByCamera(options: CameraOptions = {}): Promise<string> {
	// 	return new Promise((resolve) => {
	//     	this.getPicture(Object.assign({
	// 		    sourceType: this.camera.PictureSourceType.CAMERA,
	// 		    destinationType: this.camera.DestinationType.DATA_URL//DATA_URL: 0 base64字符串, FILE_URI: 1图片路径
	// 	 	}, options)).then((imgData: string) => {
	// 	   		resolve(imgData);
	//   		}).catch(err => {
	// 	    	String(err).indexOf('cancel') != -1 ? this.showToast('取消拍照', 1500) : this.showToast('获取照片失败');
	//   		});
	// 	});
	// };


  /**
   * 通过图库获取照片
   * @param options
   * @return {Promise<string>}
   */
// getPictureByPhotoLibrary(options: CameraOptions = {}): Promise<string> {
// 	return new Promise((resolve) => {
// 		this.getPicture(Object.assign({
// 			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
// 			destinationType: this.camera.DestinationType.DATA_URL//DATA_URL: 0 base64字符串, FILE_URI: 1图片路径
// 		}, options)).then((imgData: string) => {
// 			resolve(imgData);
// 		}).catch(err => {
// 			String(err).indexOf('cancel') != -1 ? this.showToast('取消选择图片', 1500) : this.showToast('获取照片失败');
// 		});
// 	});
// };


  /**
   * 通过图库选择多图
   * @param options
   * @return {Promise<T>}
   */
  // getMultiplePicture(options = {}): Promise<any> {
  //   let that = this;
  //   let destinationType = options['destinationType'] || 0;//0:base64字符串,1:图片url
  //   return new Promise((resolve) => {
  //     this.imagePicker.getPictures(Object.assign({
  //       maximumImagesCount: 6,
  //       width: 1000,//缩放图像的宽度（像素）
  //       height: 1000,//缩放图像的高度（像素）
  //       quality: 100//图像质量，范围为0 - 100
  //     }, options)).then(files => {
  //       if (destinationType === 1) {
  //         resolve(files);
  //       } else {
  //         let imgBase64s = [];//base64字符串数组
  //         for (let fileUrl of files) {
  //           that.convertImgToBase64(fileUrl, base64 => {
  //             imgBase64s.push(base64);
  //             if (imgBase64s.length === files.length) {
  //               resolve(imgBase64s);
  //             }
  //           });
  //         }
  //       }
  //     }).catch(err => {
  //       this.warn('getMultiplePicture:' + err);
  //       this.showToast('获取照片失败');
  //     });
  //   });
  // };

  /**
   * 根据图片绝对路径转化为base64字符串
   * @param url 绝对路径
   * @param callback 回调函数
   */
  // convertImgToBase64(url: string, callback) {
  //   this.getFileContentAsBase64(url, function (base64Image) {
  //     callback.call(this, base64Image.substring(base64Image.indexOf(';base64,') + 8));
  //   })
  // }

  // private getFileContentAsBase64(path: string, callback) {
  //   function fail(err) {
  //     console.log('Cannot found requested file' + err);
  //   }

  //   function gotFile(fileEntry) {
  //     fileEntry.file(function (file) {
  //       let reader = new FileReader();
  //       reader.onloadend = function (e) {
  //         let content = this.result;
  //         callback(content);
  //       };
  //       reader.readAsDataURL(file);
  //     });
  //   }

  //   this.file.resolveLocalFilesystemUrl(path).then(fileEnter => gotFile(fileEnter)).catch(err => fail(err));
  //   // window['resolveLocalFileSystemURL'](path, gotFile, fail);
  // }

  /**
   * 获取网络类型 如`unknown`, `ethernet`, `wifi`, `2g`, `3g`, `4g`, `cellular`, `none`
   */
  getNetworkType(): string {
    if (!this.isMobile()) {
      return 'wifi';
    }
    return this.network.type;
  }

  /**
   * 判断是否有网络
   * @returns {boolean}
   */
  isConnecting(): boolean {
    return this.getNetworkType() != 'none';
  }

  /**
   * 获得app版本号,如0.01
   * @description  对应/config.xml中version的值
   */
  getVersionNumber(): Observable<string> {
    return Observable.create(observer => {
      this.appVersion.getVersionNumber().then((value: string) => {
        observer.next(value);
      }).catch(err => {
        console.log(err, '获得app版本号失败');
      });
    });
  }

  /**
   * 获得app name,如现场作业
   * @description  对应/config.xml中name的值
   */
  getAppName(): Observable<string> {
    return Observable.create(observer => {
      this.appVersion.getAppName().then((value: string) => {
        observer.next(value);
      }).catch(err => {
        console.log(err, '获得app name失败');
      });
    });
  }

  /**
   * 获得app包名/id,如com.kit.ionic2tabs
   * @description  对应/config.xml中id的值
   */
  getPackageName(): Observable<string> {
    return Observable.create(observer => {
      this.appVersion.getPackageName().then((value: string) => {
        observer.next(value);
      }).catch(err => {
        console.log(err, '获得app包名失败');
      });
    });
  }

  /**
   * 使用默认状态栏
   */
  statusBarStyleDefault(val) {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString(val);
  }

  /**
   * 隐藏启动页面
   */
  splashScreenHide() {
    this.splashScreen.hide();
  }

  /**
   * 调用最小化app插件
   */
  minimize() {
    this.appMinimize.minimize()
  }

  /**
   * 获得用户当前坐标
   * @return {Promise<Position>}
   */
  // getUserLocation(): Promise<Position> {
  //   return new Promise((resolve) => {
  //     if (this.isMobile()) {
  //       LocationPlugin.getLocation(data => {
  //         resolve({'lng': data.longitude, 'lat': data.latitude});
  //       }, msg => {
  //         alert(msg.indexOf('缺少定位权限') == -1 ? ('错误消息：' + msg) : '缺少定位权限，请在手机设置中开启');
  //         this.warn('getUserLocation:' + msg);
  //       });
  //     } else {
  //       this.warn('getUserLocation:非手机环境,即测试环境返回固定坐标');
  //       resolve({'lng': 113.350912, 'lat': 23.119495});
  //     }
  //   });
  // }

  /**
   * 地图导航
   * @param startPoint 开始坐标
   * @param endPoint 结束坐标
   * @param type 0实时导航,1模拟导航,默认为模拟导航
   * @return {Promise<string>}
   */
  // navigation(startPoint: Position, endPoint: Position, type = 1): Promise<string> {
  //   return new Promise((resolve) => {
  //     if (this.platform.is('mobile') && !this.platform.is('mobileweb')) {
  //       AMapNavigation.navigation({
  //         lng: startPoint.lng,
  //         lat: startPoint.lat
  //       }, {
  //         lng: endPoint.lng,
  //         lat: endPoint.lat
  //       }, type, function (message) {
  //         resolve(message);
  //       }, function (err) {
  //         alert('导航失败:' + err);
  //         this.warn('navigation:' + err);
  //       });
  //     } else {
  //       this.showToast('非手机环境不能导航');
  //     }
  //   });
  // }
}