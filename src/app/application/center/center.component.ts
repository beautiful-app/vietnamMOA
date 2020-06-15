import {Component, OnInit} from '@angular/core';
import {USER} from 'src/app/shared/entity/user.bo';
import {UserService} from '../../shared/service/user.service';
import {select, Store} from '@ngrx/store';
import {RouterService} from '../../shared/service/router.service';
import {TWBase} from '../../shared/TWBase.ui';
import {ROUTE} from '../../shared/const/route.enum';


@Component({
	selector: 'app-center',
	templateUrl: './center.component.html',
	styleUrls: ['./center.component.scss'],
})
export class CenterComponent extends TWBase implements OnInit {
	username: string;                 // 用户名
	department: string;               // 部门
	avatar: string;                   // 头像
	newMark: boolean = false;         // 更新显示标识
	isLogout: boolean = false;        // 退出标识
	route = ROUTE;                     // 路由对象引用赋值
	
	constructor(
		private userSV: UserService,
		private store: Store<{ user: 'user', newVersion: 'newVersion' }>,
		private routerSV: RouterService,
	) {
		super();
	}
	
	ngOnInit() {
		// 获取和显示用户信息
		this.store.pipe(select('user')).subscribe(r => {
			this.username = USER.get().username;
			this.avatar = USER.get().avatar;
			this.department = USER.get().department;
		});
		
		// 获取和显示更新标识
		this.store.pipe(select('newVersion')).subscribe(r => {
			this.newMark = Boolean(r);
		});
		
	}
	
	/**
	 * @Description: 退出登录
	 */
	loginOut() {
		if (!this.isLogout) {
			this.isLogout = true;
			setTimeout(_ => {
				this.userSV.loginOut();
				this.isLogout = false;
			}, 1000);
		}
	}
	
	/**
	 * @Description: 路由跳转方法
	 */
	navigation(route) {
		this.routerSV.to(route);
	}
}
