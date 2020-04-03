import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

export const loadSvgResources = (ir: MatIconRegistry, ds: DomSanitizer) => {
    const svgDir = '../../../assets/svg';
    ir.addSvgIcon('alien', ds.bypassSecurityTrustResourceUrl(`${svgDir}/alien.svg`));
    ir.addSvgIcon('tw_logo', ds.bypassSecurityTrustResourceUrl(`${svgDir}/tw_logo.svg`));
    
    ir.addSvgIcon('username', ds.bypassSecurityTrustResourceUrl(`${svgDir}/username.svg`));
    ir.addSvgIcon('me', ds.bypassSecurityTrustResourceUrl(`${svgDir}/me.svg`));
    ir.addSvgIcon('salary', ds.bypassSecurityTrustResourceUrl(`${svgDir}/salary.svg`));
    ir.addSvgIcon('password', ds.bypassSecurityTrustResourceUrl(`${svgDir}/password.svg`));
    ir.addSvgIcon('update-password', ds.bypassSecurityTrustResourceUrl(`${svgDir}/update-password.svg`));
    ir.addSvgIcon('about', ds.bypassSecurityTrustResourceUrl(`${svgDir}/about.svg`));
    ir.addSvgIcon('calendar', ds.bypassSecurityTrustResourceUrl(`${svgDir}/calendar.svg`));
    ir.addSvgIcon('back_arrow', ds.bypassSecurityTrustResourceUrl(`${svgDir}/back_arrow.svg`));
    ir.addSvgIcon('arrow-right', ds.bypassSecurityTrustResourceUrl(`${svgDir}/arrow-right.svg`));
    ir.addSvgIcon('clear', ds.bypassSecurityTrustResourceUrl(`${svgDir}/clear.svg`));
    ir.addSvgIcon('eye-off', ds.bypassSecurityTrustResourceUrl(`${svgDir}/eye-off.svg`));
    ir.addSvgIcon('eye-open', ds.bypassSecurityTrustResourceUrl(`${svgDir}/eye-open.svg`));
    
};


