import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {UserResolve} from './shared/service/user-resolve.service';

/**
 * 在功能模块中定义子路由后，只要导入该模块，等同于在根路由中直接定义
 * 也就是说在 AppModule 中导入 HomeModule 的时候，
 * 由于 HomeModule 中导入了 HomeRouting Module
 * 在 HomeRoutingModule 中定义的路由会合并到根路由表
 * 相当于直接在根模块中定义下面的数组。
 * 需要注意的一个地方是 Angular 路由数组的**顺序**非常重要。
 * 所以此处的 `redirect` 这个条目在根路由中起到了定义各功能模块路由顺序的意义。
 *
 * ```typescript
 * const routes = [{
 *   path: 'home',
 *   component: HomeContainerComponent
 *
 * ```
 */

const routes: Routes = [
    {path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsModule)},
    {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    },
    {
        path: 'application',
        loadChildren: () => import('./application/application.module').then(m => m.ApplicationModule),
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
