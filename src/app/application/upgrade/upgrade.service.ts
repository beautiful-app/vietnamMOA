import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {UpgradeComponent} from './upgrade.component';

@Injectable({
    providedIn: 'root'
})
export class UpgradeService {
    
    constructor(
        public dialog: MatDialog
    ) {
    }
    
    checkVersion() {
        // 通过http查询版本升级信息，并且显示加载loading
        
        
        // 显示弹窗信息
        this.openDialog();
    }
    
    openDialog() {
        const dialogRef = this.dialog.open(UpgradeComponent, {
            disableClose: true,
            // height: '300px',
            // width: '300px',
            panelClass: 'custom-dialog-container',
            data: {
                name: 'kdjfk'
            }
        });
        
        // dialogRef.afterClosed().subscribe(result => {
        //
        // });
    }
    
    checkVersion1() {
        const dialogRef = this.dialog.open(UpgradeComponent, {
            disableClose: true,
            // height: '300px',
            // width: '300px',
            panelClass: 'custom-dialog-container',
            data: {
                latestVersion: true
            }
        });
        
        dialogRef.afterClosed().subscribe(result => {
        
        });
    }
    
    checkVersion2() {
        const dialogRef = this.dialog.open(UpgradeComponent, {
            disableClose: true,
            // height: '300px',
            // width: '300px',
            panelClass: 'custom-dialog-container',
            data: {
                latestVersion: false
            }
        });
        
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            console.log(result);
        });
    }
    
}
