// 本应用所有导出的单例
// user特殊，本应用使用在类内部实例化的方式实现
import {app} from '../../environments/app.config';

export const APP = new app();

export const Lang = new lang();
