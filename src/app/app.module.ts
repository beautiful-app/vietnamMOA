import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicModule} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/core.module';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {IonicStorageModule} from '@ionic/storage';
import {File} from '@ionic-native/file/ngx';
import {FileTransfer} from '@ionic-native/file-transfer/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {AppVersion} from '@ionic-native/app-version/ngx';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {Device} from '@ionic-native/device/ngx';
import {Network} from '@ionic-native/network/ngx';


@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        CoreModule,
        IonicModule.forRoot({
            mode: 'ios',
            animated: true,
            swipeBackEnabled: false,
        }),
        IonicStorageModule.forRoot(),
    ],
    providers: [
        StatusBar,
        SplashScreen,
        NativeStorage,
        InAppBrowser,
        File,
        FileTransfer,
        FileOpener,
        AppVersion,
        Device,
        Network,
        // {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    ],
    bootstrap: [AppComponent],
    
})
export class AppModule {
}

