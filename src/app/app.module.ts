import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/core.module';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {IonicStorageModule} from '@ionic/storage';
import {UserResolve} from './shared/service/user-resolve.service';
import {File} from '@ionic-native/file/ngx';
import {FileTransfer} from '@ionic-native/file-transfer/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {AppVersion} from '@ionic-native/app-version/ngx';


@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        CoreModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
    ],
    providers: [
        StatusBar,
        SplashScreen,
        NativeStorage,
        UserResolve,
        File,
        FileTransfer,
        FileOpener,
        AppVersion,
        // {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    ],
    bootstrap: [AppComponent],
    
})
export class AppModule {
}

