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
        const dialogRef = this.dialog.open(UpgradeComponent, {
            disableClose: true,
            // height: '300px',
            // width: '300px',
            panelClass: 'custom-dialog-container',
            data: {
                name: 'kdjfk'
            }
        });
        
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            console.log(result);
        });
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
            console.log('The dialog was closed');
            console.log(result);
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
