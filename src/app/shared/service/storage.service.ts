import {Injectable} from '@angular/core';
import {STORAGE_KEY} from '../const/storageKey.const';
import {USER} from '../entity/user.bo';
import {Storage} from '@ionic/storage';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    
    constructor(private storage: Storage) {
    }
    
    storageUserInfo(): Observable<any> {
        return new Observable<any>(o => {
            this.storage.set(STORAGE_KEY.user_obj, USER.get()).then(() => {
                o.next();
            });
        });
    }
    
    getUser(): Observable<any> {
        return new Observable<any>(o => {
            this.storage.get(STORAGE_KEY.user_obj).then(r => {
                if(r) o.next(r);
                else o.next(false);
            });
        });
    }
    
    clearUserInfo() {
        this.storage.remove(STORAGE_KEY.user_obj);
    }
    
    
}
