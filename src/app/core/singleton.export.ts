import {app} from '../../environments/app.config';


// 系统配置常量对象
export const APP = new app();

// 全局常量对象
export const GCONST = {
    // 全局loading数组，统一管理控制loading
    Loading: []
};

// user为单例形式已自动完成初始化
