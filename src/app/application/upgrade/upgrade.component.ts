import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, ThemePalette} from '@angular/material';


@Component({
    selector: 'app-upgrade',
    templateUrl: './upgrade.component.html',
    styleUrls: ['./upgrade.component.scss'],
})
export class UpgradeComponent {
    
    canUpgrade = true;
    downloading = false;
    color: ThemePalette = 'primary';
    mode = 'indeterminate';
    value = 60;
    bufferValue = this.value + 10;
    
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<UpgradeComponent>,
    ) {
        this.canUpgrade = data.latestVersion;
        console.log('upgrade-html\'s data', data, this.canUpgrade);
    }
    
    ngOnInit() {
    
    }
    
    onNoClick() {
        console.log('dkfkj');
    }
    
    
    close() {
        this.dialogRef.close();
    }
    
    update() {
        this.downloading = true;
    }
}
