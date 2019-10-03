(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/_raw-loader@3.1.0@raw-loader/dist/cjs.js!./src/app/app.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/_raw-loader@3.1.0@raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<router-outlet></router-outlet>");

/***/ }),

/***/ "./node_modules/_raw-loader@3.1.0@raw-loader/dist/cjs.js!./src/app/components/activity-modal/activity-modal.component.html":
/*!*********************************************************************************************************************************!*\
  !*** ./node_modules/_raw-loader@3.1.0@raw-loader/dist/cjs.js!./src/app/components/activity-modal/activity-modal.component.html ***!
  \*********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<nz-modal [nzVisible]=\"visible\"\r\n          [nzTitle]=\"OperateTypes[type] + '活动'\"\r\n          [nzWidth]=\"750\" [nzFooter]=\"null\"\r\n          (nzAfterOpen)=\"openActivity()\"\r\n          (nzOnCancel)=\"closeActivity()\">\r\n    <form nz-form [formGroup]=\"activityForm\"\r\n          (ngSubmit)=\"saveActivity(activityForm.value)\">\r\n        <nz-form-item>\r\n            <nz-form-label [nzSpan]=\"5\" nzRequired nzFor=\"title\">活动标题</nz-form-label>\r\n            <nz-form-control [nzSpan]=\"19\" nzErrorTip=\"请输入活动标题\">\r\n                <input id=\"title\" nz-input formControlName=\"title\"\r\n                       placeholder=\"请输入活动标题\"\r\n                       [ngStyle]=\"{width: '300px'}\"/>\r\n            </nz-form-control>\r\n        </nz-form-item>\r\n\r\n        <nz-form-item>\r\n            <nz-form-label [nzSpan]=\"5\" nzRequired nzFor=\"startTime\">开始时间</nz-form-label>\r\n            <nz-form-control [nzSpan]=\"19\" nzErrorTip=\"请输入开始时间\">\r\n                <nz-date-picker id=\"startTime\" formControlName=\"startTime\" nzShowTime\r\n                                nzFormat=\"yyyy/MM/dd hh:mm\" nzPlaceHolder=\"请输入开始时间\"\r\n                                [nzStyle]=\"{width: '300px'}\"></nz-date-picker>\r\n            </nz-form-control>\r\n        </nz-form-item>\r\n\r\n        <nz-form-item>\r\n            <nz-form-label [nzSpan]=\"5\" nzRequired nzFor=\"endTime\">结束时间</nz-form-label>\r\n            <nz-form-control [nzSpan]=\"19\" nzErrorTip=\"请输入结束时间\">\r\n                <nz-date-picker id=\"endTime\" formControlName=\"endTime\" nzShowTime\r\n                                nzFormat=\"yyyy/MM/dd hh:mm\" nzPlaceHolder=\"请输入结束时间\"\r\n                                [nzStyle]=\"{width: '300px'}\"></nz-date-picker>\r\n            </nz-form-control>\r\n        </nz-form-item>\r\n\r\n        <nz-form-item>\r\n            <nz-form-label [nzSpan]=\"5\">活动状态</nz-form-label>\r\n            <nz-form-control [nzSpan]=\"19\">\r\n                <span *ngIf=\"!!activity\" [ngStyle]=\"{color: ['gray','green','red'][activity.status]}\">\r\n                    {{ActivityStatuses[activityStatus] || \"--\"}}\r\n                </span>\r\n                <span *ngIf=\"!activity\">--</span>\r\n            </nz-form-control>\r\n        </nz-form-item>\r\n\r\n        <nz-form-item>\r\n            <nz-form-label [nzSpan]=\"5\" nzRequired>奖品列表</nz-form-label>\r\n            <nz-form-control [nzSpan]=\"19\">\r\n                <table class=\"award-table\">\r\n                    <thead>\r\n                    <tr>\r\n                        <th>奖品</th>\r\n                        <th>等级</th>\r\n                        <th>库存</th>\r\n                        <th>权重</th>\r\n                        <th>\r\n                            <span>操作</span>\r\n                            <button class=\"btn-add\" nz-button nzSize=\"small\"\r\n                                    (click)=\"addActivityAward()\">添加\r\n                            </button>\r\n                        </th>\r\n                    </tr>\r\n                    </thead>\r\n                    <tbody formArrayName=\"awards\">\r\n                    <tr *ngFor=\"let item of activityForm.get('awards')['controls']; let i = index;\"\r\n                        [formGroupName]=\"i\">\r\n                        <td>\r\n                            <nz-select formControlName=\"id\" nzSize=\"small\"\r\n                                       [ngStyle]=\"{width: '120px'}\">\r\n                                <nz-option *ngFor=\"let award of awards\"\r\n                                           [nzLabel]=\"award.name\" [nzValue]=\"award._id\"></nz-option>\r\n                            </nz-select>\r\n                        </td>\r\n                        <td>\r\n                            <nz-select formControlName=\"rank\" nzSize=\"small\"\r\n                                       [ngStyle]=\"{width: '90px'}\">\r\n                                <nz-option *ngFor=\"let awardRank of AwardRanks; index as j;\"\r\n                                           [nzLabel]=\"awardRank\" [nzValue]=\"j\"></nz-option>\r\n                            </nz-select>\r\n                        </td>\r\n                        <td>\r\n                            <nz-input-number formControlName=\"stock\"\r\n                                             nzSize=\"small\" [nzMin]=\"0\" [nzMax]=\"9999\"\r\n                                             [nzStep]=\"10\" [nzPrecision]=\"0\"\r\n                                             [ngStyle]=\"{width: '80px'}\"></nz-input-number>\r\n                        </td>\r\n                        <td>\r\n                            <nz-input-number formControlName=\"weight\"\r\n                                             nzSize=\"small\" [nzMin]=\"0\" [nzMax]=\"1\"\r\n                                             [nzStep]=\"0.01\" [nzPrecision]=\"2\"\r\n                                             [ngStyle]=\"{width: '80px'}\"></nz-input-number>\r\n                        </td>\r\n                        <td>\r\n                            <button nz-button nzType=\"danger\" nzSize=\"small\"\r\n                                    (click)=\"removeActivityAward(i)\">删除\r\n                            </button>\r\n                        </td>\r\n                    </tr>\r\n                    </tbody>\r\n                </table>\r\n            </nz-form-control>\r\n        </nz-form-item>\r\n\r\n        <nz-form-item>\r\n            <button class=\"btn-save\" nz-button nzType=\"primary\"\r\n                    [disabled]=\"!activityForm.valid\">保存\r\n            </button>\r\n        </nz-form-item>\r\n    </form>\r\n</nz-modal>\r\n");

/***/ }),

/***/ "./node_modules/_raw-loader@3.1.0@raw-loader/dist/cjs.js!./src/app/components/award-modal/award-modal.component.html":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/_raw-loader@3.1.0@raw-loader/dist/cjs.js!./src/app/components/award-modal/award-modal.component.html ***!
  \***************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<nz-modal [nzVisible]=\"visible\"\r\n          [nzTitle]=\"OperateTypes[type] + '奖品'\"\r\n          [nzWidth]=\"500\" [nzFooter]=\"null\"\r\n          (nzAfterOpen)=\"openAward()\"\r\n          (nzOnCancel)=\"closeAward()\">\r\n    <form nz-form [formGroup]=\"awardForm\"\r\n          (ngSubmit)=\"saveAward(awardForm.value)\">\r\n        <nz-form-item>\r\n            <nz-form-label [nzSpan]=\"6\" nzRequired nzFor=\"name\">奖品名称</nz-form-label>\r\n            <nz-form-control [nzSpan]=\"14\" nzErrorTip=\"请输入奖品名称\">\r\n                <input id=\"name\" nz-input formControlName=\"name\"\r\n                       placeholder=\"请输入奖品名称\"/>\r\n            </nz-form-control>\r\n        </nz-form-item>\r\n\r\n        <nz-form-item>\r\n            <nz-form-label [nzSpan]=\"6\" nzRequired nzFor=\"type\">奖品类型</nz-form-label>\r\n            <nz-form-control [nzSpan]=\"14\" nzErrorTip=\"请选择奖品类型\">\r\n                <nz-select id=\"type\" formControlName=\"type\"\r\n                           nzAllowClear nzPlaceHolder=\"请选择奖品类型\">\r\n                    <nz-option *ngFor=\"let item of AwardTypes; index as i;\"\r\n                               [nzLabel]=\"item\" [nzValue]=\"i\"></nz-option>\r\n                </nz-select>\r\n            </nz-form-control>\r\n        </nz-form-item>\r\n\r\n        <nz-form-item>\r\n            <button class=\"btn-save\" nz-button nzType=\"primary\"\r\n                    [disabled]=\"!awardForm.valid\">保存\r\n            </button>\r\n        </nz-form-item>\r\n    </form>\r\n</nz-modal>\r\n");

/***/ }),

/***/ "./node_modules/_raw-loader@3.1.0@raw-loader/dist/cjs.js!./src/app/components/layout/layout.component.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/_raw-loader@3.1.0@raw-loader/dist/cjs.js!./src/app/components/layout/layout.component.html ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<nz-layout class=\"app-layout\">\r\n    <nz-sider class=\"menu-sidebar\"\r\n              nzCollapsible nzWidth=\"256px\" nzBreakpoint=\"md\"\r\n              [(nzCollapsed)]=\"isCollapsed\" [nzTrigger]=\"null\">\r\n        <div class=\"sidebar-logo\">\r\n            <a href=\"/\">\r\n                <img src=\"https://ng.ant.design/assets/img/logo.svg\" alt=\"logo\">\r\n                <h1>HFCATV CMS</h1>\r\n            </a>\r\n        </div>\r\n        <ul nz-menu nzTheme=\"dark\" nzMode=\"inline\" [nzInlineCollapsed]=\"isCollapsed\">\r\n            <li nz-submenu nzOpen nzTitle=\"产品管理\" nzIcon=\"dashboard\">\r\n                <ul>\r\n                    <li nz-menu-item nzMatchRouter>\r\n                        <a routerLink=\"/award\">奖品管理</a>\r\n                    </li>\r\n                    <li nz-menu-item nzMatchRouter>\r\n                        <a routerLink=\"/activity\">活动管理</a>\r\n                    </li>\r\n                    <li nz-menu-item nzMatchRouter>\r\n                        <a routerLink=\"/lotto\">中奖管理</a>\r\n                    </li>\r\n                </ul>\r\n            </li>\r\n            <li nz-submenu nzOpen nzTitle=\"用户中心\" nzIcon=\"form\">\r\n                <ul>\r\n                    <li nz-menu-item nzMatchRouter>\r\n                        <a routerLink=\"/manager\">修改密码</a>\r\n                    </li>\r\n                </ul>\r\n            </li>\r\n        </ul>\r\n    </nz-sider>\r\n\r\n    <nz-layout>\r\n        <nz-header>\r\n            <div class=\"app-header\">\r\n                <span class=\"header-trigger\" (click)=\"isCollapsed = !isCollapsed\">\r\n                    <i class=\"trigger\" nz-icon [nzType]=\"isCollapsed ? 'menu-unfold' : 'menu-fold'\"></i>\r\n                </span>\r\n\r\n                <a class=\"username\" nz-dropdown [nzDropdownMenu]=\"menu\">\r\n                    {{username}}\r\n                    <i nz-icon nzType=\"down\"></i>\r\n                </a>\r\n                <nz-dropdown-menu #menu=\"nzDropdownMenu\">\r\n                    <ul nz-menu nzSelectable>\r\n                        <li nz-menu-item>\r\n                            <a href=\"javascript:void(0)\" (click)=\"logout()\">退出登录</a>\r\n                        </li>\r\n                        <li nz-menu-item>\r\n                            <a routerLink=\"/manager\">修改密码</a>\r\n                        </li>\r\n                    </ul>\r\n                </nz-dropdown-menu>\r\n            </div>\r\n        </nz-header>\r\n\r\n        <nz-content>\r\n            <div class=\"app-content\">\r\n                <ng-content></ng-content>\r\n            </div>\r\n        </nz-content>\r\n    </nz-layout>\r\n</nz-layout>\r\n");

/***/ }),

/***/ "./node_modules/_raw-loader@3.1.0@raw-loader/dist/cjs.js!./src/app/pages/activity/activity.component.html":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/_raw-loader@3.1.0@raw-loader/dist/cjs.js!./src/app/pages/activity/activity.component.html ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-layout>\r\n    <form class=\"query-form\" nz-form [formGroup]=\"queryForm\"\r\n          (ngSubmit)=\"queryActivities()\">\r\n        <div nz-row [nzGutter]=\"24\">\r\n\r\n            <div nz-col [nzSpan]=\"7\">\r\n                <nz-form-item class=\"mb0\" nzFlex>\r\n                    <nz-form-label nzFor=\"title\">活动标题</nz-form-label>\r\n                    <nz-form-control>\r\n                        <input id=\"title\" nz-input formControlName=\"title\"\r\n                               placeholder=\"请输入活动标题\"/>\r\n                    </nz-form-control>\r\n                </nz-form-item>\r\n            </div>\r\n\r\n            <div nz-col [nzSpan]=\"6\">\r\n                <nz-form-item class=\"mb0\" nzFlex>\r\n                    <nz-form-label nzFor=\"status\">活动状态</nz-form-label>\r\n                    <nz-form-control>\r\n                        <nz-select id=\"status\" formControlName=\"status\"\r\n                                   nzAllowClear nzPlaceHolder=\"请选择活动状态\">\r\n                            <nz-option *ngFor=\"let item of ActivityStatuses; index as i;\"\r\n                                       [nzLabel]=\"item\" [nzValue]=\"i\"></nz-option>\r\n                        </nz-select>\r\n                    </nz-form-control>\r\n                </nz-form-item>\r\n            </div>\r\n\r\n            <div nz-col [nzSpan]=\"4\">\r\n                <button class=\"btn-query\" nz-button nzType=\"primary\">查询</button>\r\n            </div>\r\n\r\n        </div>\r\n    </form>\r\n\r\n    <nz-table [nzData]=\"activityPageResult.docs\"\r\n              [nzFrontPagination]=\"false\"\r\n              [nzTotal]=\"activityPageResult.total\"\r\n              [nzPageIndex]=\"activityPageResult.page\"\r\n              [nzPageSize]=\"activityPageResult.limit\"\r\n              [nzPaginationPosition]=\"'both'\"\r\n              [nzLoading]=\"isLoading\"\r\n              [nzPageSizeOptions]=\"[5,10,20,30]\"\r\n              [nzShowSizeChanger]=\"true\"\r\n              (nzPageIndexChange)=\"fetchPageActivities('page', $event)\"\r\n              (nzPageSizeChange)=\"fetchPageActivities('limit', $event)\">\r\n        <thead>\r\n        <tr>\r\n            <th>活动名称</th>\r\n            <th>开始时间</th>\r\n            <th>结束时间</th>\r\n            <th>活动状态</th>\r\n            <th>奖品列表</th>\r\n            <th>\r\n                <span>操作</span>\r\n                <button class=\"btn-add\" nz-button nzSize=\"small\"\r\n                        (click)=\"addActivity()\">添加\r\n                </button>\r\n            </th>\r\n        </tr>\r\n        </thead>\r\n        <tbody>\r\n        <tr *ngFor=\"let activity of activityPageResult.docs\">\r\n            <td>{{activity.title}}</td>\r\n            <td>{{activity.createTime | date:\"yyyy/MM/dd hh:mm\"}}</td>\r\n            <td>{{activity.endTime | date:\"yyyy/MM/dd hh:mm\"}}</td>\r\n            <td [ngStyle]=\"{color: ['gray','green','red'][activity.status]}\">\r\n                {{ActivityStatuses[activity.status]}}\r\n            </td>\r\n            <td>\r\n                <nz-list class=\"award-list\" [nzDataSource]=\"activity.awards\"\r\n                         [nzRenderItem]=\"awardItem\">\r\n                    <ng-template #awardItem let-item>\r\n                        <nz-list-item>\r\n                            <span>{{item.name}}</span>\r\n                            <span>{{AwardTypes[item.type]}}</span>\r\n                            <span>{{AwardRanks[item.rank]}}</span>\r\n                            <span>{{item.stock}}</span>\r\n                            <span>{{item.weight}}</span>\r\n                        </nz-list-item>\r\n                    </ng-template>\r\n                </nz-list>\r\n            </td>\r\n            <td>\r\n                <button class=\"btn-edit\" nz-button\r\n                        nzType=\"primary\" nzSize=\"small\"\r\n                        (click)=\"editActivity(activity)\">编辑\r\n                </button>\r\n                <button class=\"btn-remove\" nz-button\r\n                        nzType=\"danger\" nzSize=\"small\"\r\n                        (click)=\"removeActivity(activity._id)\">删除\r\n                </button>\r\n            </td>\r\n        </tr>\r\n        </tbody>\r\n    </nz-table>\r\n\r\n    <app-activity-modal [type]=\"type\" [visible]=\"isVisible\"\r\n                        [activity]=\"currentActivity\"\r\n                        (onCancel)=\"handleModalCancel()\"\r\n                        (onOk)=\"handleModalOk($event)\"></app-activity-modal>\r\n</app-layout>\r\n");

/***/ }),

/***/ "./node_modules/_raw-loader@3.1.0@raw-loader/dist/cjs.js!./src/app/pages/award/award.component.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/_raw-loader@3.1.0@raw-loader/dist/cjs.js!./src/app/pages/award/award.component.html ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-layout>\r\n    <form class=\"query-form\" nz-form [formGroup]=\"queryForm\"\r\n          (ngSubmit)=\"queryAwards()\">\r\n        <div nz-row [nzGutter]=\"24\">\r\n            <div nz-col [nzSpan]=\"8\">\r\n                <nz-form-item class=\"mb0\" nzFlex>\r\n                    <nz-form-label nzFor=\"name\">奖品名称</nz-form-label>\r\n                    <nz-form-control>\r\n                        <input id=\"name\" nz-input formControlName=\"name\"\r\n                               placeholder=\"请输入奖品名称\"/>\r\n                    </nz-form-control>\r\n                </nz-form-item>\r\n            </div>\r\n            <div nz-col [nzSpan]=\"8\">\r\n                <button class=\"btn-query\" nz-button nzType=\"primary\">查询</button>\r\n            </div>\r\n        </div>\r\n    </form>\r\n\r\n    <nz-table [nzData]=\"awardPageResult.docs\"\r\n              [nzFrontPagination]=\"false\"\r\n              [nzTotal]=\"awardPageResult.total\"\r\n              [nzPageIndex]=\"awardPageResult.page\"\r\n              [nzPageSize]=\"awardPageResult.limit\"\r\n              [nzPaginationPosition]=\"'both'\"\r\n              [nzLoading]=\"isLoading\"\r\n              [nzPageSizeOptions]=\"[5,10,20,30]\"\r\n              [nzShowSizeChanger]=\"true\"\r\n              (nzPageIndexChange)=\"fetchPageAwards('page', $event)\"\r\n              (nzPageSizeChange)=\"fetchPageAwards('limit', $event)\">\r\n        <thead>\r\n        <tr>\r\n            <th>奖品名称</th>\r\n            <th>奖品类型</th>\r\n            <th>创建时间</th>\r\n            <th>更新时间</th>\r\n            <th>\r\n                <span>操作</span>\r\n                <button class=\"btn-add\" nz-button nzSize=\"small\"\r\n                        (click)=\"addAward()\">添加\r\n                </button>\r\n            </th>\r\n        </tr>\r\n        </thead>\r\n        <tbody>\r\n        <tr *ngFor=\"let award of awardPageResult.docs\">\r\n            <td>{{award.name}}</td>\r\n            <td>{{AwardTypes[award.type]}}</td>\r\n            <td>{{award.createTime | date:\"yyyy/MM/dd hh:mm\"}}</td>\r\n            <td>{{award.updateTime | date:\"yyyy/MM/dd hh:mm\"}}</td>\r\n            <td>\r\n                <button class=\"btn-edit\" nz-button nzType=\"primary\" nzSize=\"small\"\r\n                        (click)=\"editAward(award)\">编辑\r\n                </button>\r\n                <button class=\"btn-remove\" nz-button nzType=\"danger\" nzSize=\"small\"\r\n                        (click)=\"removeAward(award._id)\">删除\r\n                </button>\r\n            </td>\r\n        </tr>\r\n        </tbody>\r\n    </nz-table>\r\n\r\n    <app-award-modal [type]=\"type\" [visible]=\"isVisible\" [award]=\"currentAward\"\r\n                     (onCancel)=\"handleModalCancel()\"\r\n                     (onOk)=\"handleModalOk($event)\"></app-award-modal>\r\n</app-layout>\r\n");

/***/ }),

/***/ "./node_modules/_raw-loader@3.1.0@raw-loader/dist/cjs.js!./src/app/pages/login/login.component.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/_raw-loader@3.1.0@raw-loader/dist/cjs.js!./src/app/pages/login/login.component.html ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<nz-layout>\r\n    <div nz-row nzType=\"flex\" nzJustify=\"center\" nzAlign=\"middle\">\r\n        <div nz-col [nzXs]=\"20\" [nzSm]=\"16\" [nzMd]=\"12\" [nzLg]=\"10\" [nzXl]=\"8\" [nzXXl]=\"6\">\r\n\r\n            <div class=\"login-main\">\r\n                <h1 class=\"login-title\">合肥有线抽奖活动CMS系统</h1>\r\n                <form nz-form class=\"login-form\" [formGroup]=\"loginForm\"\r\n                      (ngSubmit)=\"login(loginForm.value)\">\r\n                    <nz-form-item>\r\n                        <nz-form-control nzErrorTip=\"请输入管理员账号\">\r\n                            <nz-input-group nzPrefixIcon=\"user\">\r\n                                <input type=\"text\" nz-input formControlName=\"username\"\r\n                                       placeholder=\"管理员账号\"/>\r\n                            </nz-input-group>\r\n                        </nz-form-control>\r\n                    </nz-form-item>\r\n\r\n                    <nz-form-item>\r\n                        <nz-form-control nzErrorTip=\"请输入管理员密码\">\r\n                            <nz-input-group nzPrefixIcon=\"lock\">\r\n                                <input type=\"password\" nz-input formControlName=\"password\"\r\n                                       placeholder=\"请输入管理员密码\"/>\r\n                            </nz-input-group>\r\n                        </nz-form-control>\r\n                    </nz-form-item>\r\n\r\n                    <nz-form-item>\r\n                        <nz-form-control>\r\n                            <label nz-checkbox formControlName=\"remember\">\r\n                                <span>记住我</span>\r\n                            </label>\r\n                            <button class=\"btn-login\" nz-button nzType=\"primary\">登录</button>\r\n                        </nz-form-control>\r\n                    </nz-form-item>\r\n                </form>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n</nz-layout>\r\n");

/***/ }),

/***/ "./node_modules/_raw-loader@3.1.0@raw-loader/dist/cjs.js!./src/app/pages/lotto/lotto.component.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/_raw-loader@3.1.0@raw-loader/dist/cjs.js!./src/app/pages/lotto/lotto.component.html ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-layout>\r\n    <form class=\"query-form\" nz-form [formGroup]=\"queryForm\"\r\n          (ngSubmit)=\"queryLottos()\">\r\n        <div nz-row [nzGutter]=\"24\">\r\n\r\n            <div nz-col [nzSpan]=\"6\">\r\n                <nz-form-item class=\"mb0\" nzFlex>\r\n                    <nz-form-label nzFor=\"nickname\">昵称</nz-form-label>\r\n                    <nz-form-control>\r\n                        <input id=\"nickname\" nz-input formControlName=\"nickname\"\r\n                               placeholder=\"请输入昵称\"/>\r\n                    </nz-form-control>\r\n                </nz-form-item>\r\n            </div>\r\n\r\n            <div nz-col [nzSpan]=\"6\">\r\n                <nz-form-item class=\"mb0\" nzFlex>\r\n                    <nz-form-label nzFor=\"title\">标题</nz-form-label>\r\n                    <nz-form-control>\r\n                        <input id=\"title\" nz-input formControlName=\"title\"\r\n                               placeholder=\"请输入活动标题\"/>\r\n                    </nz-form-control>\r\n                </nz-form-item>\r\n            </div>\r\n\r\n            <div nz-col [nzSpan]=\"5\">\r\n                <nz-form-item class=\"mb0\" nzFlex>\r\n                    <nz-form-label nzFor=\"type\" title=\"奖品类型\">类型</nz-form-label>\r\n                    <nz-form-control>\r\n                        <nz-select id=\"type\" formControlName=\"type\"\r\n                                   nzAllowClear nzPlaceHolder=\"请选择类型\">\r\n                            <nz-option *ngFor=\"let item of AwardTypes; index as i;\"\r\n                                       [nzLabel]=\"item\" [nzValue]=\"i\"\r\n                                       [nzDisabled]=\"i < 2\"></nz-option>\r\n                        </nz-select>\r\n                    </nz-form-control>\r\n                </nz-form-item>\r\n            </div>\r\n\r\n            <div nz-col [nzSpan]=\"5\">\r\n                <nz-form-item class=\"mb0\" nzFlex>\r\n                    <nz-form-label nzFor=\"status\" title=\"奖品状态\">状态</nz-form-label>\r\n                    <nz-form-control>\r\n                        <nz-select *ngIf=\"queryForm.value.type === 2\" formControlName=\"status\"\r\n                                   nzAllowClear nzPlaceHolder=\"请选择状态\">\r\n                            <nz-option *ngFor=\"let item of RedPacketStatusMap | keyvalue\"\r\n                                       [nzLabel]=\"item.value\" [nzValue]=\"item.key\"></nz-option>\r\n                        </nz-select>\r\n\r\n                        <nz-select *ngIf=\"queryForm.value.type === 3\" formControlName=\"status\"\r\n                                   nzAllowClear nzPlaceHolder=\"请选择状态\">\r\n                            <nz-option *ngFor=\"let item of GoodsStatusMap | keyvalue\"\r\n                                       [nzLabel]=\"item.value\" [nzValue]=\"item.key\"></nz-option>\r\n                        </nz-select>\r\n\r\n                        <nz-select *ngIf=\"queryForm.value.type < 2\" formControlName=\"status\"\r\n                                   nzAllowClear nzPlaceHolder=\"请选择状态\">\r\n                        </nz-select>\r\n                    </nz-form-control>\r\n                </nz-form-item>\r\n            </div>\r\n\r\n            <div nz-col [nzSpan]=\"2\">\r\n                <button class=\"btn-query\" nz-button nzType=\"primary\">查询</button>\r\n            </div>\r\n\r\n        </div>\r\n    </form>\r\n\r\n    <nz-table [nzData]=\"lottoPageResult.docs\"\r\n              [nzFrontPagination]=\"false\"\r\n              [nzTotal]=\"lottoPageResult.total\"\r\n              [nzPageIndex]=\"lottoPageResult.page\"\r\n              [nzPageSize]=\"lottoPageResult.limit\"\r\n              [nzPaginationPosition]=\"'both'\"\r\n              [nzLoading]=\"isLoading\"\r\n              [nzPageSizeOptions]=\"[5,10,20,30]\"\r\n              [nzShowSizeChanger]=\"true\"\r\n              (nzPageIndexChange)=\"fetchPageLottos('page', $event)\"\r\n              (nzPageSizeChange)=\"fetchPageLottos('limit', $event)\">\r\n        <thead>\r\n        <tr>\r\n            <th>昵称</th>\r\n            <th>活动标题</th>\r\n            <th>活动状态</th>\r\n            <th>奖品名称</th>\r\n            <th>奖品等级</th>\r\n            <th>状态</th>\r\n            <th>创建时间</th>\r\n            <th>更新时间</th>\r\n            <th>操作</th>\r\n        </tr>\r\n        </thead>\r\n        <tbody>\r\n        <tr *ngFor=\"let lotto of lottoPageResult.docs\">\r\n            <td>{{lotto.user.nickname}}</td>\r\n            <td>{{lotto.activity.title}}</td>\r\n            <td [ngStyle]=\"{color: ['gray','green','red'][lotto.activity.status]}\">\r\n                {{ActivityStatuses[lotto.activity.status]}}\r\n            </td>\r\n            <td [title]=\"AwardTypes[lotto.award.type]\">{{lotto.award.name}}</td>\r\n            <td>{{AwardRanks[lotto.award.rank]}}</td>\r\n            <td>\r\n                <span *ngIf=\"lotto.award.type === 2\">\r\n                    {{RedPacketStatusMap[lotto.attachInfo.status]}}\r\n                </span>\r\n                <span *ngIf=\"lotto.award.type === 3\">\r\n                    {{GoodsStatusMap[lotto.attachInfo.status]}}\r\n                </span>\r\n            </td>\r\n            <td>{{lotto.createTime | date:\"yyyy/MM/dd hh:mm\"}}</td>\r\n            <td>{{lotto.updateTime | date:\"yyyy/MM/dd hh:mm\"}}</td>\r\n            <td>\r\n                <button *ngIf=\"lotto.award.type === 2 && lotto.attachInfo.status === 1\"\r\n                        nz-button nzType=\"primary\" nzSize=\"small\"\r\n                        (click)=\"setStatus(lotto._id, 2)\">发放\r\n                </button>\r\n                <button *ngIf=\"lotto.award.type === 2 && lotto.attachInfo.status === 1\"\r\n                        nz-buttonmnzType=\"primary\" nzSize=\"small\"\r\n                        (click)=\"setStatus(lotto._id, -1)\">驳回\r\n                </button>\r\n\r\n                <button *ngIf=\"lotto.award.type === 3 && lotto.attachInfo.status === 1\"\r\n                        nz-button nzType=\"primary\" nzSize=\"small\"\r\n                        (click)=\"setStatus(lotto._id, 2)\">发货\r\n                </button>\r\n                <button *ngIf=\"lotto.award.type === 3 && lotto.attachInfo.status === 1\"\r\n                        nz-button nzType=\"primary\" nzSize=\"small\"\r\n                        (click)=\"setStatus(lotto._id, -1)\">驳回\r\n                </button>\r\n            </td>\r\n        </tr>\r\n        </tbody>\r\n    </nz-table>\r\n</app-layout>\r\n");

/***/ }),

/***/ "./node_modules/_raw-loader@3.1.0@raw-loader/dist/cjs.js!./src/app/pages/manager/manager.component.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/_raw-loader@3.1.0@raw-loader/dist/cjs.js!./src/app/pages/manager/manager.component.html ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-layout>\r\n    <form class=\"manager-form\" nz-form [formGroup]=\"managerForm\"\r\n          (ngSubmit)=\"modifyPassword(managerForm.value)\">\r\n\r\n        <nz-form-item>\r\n            <nz-form-control nzErrorTip=\"请输入新密码\">\r\n                <nz-input-group nzPrefixIcon=\"lock\">\r\n                    <input type=\"password\" nz-input formControlName=\"password\"\r\n                           placeholder=\"请输入新密码\"/>\r\n                </nz-input-group>\r\n            </nz-form-control>\r\n        </nz-form-item>\r\n\r\n        <nz-form-item>\r\n            <nz-form-control nzErrorTip=\"请输入确认密码\">\r\n                <nz-input-group nzPrefixIcon=\"lock\">\r\n                    <input type=\"password\" nz-input formControlName=\"confirmPassword\"\r\n                           placeholder=\"请输入确认密码\"/>\r\n                </nz-input-group>\r\n            </nz-form-control>\r\n        </nz-form-item>\r\n\r\n        <nz-form-item>\r\n            <button class=\"btn-modify\" nz-button nzType=\"primary\" nzSize=\"large\">修改密码</button>\r\n        </nz-form-item>\r\n    </form>\r\n</app-layout>\r\n");

/***/ }),

/***/ "./node_modules/_tslib@1.10.0@tslib/tslib.es6.js":
/*!*******************************************************!*\
  !*** ./node_modules/_tslib@1.10.0@tslib/tslib.es6.js ***!
  \*******************************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/_tslib@1.10.0@tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/_@angular_core@8.2.8@@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/_@angular_router@8.2.8@@angular/router/fesm2015/router.js");
/* harmony import */ var _pages_login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/login/login.component */ "./src/app/pages/login/login.component.ts");
/* harmony import */ var _pages_award_award_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/award/award.component */ "./src/app/pages/award/award.component.ts");
/* harmony import */ var _pages_activity_activity_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/activity/activity.component */ "./src/app/pages/activity/activity.component.ts");
/* harmony import */ var _pages_lotto_lotto_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pages/lotto/lotto.component */ "./src/app/pages/lotto/lotto.component.ts");
/* harmony import */ var _pages_manager_manager_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pages/manager/manager.component */ "./src/app/pages/manager/manager.component.ts");
/* harmony import */ var _auth_guard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./auth.guard */ "./src/app/auth.guard.ts");









const routes = [
    { path: '', pathMatch: "full", redirectTo: "/award" },
    { path: "login", component: _pages_login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"] },
    { path: "award", component: _pages_award_award_component__WEBPACK_IMPORTED_MODULE_4__["AwardComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_8__["AuthGuard"]] },
    { path: "activity", component: _pages_activity_activity_component__WEBPACK_IMPORTED_MODULE_5__["ActivityComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_8__["AuthGuard"]] },
    { path: "lotto", component: _pages_lotto_lotto_component__WEBPACK_IMPORTED_MODULE_6__["LottoComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_8__["AuthGuard"]] },
    { path: "manager", component: _pages_manager_manager_component__WEBPACK_IMPORTED_MODULE_7__["ManagerComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_8__["AuthGuard"]] }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], AppRoutingModule);



/***/ }),

/***/ "./src/app/app.component.less":
/*!************************************!*\
  !*** ./src/app/app.component.less ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (":host {\n  display: flex;\n  width: 100%;\n  min-height: 100%;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvQzovY29kZS8yMDE5L2hmY2F0di1hY3Rpdml0eS9oZmNhdHYtYWN0aXZpdHktYWRtaW4vc3JjL2FwcC9hcHAuY29tcG9uZW50Lmxlc3MiLCJzcmMvYXBwL2FwcC5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGFBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQ0FBQTtFQUNBLG1DQUFBO0VBQ0Esa0NBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XG4gICAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcbiAgICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcbiAgICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xufVxuIiwiOmhvc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICB3aWR0aDogMTAwJTtcbiAgbWluLWhlaWdodDogMTAwJTtcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XG4gIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XG59XG4iXX0= */");

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/_tslib@1.10.0@tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/_@angular_core@8.2.8@@angular/core/fesm2015/core.js");


let AppComponent = class AppComponent {
    constructor() {
    }
    ngOnInit() {
    }
};
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-root",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/_raw-loader@3.1.0@raw-loader/dist/cjs.js!./src/app/app.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./app.component.less */ "./src/app/app.component.less")).default]
    })
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/_tslib@1.10.0@tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/_@angular_platform-browser@8.2.8@@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/_@angular_core@8.2.8@@angular/core/fesm2015/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _icons_provider_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./icons-provider.module */ "./src/app/icons-provider.module.ts");
/* harmony import */ var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng-zorro-antd */ "./node_modules/_ng-zorro-antd@8.3.1@ng-zorro-antd/fesm2015/ng-zorro-antd.js");
/* harmony import */ var ng_zorro_antd_message__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng-zorro-antd/message */ "./node_modules/_ng-zorro-antd@8.3.1@ng-zorro-antd/fesm2015/ng-zorro-antd-message.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/_@angular_forms@8.2.8@@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/_@angular_common@8.2.8@@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/_@angular_platform-browser@8.2.8@@angular/platform-browser/fesm2015/animations.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ "./node_modules/_@angular_common@8.2.8@@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_common_locales_zh__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common/locales/zh */ "./node_modules/_@angular_common@8.2.8@@angular/common/locales/zh.js");
/* harmony import */ var _angular_common_locales_zh__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_angular_common_locales_zh__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _pages_login_login_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./pages/login/login.component */ "./src/app/pages/login/login.component.ts");
/* harmony import */ var _pages_award_award_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./pages/award/award.component */ "./src/app/pages/award/award.component.ts");
/* harmony import */ var _pages_activity_activity_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./pages/activity/activity.component */ "./src/app/pages/activity/activity.component.ts");
/* harmony import */ var _pages_lotto_lotto_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./pages/lotto/lotto.component */ "./src/app/pages/lotto/lotto.component.ts");
/* harmony import */ var _pages_manager_manager_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./pages/manager/manager.component */ "./src/app/pages/manager/manager.component.ts");
/* harmony import */ var _components_layout_layout_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/layout/layout.component */ "./src/app/components/layout/layout.component.ts");
/* harmony import */ var _components_award_modal_award_modal_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/award-modal/award-modal.component */ "./src/app/components/award-modal/award-modal.component.ts");
/* harmony import */ var _components_activity_modal_activity_modal_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./components/activity-modal/activity-modal.component */ "./src/app/components/activity-modal/activity-modal.component.ts");





















Object(_angular_common__WEBPACK_IMPORTED_MODULE_11__["registerLocaleData"])(_angular_common_locales_zh__WEBPACK_IMPORTED_MODULE_12___default.a);
let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
            _pages_login_login_component__WEBPACK_IMPORTED_MODULE_13__["LoginComponent"],
            _pages_award_award_component__WEBPACK_IMPORTED_MODULE_14__["AwardComponent"],
            _pages_activity_activity_component__WEBPACK_IMPORTED_MODULE_15__["ActivityComponent"],
            _pages_lotto_lotto_component__WEBPACK_IMPORTED_MODULE_16__["LottoComponent"],
            _pages_manager_manager_component__WEBPACK_IMPORTED_MODULE_17__["ManagerComponent"],
            _components_layout_layout_component__WEBPACK_IMPORTED_MODULE_18__["LayoutComponent"],
            _components_award_modal_award_modal_component__WEBPACK_IMPORTED_MODULE_19__["AwardModalComponent"],
            _components_activity_modal_activity_modal_component__WEBPACK_IMPORTED_MODULE_20__["ActivityModalComponent"]
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
            _icons_provider_module__WEBPACK_IMPORTED_MODULE_5__["IconsProviderModule"],
            ng_zorro_antd__WEBPACK_IMPORTED_MODULE_6__["NgZorroAntdModule"],
            ng_zorro_antd_message__WEBPACK_IMPORTED_MODULE_7__["NzMessageModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ReactiveFormsModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_9__["HttpClientModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__["BrowserAnimationsModule"]
        ],
        providers: [{ provide: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_6__["NZ_I18N"], useValue: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_6__["zh_CN"] }],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/auth.guard.ts":
/*!*******************************!*\
  !*** ./src/app/auth.guard.ts ***!
  \*******************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/_tslib@1.10.0@tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/_@angular_core@8.2.8@@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/_@angular_router@8.2.8@@angular/router/fesm2015/router.js");
/* harmony import */ var _ts_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ts/services */ "./src/ts/services/index.ts");




let AuthGuard = class AuthGuard {
    constructor(router, managerService) {
        this.router = router;
        this.managerService = managerService;
    }
    canActivate(next, state) {
        console.log("AuthGuard url:", state.url);
        return this.checkStatus(state.url);
    }
    checkStatus(url) {
        console.log("AuthGuard loginStatus:", this.managerService.loginStatus);
        if (this.managerService.loginStatus)
            return true;
        this.managerService.redirectUrl = url;
        this.router.navigateByUrl("/login");
        return false;
    }
};
AuthGuard.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _ts_services__WEBPACK_IMPORTED_MODULE_3__["ManagerService"] }
];
AuthGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: "root"
    })
], AuthGuard);



/***/ }),

/***/ "./src/app/components/activity-modal/activity-modal.component.less":
/*!*************************************************************************!*\
  !*** ./src/app/components/activity-modal/activity-modal.component.less ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvYWN0aXZpdHktbW9kYWwvYWN0aXZpdHktbW9kYWwuY29tcG9uZW50Lmxlc3MifQ== */");

/***/ }),

/***/ "./src/app/components/activity-modal/activity-modal.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/components/activity-modal/activity-modal.component.ts ***!
  \***********************************************************************/
/*! exports provided: ActivityModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivityModalComponent", function() { return ActivityModalComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/_tslib@1.10.0@tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/_@angular_core@8.2.8@@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/_@angular_forms@8.2.8@@angular/forms/fesm2015/forms.js");
/* harmony import */ var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-zorro-antd */ "./node_modules/_ng-zorro-antd@8.3.1@ng-zorro-antd/fesm2015/ng-zorro-antd.js");
/* harmony import */ var _ts_common_enums__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../ts/common/enums */ "./src/ts/common/enums.ts");
/* harmony import */ var _ts_common_names__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../ts/common/names */ "./src/ts/common/names.ts");
/* harmony import */ var _ts_helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../ts/helpers */ "./src/ts/helpers/index.ts");
/* harmony import */ var _ts_services__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../ts/services */ "./src/ts/services/index.ts");








let ActivityModalComponent = class ActivityModalComponent {
    constructor(formBuilder, message, awardService) {
        this.formBuilder = formBuilder;
        this.message = message;
        this.awardService = awardService;
        this.onCancel = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onOk = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.ActivityStatuses = _ts_common_names__WEBPACK_IMPORTED_MODULE_5__["ActivityStatuses"];
        this.AwardRanks = _ts_common_names__WEBPACK_IMPORTED_MODULE_5__["AwardRanks"];
        this.OperateTypes = _ts_common_names__WEBPACK_IMPORTED_MODULE_5__["OperateTypes"];
        this.activityForm = this.formBuilder.group({
            title: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            startTime: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            endTime: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            awards: this.formBuilder.array([this._buildAwardFormGroup()])
        });
    }
    get activityStatus() {
        let formData = this.activityForm.value;
        let { startTime, endTime } = formData;
        return startTime && endTime ? _ts_helpers__WEBPACK_IMPORTED_MODULE_6__["ActivityHelper"].getActivityStatus(startTime, endTime) : null;
    }
    ngOnInit() {
        this.fetchAwards();
    }
    _buildAwardFormGroup(award) {
        if (award) {
            return this.formBuilder.group({
                id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](award.id, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
                rank: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](award.rank, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
                stock: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](award.stock, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].min(0)),
                weight: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](award.weight, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].max(1)])
            });
        }
        else {
            return this.formBuilder.group({
                id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
                rank: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
                stock: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].min(0)]),
                weight: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].max(1)])
            });
        }
    }
    fetchAwards() {
        let self = this;
        const { message, awardService } = self;
        awardService.getAwards()
            .subscribe({
            next(awards) {
                self.awards = awards;
            },
            error(err) {
                message.error(err);
            }
        });
    }
    openActivity() {
        let self = this, formBuilder = this.formBuilder, type = this.type;
        if (type === _ts_common_enums__WEBPACK_IMPORTED_MODULE_4__["OperateType"].Add) {
            this.activityForm = formBuilder.group({
                title: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
                startTime: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
                endTime: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
                awards: formBuilder.array([this._buildAwardFormGroup()])
            });
        }
        else if (type === _ts_common_enums__WEBPACK_IMPORTED_MODULE_4__["OperateType"].Edit) {
            let activity = this.activity;
            if (activity) {
                let awardForms = [];
                for (let i = 0; i < activity.awards.length; i++) {
                    let award = activity.awards[i];
                    awardForms.push(self._buildAwardFormGroup(award));
                }
                this.activityForm = formBuilder.group({
                    title: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](activity.title, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
                    startTime: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](new Date(activity.startTime), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
                    endTime: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](new Date(activity.endTime), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
                    awards: formBuilder.array(awardForms)
                });
            }
        }
    }
    closeActivity() {
        this.onCancel.emit();
    }
    saveActivity(formData) {
        if (!this.activityForm.valid) {
            for (const i in this.activityForm.controls) {
                this.activityForm.controls[i].markAsDirty();
                this.activityForm.controls[i].updateValueAndValidity();
            }
            return;
        }
        let type = this.type;
        if (type === _ts_common_enums__WEBPACK_IMPORTED_MODULE_4__["OperateType"].Add) {
            this.onOk.emit(formData);
        }
        else if (type === _ts_common_enums__WEBPACK_IMPORTED_MODULE_4__["OperateType"].Edit) {
            formData["_id"] = this.activity._id;
            this.onOk.emit(formData);
        }
    }
    addActivityAward() {
        let awardsForms = this.activityForm.get("awards");
        awardsForms.push(this._buildAwardFormGroup());
    }
    removeActivityAward(id) {
        let awardsForms = this.activityForm.get("awards");
        awardsForms.removeAt(id);
    }
};
ActivityModalComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
    { type: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__["NzMessageService"] },
    { type: _ts_services__WEBPACK_IMPORTED_MODULE_7__["AwardService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], ActivityModalComponent.prototype, "type", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], ActivityModalComponent.prototype, "visible", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], ActivityModalComponent.prototype, "activity", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], ActivityModalComponent.prototype, "onCancel", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], ActivityModalComponent.prototype, "onOk", void 0);
ActivityModalComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-activity-modal',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./activity-modal.component.html */ "./node_modules/_raw-loader@3.1.0@raw-loader/dist/cjs.js!./src/app/components/activity-modal/activity-modal.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./activity-modal.component.less */ "./src/app/components/activity-modal/activity-modal.component.less")).default]
    })
], ActivityModalComponent);



/***/ }),

/***/ "./src/app/components/award-modal/award-modal.component.less":
/*!*******************************************************************!*\
  !*** ./src/app/components/award-modal/award-modal.component.less ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvYXdhcmQtbW9kYWwvYXdhcmQtbW9kYWwuY29tcG9uZW50Lmxlc3MifQ== */");

/***/ }),

/***/ "./src/app/components/award-modal/award-modal.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/components/award-modal/award-modal.component.ts ***!
  \*****************************************************************/
/*! exports provided: AwardModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AwardModalComponent", function() { return AwardModalComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/_tslib@1.10.0@tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/_@angular_core@8.2.8@@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/_@angular_forms@8.2.8@@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ts_common_enums__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../ts/common/enums */ "./src/ts/common/enums.ts");
/* harmony import */ var _ts_common_names__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../ts/common/names */ "./src/ts/common/names.ts");





let AwardModalComponent = class AwardModalComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.onCancel = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onOk = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.AwardTypes = _ts_common_names__WEBPACK_IMPORTED_MODULE_4__["AwardTypes"];
        this.OperateTypes = _ts_common_names__WEBPACK_IMPORTED_MODULE_4__["OperateTypes"];
        this.awardForm = this.formBuilder.group({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            type: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
        });
    }
    ngOnInit() {
    }
    openAward() {
        let type = this.type;
        if (type === _ts_common_enums__WEBPACK_IMPORTED_MODULE_3__["OperateType"].Add) {
            this.awardForm = this.formBuilder.group({
                name: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
                type: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            });
        }
        else if (type === _ts_common_enums__WEBPACK_IMPORTED_MODULE_3__["OperateType"].Edit) {
            let award = this.award;
            if (award) {
                this.awardForm = this.formBuilder.group({
                    name: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](award.name, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
                    type: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](award.type, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
                });
            }
        }
    }
    closeAward() {
        this.onCancel.emit();
    }
    saveAward(formData) {
        if (!this.awardForm.valid) {
            for (const i in this.awardForm.controls) {
                this.awardForm.controls[i].markAsDirty();
                this.awardForm.controls[i].updateValueAndValidity();
            }
            return;
        }
        let type = this.type;
        if (type === _ts_common_enums__WEBPACK_IMPORTED_MODULE_3__["OperateType"].Add) {
            this.onOk.emit(formData);
        }
        else if (type === _ts_common_enums__WEBPACK_IMPORTED_MODULE_3__["OperateType"].Edit) {
            formData["_id"] = this.award._id;
            this.onOk.emit(formData);
        }
    }
};
AwardModalComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], AwardModalComponent.prototype, "type", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], AwardModalComponent.prototype, "visible", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], AwardModalComponent.prototype, "award", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], AwardModalComponent.prototype, "onCancel", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], AwardModalComponent.prototype, "onOk", void 0);
AwardModalComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-award-modal",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./award-modal.component.html */ "./node_modules/_raw-loader@3.1.0@raw-loader/dist/cjs.js!./src/app/components/award-modal/award-modal.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./award-modal.component.less */ "./src/app/components/award-modal/award-modal.component.less")).default]
    })
], AwardModalComponent);



/***/ }),

/***/ "./src/app/components/layout/layout.component.less":
/*!*********************************************************!*\
  !*** ./src/app/components/layout/layout.component.less ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".app-layout {\n  height: 100vh;\n}\n.app-layout .menu-sidebar {\n  position: relative;\n  z-index: 10;\n  min-height: 100vh;\n  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);\n}\n.app-layout .menu-sidebar .sidebar-logo {\n  position: relative;\n  height: 64px;\n  padding-left: 24px;\n  overflow: hidden;\n  line-height: 64px;\n  background: #001529;\n  transition: all 0.3s;\n}\n.app-layout .menu-sidebar .sidebar-logo img {\n  display: inline-block;\n  height: 32px;\n  width: 32px;\n  vertical-align: middle;\n}\n.app-layout .menu-sidebar .sidebar-logo h1 {\n  display: inline-block;\n  margin: 0 0 0 20px;\n  color: #fff;\n  font-weight: 600;\n  font-size: 14px;\n  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;\n  vertical-align: middle;\n}\n.app-layout nz-header {\n  padding: 0;\n  width: 100%;\n  z-index: 2;\n}\n.app-layout nz-header .app-header {\n  position: relative;\n  height: 64px;\n  padding: 0;\n  background: #fff;\n  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);\n}\n.app-layout nz-header .app-header .header-trigger {\n  height: 64px;\n  padding: 20px 24px;\n  font-size: 20px;\n  cursor: pointer;\n  transition: all 0.3s, padding 0s;\n}\n.app-layout nz-header .app-header .trigger:hover {\n  color: #1890ff;\n}\n.app-layout nz-header .app-header .username {\n  float: right;\n  margin-right: 24px;\n}\n.app-layout nz-content {\n  margin: 24px;\n}\n.app-layout nz-content .app-content {\n  padding: 24px;\n  background: #fff;\n  height: 100%;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9sYXlvdXQvQzovY29kZS8yMDE5L2hmY2F0di1hY3Rpdml0eS9oZmNhdHYtYWN0aXZpdHktYWRtaW4vc3JjL2FwcC9jb21wb25lbnRzL2xheW91dC9sYXlvdXQuY29tcG9uZW50Lmxlc3MiLCJzcmMvYXBwL2NvbXBvbmVudHMvbGF5b3V0L2xheW91dC5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGFBQUE7QUNDSjtBREZBO0VBSVEsa0JBQUE7RUFDQSxXQUFBO0VBQ0EsaUJBQUE7RUFDQSwyQ0FBQTtBQ0NSO0FEUkE7RUFVWSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLG9CQUFBO0FDQ1o7QURqQkE7RUFtQmdCLHFCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxzQkFBQTtBQ0NoQjtBRHZCQTtFQTBCZ0IscUJBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxpRUFBQTtFQUNBLHNCQUFBO0FDQWhCO0FEaENBO0VBc0NRLFVBQUE7RUFDQSxXQUFBO0VBQ0EsVUFBQTtBQ0hSO0FEckNBO0VBMkNZLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLFVBQUE7RUFDQSxnQkFBQTtFQUNBLDJDQUFBO0FDSFo7QUQ1Q0E7RUFrRGdCLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0VBQ0EsZ0NBQUE7QUNIaEI7QURuREE7RUEwRGdCLGNBQUE7QUNKaEI7QUR0REE7RUE4RGdCLFlBQUE7RUFDQSxrQkFBQTtBQ0xoQjtBRDFEQTtFQXFFUSxZQUFBO0FDUlI7QUQ3REE7RUF3RVksYUFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtBQ1JaIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9sYXlvdXQvbGF5b3V0LmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiLmFwcC1sYXlvdXQge1xuICAgIGhlaWdodDogMTAwdmg7XG5cbiAgICAubWVudS1zaWRlYmFyIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB6LWluZGV4OiAxMDtcbiAgICAgICAgbWluLWhlaWdodDogMTAwdmg7XG4gICAgICAgIGJveC1zaGFkb3c6IDJweCAwIDZweCByZ2JhKDAsIDIxLCA0MSwgLjM1KTtcblxuICAgICAgICAuc2lkZWJhci1sb2dvIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICAgIGhlaWdodDogNjRweDtcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMjRweDtcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgICAgICBsaW5lLWhlaWdodDogNjRweDtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICMwMDE1Mjk7XG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBhbGwgLjNzO1xuXG4gICAgICAgICAgICBpbWcge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDMycHg7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDMycHg7XG4gICAgICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaDEge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICAgICAgICBtYXJnaW46IDAgMCAwIDIwcHg7XG4gICAgICAgICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgICAgICAgICAgZm9udC1mYW1pbHk6IEF2ZW5pciwgSGVsdmV0aWNhIE5ldWUsIEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XG4gICAgICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG56LWhlYWRlciB7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICB6LWluZGV4OiAyO1xuXG4gICAgICAgIC5hcHAtaGVhZGVyIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICAgIGhlaWdodDogNjRweDtcbiAgICAgICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgICAgICAgICAgYm94LXNoYWRvdzogMCAxcHggNHB4IHJnYmEoMCwgMjEsIDQxLCAuMDgpO1xuXG4gICAgICAgICAgICAuaGVhZGVyLXRyaWdnZXIge1xuICAgICAgICAgICAgICAgIGhlaWdodDogNjRweDtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAyMHB4IDI0cHg7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAyMHB4O1xuICAgICAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiBhbGwgLjNzLCBwYWRkaW5nIDBzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAudHJpZ2dlcjpob3ZlciB7XG4gICAgICAgICAgICAgICAgY29sb3I6ICMxODkwZmY7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC51c2VybmFtZSB7XG4gICAgICAgICAgICAgICAgZmxvYXQ6IHJpZ2h0O1xuICAgICAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMjRweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG56LWNvbnRlbnQge1xuICAgICAgICBtYXJnaW46IDI0cHg7XG5cbiAgICAgICAgLmFwcC1jb250ZW50IHtcbiAgICAgICAgICAgIHBhZGRpbmc6IDI0cHg7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLmFwcC1sYXlvdXQge1xuICBoZWlnaHQ6IDEwMHZoO1xufVxuLmFwcC1sYXlvdXQgLm1lbnUtc2lkZWJhciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgei1pbmRleDogMTA7XG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xuICBib3gtc2hhZG93OiAycHggMCA2cHggcmdiYSgwLCAyMSwgNDEsIDAuMzUpO1xufVxuLmFwcC1sYXlvdXQgLm1lbnUtc2lkZWJhciAuc2lkZWJhci1sb2dvIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBoZWlnaHQ6IDY0cHg7XG4gIHBhZGRpbmctbGVmdDogMjRweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgbGluZS1oZWlnaHQ6IDY0cHg7XG4gIGJhY2tncm91bmQ6ICMwMDE1Mjk7XG4gIHRyYW5zaXRpb246IGFsbCAwLjNzO1xufVxuLmFwcC1sYXlvdXQgLm1lbnUtc2lkZWJhciAuc2lkZWJhci1sb2dvIGltZyB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgaGVpZ2h0OiAzMnB4O1xuICB3aWR0aDogMzJweDtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbn1cbi5hcHAtbGF5b3V0IC5tZW51LXNpZGViYXIgLnNpZGViYXItbG9nbyBoMSB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgbWFyZ2luOiAwIDAgMCAyMHB4O1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LWZhbWlseTogQXZlbmlyLCBIZWx2ZXRpY2EgTmV1ZSwgQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbn1cbi5hcHAtbGF5b3V0IG56LWhlYWRlciB7XG4gIHBhZGRpbmc6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICB6LWluZGV4OiAyO1xufVxuLmFwcC1sYXlvdXQgbnotaGVhZGVyIC5hcHAtaGVhZGVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBoZWlnaHQ6IDY0cHg7XG4gIHBhZGRpbmc6IDA7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJveC1zaGFkb3c6IDAgMXB4IDRweCByZ2JhKDAsIDIxLCA0MSwgMC4wOCk7XG59XG4uYXBwLWxheW91dCBuei1oZWFkZXIgLmFwcC1oZWFkZXIgLmhlYWRlci10cmlnZ2VyIHtcbiAgaGVpZ2h0OiA2NHB4O1xuICBwYWRkaW5nOiAyMHB4IDI0cHg7XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcywgcGFkZGluZyAwcztcbn1cbi5hcHAtbGF5b3V0IG56LWhlYWRlciAuYXBwLWhlYWRlciAudHJpZ2dlcjpob3ZlciB7XG4gIGNvbG9yOiAjMTg5MGZmO1xufVxuLmFwcC1sYXlvdXQgbnotaGVhZGVyIC5hcHAtaGVhZGVyIC51c2VybmFtZSB7XG4gIGZsb2F0OiByaWdodDtcbiAgbWFyZ2luLXJpZ2h0OiAyNHB4O1xufVxuLmFwcC1sYXlvdXQgbnotY29udGVudCB7XG4gIG1hcmdpbjogMjRweDtcbn1cbi5hcHAtbGF5b3V0IG56LWNvbnRlbnQgLmFwcC1jb250ZW50IHtcbiAgcGFkZGluZzogMjRweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuIl19 */");

/***/ }),

/***/ "./src/app/components/layout/layout.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/layout/layout.component.ts ***!
  \*******************************************************/
/*! exports provided: LayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutComponent", function() { return LayoutComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/_tslib@1.10.0@tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/_@angular_core@8.2.8@@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/_@angular_router@8.2.8@@angular/router/fesm2015/router.js");
/* harmony import */ var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-zorro-antd */ "./node_modules/_ng-zorro-antd@8.3.1@ng-zorro-antd/fesm2015/ng-zorro-antd.js");
/* harmony import */ var _ts_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../ts/helpers */ "./src/ts/helpers/index.ts");
/* harmony import */ var _ts_services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../ts/services */ "./src/ts/services/index.ts");






let LayoutComponent = class LayoutComponent {
    constructor(router, message, managerService) {
        this.router = router;
        this.message = message;
        this.managerService = managerService;
        this.username = "";
        this.isCollapsed = false;
    }
    logout() {
        console.log("logout");
        const { router, message, managerService } = this;
        managerService.logout()
            .subscribe({
            next(data) {
                if (data) {
                    _ts_helpers__WEBPACK_IMPORTED_MODULE_4__["TokenHelper"].removeToken();
                    router.navigateByUrl("/login");
                }
                else
                    message.error("注销失败");
            },
            error(err) {
                message.error(err);
            }
        });
    }
    ngOnInit() {
        let managerInfo = _ts_helpers__WEBPACK_IMPORTED_MODULE_4__["TokenHelper"].getManagerInfo();
        console.log("managerInfo:", managerInfo);
        if (managerInfo) {
            this.username = managerInfo.username;
        }
    }
};
LayoutComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__["NzMessageService"] },
    { type: _ts_services__WEBPACK_IMPORTED_MODULE_5__["ManagerService"] }
];
LayoutComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-layout",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./layout.component.html */ "./node_modules/_raw-loader@3.1.0@raw-loader/dist/cjs.js!./src/app/components/layout/layout.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./layout.component.less */ "./src/app/components/layout/layout.component.less")).default]
    })
], LayoutComponent);



/***/ }),

/***/ "./src/app/icons-provider.module.ts":
/*!******************************************!*\
  !*** ./src/app/icons-provider.module.ts ***!
  \******************************************/
/*! exports provided: IconsProviderModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IconsProviderModule", function() { return IconsProviderModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/_tslib@1.10.0@tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/_@angular_core@8.2.8@@angular/core/fesm2015/core.js");
/* harmony import */ var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng-zorro-antd */ "./node_modules/_ng-zorro-antd@8.3.1@ng-zorro-antd/fesm2015/ng-zorro-antd.js");
/* harmony import */ var _ant_design_icons_angular_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ant-design/icons-angular/icons */ "./node_modules/_@ant-design_icons-angular@8.0.3@@ant-design/icons-angular/fesm2015/ant-design-icons-angular-icons.js");




const icons = [_ant_design_icons_angular_icons__WEBPACK_IMPORTED_MODULE_3__["MenuFoldOutline"], _ant_design_icons_angular_icons__WEBPACK_IMPORTED_MODULE_3__["MenuUnfoldOutline"], _ant_design_icons_angular_icons__WEBPACK_IMPORTED_MODULE_3__["DashboardOutline"], _ant_design_icons_angular_icons__WEBPACK_IMPORTED_MODULE_3__["FormOutline"]];
let IconsProviderModule = class IconsProviderModule {
};
IconsProviderModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        providers: [
            { provide: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_2__["NZ_ICONS"], useValue: icons }
        ]
    })
], IconsProviderModule);



/***/ }),

/***/ "./src/app/pages/activity/activity.component.less":
/*!********************************************************!*\
  !*** ./src/app/pages/activity/activity.component.less ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (":host {\n  width: 100%;\n  min-height: 100%;\n}\n:host nz-select {\n  width: 150px;\n}\n:host .award-list {\n  margin: auto;\n  width: 300px;\n}\n:host .award-list nz-list-item {\n  margin: 0;\n  padding: 4px 0;\n}\n:host .award-list nz-list-item span {\n  font-size: 12px;\n  text-align: center;\n}\n:host .award-list nz-list-item span:first-child {\n  width: 35%;\n}\n:host .award-list nz-list-item span:nth-child(2) {\n  width: 20%;\n}\n:host .award-list nz-list-item span:nth-child(3) {\n  width: 18%;\n}\n:host .award-list nz-list-item span:nth-child(4) {\n  width: 15%;\n}\n:host .award-list nz-list-item span:last-child {\n  width: 12%;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvYWN0aXZpdHkvQzovY29kZS8yMDE5L2hmY2F0di1hY3Rpdml0eS9oZmNhdHYtYWN0aXZpdHktYWRtaW4vc3JjL2FwcC9wYWdlcy9hY3Rpdml0eS9hY3Rpdml0eS5jb21wb25lbnQubGVzcyIsInNyYy9hcHAvcGFnZXMvYWN0aXZpdHkvYWN0aXZpdHkuY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxXQUFBO0VBQ0EsZ0JBQUE7QUNDSjtBREhBO0VBS1EsWUFBQTtBQ0NSO0FETkE7RUFTUSxZQUFBO0VBQ0EsWUFBQTtBQ0FSO0FEVkE7RUFhWSxTQUFBO0VBQ0EsY0FBQTtBQ0FaO0FEZEE7RUFpQmdCLGVBQUE7RUFDQSxrQkFBQTtBQ0FoQjtBREVnQjtFQUNJLFVBQUE7QUNBcEI7QURHZ0I7RUFDSSxVQUFBO0FDRHBCO0FESWdCO0VBQ0ksVUFBQTtBQ0ZwQjtBREtnQjtFQUNJLFVBQUE7QUNIcEI7QURNZ0I7RUFDSSxVQUFBO0FDSnBCIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvYWN0aXZpdHkvYWN0aXZpdHkuY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWluLWhlaWdodDogMTAwJTtcblxuICAgIG56LXNlbGVjdCB7XG4gICAgICAgIHdpZHRoOiAxNTBweDtcbiAgICB9XG5cbiAgICAuYXdhcmQtbGlzdCB7XG4gICAgICAgIG1hcmdpbjogYXV0bztcbiAgICAgICAgd2lkdGg6IDMwMHB4O1xuXG4gICAgICAgIG56LWxpc3QtaXRlbSB7XG4gICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgICBwYWRkaW5nOiA0cHggMDtcblxuICAgICAgICAgICAgc3BhbiB7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcblxuICAgICAgICAgICAgICAgICY6Zmlyc3QtY2hpbGQge1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzUlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICY6bnRoLWNoaWxkKDIpIHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwJTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAmOm50aC1jaGlsZCgzKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxOCU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgJjpudGgtY2hpbGQoNCkge1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTUlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICY6bGFzdC1jaGlsZCB7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMiU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgbWluLWhlaWdodDogMTAwJTtcbn1cbjpob3N0IG56LXNlbGVjdCB7XG4gIHdpZHRoOiAxNTBweDtcbn1cbjpob3N0IC5hd2FyZC1saXN0IHtcbiAgbWFyZ2luOiBhdXRvO1xuICB3aWR0aDogMzAwcHg7XG59XG46aG9zdCAuYXdhcmQtbGlzdCBuei1saXN0LWl0ZW0ge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDRweCAwO1xufVxuOmhvc3QgLmF3YXJkLWxpc3QgbnotbGlzdC1pdGVtIHNwYW4ge1xuICBmb250LXNpemU6IDEycHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbjpob3N0IC5hd2FyZC1saXN0IG56LWxpc3QtaXRlbSBzcGFuOmZpcnN0LWNoaWxkIHtcbiAgd2lkdGg6IDM1JTtcbn1cbjpob3N0IC5hd2FyZC1saXN0IG56LWxpc3QtaXRlbSBzcGFuOm50aC1jaGlsZCgyKSB7XG4gIHdpZHRoOiAyMCU7XG59XG46aG9zdCAuYXdhcmQtbGlzdCBuei1saXN0LWl0ZW0gc3BhbjpudGgtY2hpbGQoMykge1xuICB3aWR0aDogMTglO1xufVxuOmhvc3QgLmF3YXJkLWxpc3QgbnotbGlzdC1pdGVtIHNwYW46bnRoLWNoaWxkKDQpIHtcbiAgd2lkdGg6IDE1JTtcbn1cbjpob3N0IC5hd2FyZC1saXN0IG56LWxpc3QtaXRlbSBzcGFuOmxhc3QtY2hpbGQge1xuICB3aWR0aDogMTIlO1xufVxuIl19 */");

/***/ }),

/***/ "./src/app/pages/activity/activity.component.ts":
/*!******************************************************!*\
  !*** ./src/app/pages/activity/activity.component.ts ***!
  \******************************************************/
/*! exports provided: ActivityComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivityComponent", function() { return ActivityComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/_tslib@1.10.0@tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/_@angular_core@8.2.8@@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/_@angular_forms@8.2.8@@angular/forms/fesm2015/forms.js");
/* harmony import */ var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-zorro-antd */ "./node_modules/_ng-zorro-antd@8.3.1@ng-zorro-antd/fesm2015/ng-zorro-antd.js");
/* harmony import */ var _ts_common_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../ts/common/utils */ "./src/ts/common/utils.ts");
/* harmony import */ var _ts_common_enums__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../ts/common/enums */ "./src/ts/common/enums.ts");
/* harmony import */ var _ts_common_names__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../ts/common/names */ "./src/ts/common/names.ts");
/* harmony import */ var _ts_services__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../ts/services */ "./src/ts/services/index.ts");








let ActivityComponent = class ActivityComponent {
    constructor(formBuilder, modal, message, activityService) {
        this.formBuilder = formBuilder;
        this.modal = modal;
        this.message = message;
        this.activityService = activityService;
        this.ActivityStatuses = _ts_common_names__WEBPACK_IMPORTED_MODULE_6__["ActivityStatuses"];
        this.AwardTypes = _ts_common_names__WEBPACK_IMPORTED_MODULE_6__["AwardTypes"];
        this.AwardRanks = _ts_common_names__WEBPACK_IMPORTED_MODULE_6__["AwardRanks"];
        this.isLoading = false;
        this.activityPageResult = {
            docs: [],
            total: 0,
            page: 1,
            limit: 10
        };
        this.type = _ts_common_enums__WEBPACK_IMPORTED_MODULE_5__["OperateType"].Add;
        this.isVisible = false;
        this.queryForm = this.formBuilder.group({
            title: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null),
            status: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null)
        });
    }
    ngOnInit() {
        this.fetchPageActivities();
    }
    fetchPageActivities(key, $event) {
        const self = this;
        if (key && $event) {
            self.activityPageResult[key] = $event;
        }
        const { message, activityService, queryForm, activityPageResult } = self;
        self.isLoading = true;
        activityService.getPageActivities(_ts_common_utils__WEBPACK_IMPORTED_MODULE_4__["Utils"].filterConditions(queryForm.value), activityPageResult.page, activityPageResult.limit)
            .subscribe({
            next(result) {
                self.isLoading = false;
                self.activityPageResult = result;
            },
            error(err) {
                self.isLoading = false;
                message.error(err);
            }
        });
    }
    queryActivities() {
        if (!this.queryForm.valid) {
            for (const i in this.queryForm.controls) {
                this.queryForm.controls[i].markAsDirty();
                this.queryForm.controls[i].updateValueAndValidity();
            }
            return;
        }
        this.fetchPageActivities();
    }
    addActivity() {
        this.type = _ts_common_enums__WEBPACK_IMPORTED_MODULE_5__["OperateType"].Add;
        this.currentActivity = undefined;
        this.isVisible = true;
    }
    editActivity(activity) {
        this.type = _ts_common_enums__WEBPACK_IMPORTED_MODULE_5__["OperateType"].Edit;
        this.currentActivity = activity;
        this.isVisible = true;
    }
    removeActivity(id) {
        const self = this;
        const { modal, message, activityService } = self;
        modal.confirm({
            nzTitle: "确定要删除此活动吗？",
            nzOnOk() {
                activityService.removeActivity(id)
                    .subscribe({
                    next(result) {
                        if (!result)
                            message.error("删除失败");
                        else
                            self.fetchPageActivities();
                    },
                    error(err) {
                        message.error(err);
                    }
                });
            }
        });
    }
    handleModalCancel() {
        this.isVisible = false;
    }
    handleModalOk(activity) {
        const self = this;
        const { message, activityService, activityPageResult, type } = self;
        if (type === _ts_common_enums__WEBPACK_IMPORTED_MODULE_5__["OperateType"].Add) {
            activityService.addActivity(activity)
                .subscribe({
                next(data) {
                    self.fetchPageActivities();
                    self.isVisible = false;
                },
                error(err) {
                    message.error(err);
                    self.isVisible = false;
                }
            });
        }
        else if (type === _ts_common_enums__WEBPACK_IMPORTED_MODULE_5__["OperateType"].Edit) {
            activityService.updateActivity(activity)
                .subscribe({
                next(data) {
                    // let activities = activityPageResult.docs;
                    // activities.forEach((activity: ActivityDocument<AwardVO>) => {
                    //     if (activity._id === data._id) {
                    //         for (let key in data) {
                    //             let value = data[key];
                    //             if (key !== "_id") {
                    //                 activity[key] = value;
                    //             }
                    //         }
                    //     }
                    // });
                    // self.activityPageResult["docs"] = activities;
                    self.fetchPageActivities();
                    self.isVisible = false;
                },
                error(err) {
                    message.error(err);
                    self.isVisible = false;
                }
            });
        }
    }
};
ActivityComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
    { type: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__["NzModalService"] },
    { type: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__["NzMessageService"] },
    { type: _ts_services__WEBPACK_IMPORTED_MODULE_7__["ActivityService"] }
];
ActivityComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-activity',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./activity.component.html */ "./node_modules/_raw-loader@3.1.0@raw-loader/dist/cjs.js!./src/app/pages/activity/activity.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./activity.component.less */ "./src/app/pages/activity/activity.component.less")).default]
    })
], ActivityComponent);



/***/ }),

/***/ "./src/app/pages/award/award.component.less":
/*!**************************************************!*\
  !*** ./src/app/pages/award/award.component.less ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (":host {\n  width: 100%;\n  min-height: 100%;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvYXdhcmQvQzovY29kZS8yMDE5L2hmY2F0di1hY3Rpdml0eS9oZmNhdHYtYWN0aXZpdHktYWRtaW4vc3JjL2FwcC9wYWdlcy9hd2FyZC9hd2FyZC5jb21wb25lbnQubGVzcyIsInNyYy9hcHAvcGFnZXMvYXdhcmQvYXdhcmQuY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxXQUFBO0VBQ0EsZ0JBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2F3YXJkL2F3YXJkLmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XG59IiwiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgbWluLWhlaWdodDogMTAwJTtcbn1cbiJdfQ== */");

/***/ }),

/***/ "./src/app/pages/award/award.component.ts":
/*!************************************************!*\
  !*** ./src/app/pages/award/award.component.ts ***!
  \************************************************/
/*! exports provided: AwardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AwardComponent", function() { return AwardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/_tslib@1.10.0@tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/_@angular_core@8.2.8@@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/_@angular_forms@8.2.8@@angular/forms/fesm2015/forms.js");
/* harmony import */ var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-zorro-antd */ "./node_modules/_ng-zorro-antd@8.3.1@ng-zorro-antd/fesm2015/ng-zorro-antd.js");
/* harmony import */ var _ts_common_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../ts/common/utils */ "./src/ts/common/utils.ts");
/* harmony import */ var _ts_common_enums__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../ts/common/enums */ "./src/ts/common/enums.ts");
/* harmony import */ var _ts_common_names__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../ts/common/names */ "./src/ts/common/names.ts");
/* harmony import */ var _ts_services__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../ts/services */ "./src/ts/services/index.ts");








let AwardComponent = class AwardComponent {
    constructor(formBuilder, modal, message, awardService) {
        this.formBuilder = formBuilder;
        this.modal = modal;
        this.message = message;
        this.awardService = awardService;
        this.AwardTypes = _ts_common_names__WEBPACK_IMPORTED_MODULE_6__["AwardTypes"];
        this.OperateTypes = _ts_common_names__WEBPACK_IMPORTED_MODULE_6__["OperateTypes"];
        this.isLoading = false;
        this.awardPageResult = {
            docs: [],
            total: 0,
            page: 1,
            limit: 10
        };
        this.type = _ts_common_enums__WEBPACK_IMPORTED_MODULE_5__["OperateType"].Add;
        this.isVisible = false;
        this.queryForm = this.formBuilder.group({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null)
        });
    }
    ngOnInit() {
        this.fetchPageAwards();
    }
    fetchPageAwards(key, $event) {
        const self = this;
        if (key && $event) {
            self.awardPageResult[key] = $event;
        }
        const { message, awardService, queryForm, awardPageResult } = self;
        self.isLoading = true;
        awardService.getPageAwards(_ts_common_utils__WEBPACK_IMPORTED_MODULE_4__["Utils"].filterConditions(queryForm.value), awardPageResult.page, awardPageResult.limit)
            .subscribe({
            next(result) {
                self.isLoading = false;
                self.awardPageResult = result;
            },
            error(err) {
                self.isLoading = false;
                message.error(err);
            }
        });
    }
    queryAwards() {
        if (!this.queryForm.valid) {
            for (const i in this.queryForm.controls) {
                this.queryForm.controls[i].markAsDirty();
                this.queryForm.controls[i].updateValueAndValidity();
            }
            return;
        }
        this.fetchPageAwards();
    }
    addAward() {
        this.type = _ts_common_enums__WEBPACK_IMPORTED_MODULE_5__["OperateType"].Add;
        this.currentAward = undefined;
        this.isVisible = true;
    }
    editAward(award) {
        this.type = _ts_common_enums__WEBPACK_IMPORTED_MODULE_5__["OperateType"].Edit;
        this.currentAward = award;
        this.isVisible = true;
    }
    removeAward(id) {
        const self = this;
        const { modal, message, awardService } = self;
        modal.confirm({
            nzTitle: "确定要删除此奖品吗？",
            nzOnOk() {
                awardService.removeAward(id)
                    .subscribe({
                    next(result) {
                        if (!result)
                            message.error("删除失败");
                        else
                            self.fetchPageAwards();
                    },
                    error(err) {
                        message.error(err);
                    }
                });
            }
        });
    }
    handleModalCancel() {
        this.isVisible = false;
    }
    handleModalOk(award) {
        const self = this;
        const { message, awardService, awardPageResult, type } = self;
        if (type === _ts_common_enums__WEBPACK_IMPORTED_MODULE_5__["OperateType"].Add) {
            awardService.addAward(award.name, award.type)
                .subscribe({
                next() {
                    self.fetchPageAwards();
                    self.isVisible = false;
                },
                error(err) {
                    message.error(err);
                    self.isVisible = false;
                }
            });
        }
        else if (type === _ts_common_enums__WEBPACK_IMPORTED_MODULE_5__["OperateType"].Edit) {
            awardService.updateAward({ _id: award._id, name: award.name, type: award.type })
                .subscribe({
                next(data) {
                    // let awards = awardPageResult.docs;
                    // awards.forEach((award: AwardDocument) => {
                    //     if (award._id === data._id) {
                    //         for (let key in data) {
                    //             let value = data[key];
                    //             if (key !== "_id") {
                    //                 award[key] = value;
                    //             }
                    //         }
                    //     }
                    // });
                    // self.awardPageResult["docs"] = awards;
                    self.fetchPageAwards();
                    self.isVisible = false;
                },
                error(err) {
                    message.error(err);
                    self.isVisible = false;
                }
            });
        }
    }
};
AwardComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
    { type: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__["NzModalService"] },
    { type: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__["NzMessageService"] },
    { type: _ts_services__WEBPACK_IMPORTED_MODULE_7__["AwardService"] }
];
AwardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-award",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./award.component.html */ "./node_modules/_raw-loader@3.1.0@raw-loader/dist/cjs.js!./src/app/pages/award/award.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./award.component.less */ "./src/app/pages/award/award.component.less")).default]
    })
], AwardComponent);



/***/ }),

/***/ "./src/app/pages/login/login.component.less":
/*!**************************************************!*\
  !*** ./src/app/pages/login/login.component.less ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (":host {\n  width: 100%;\n  min-height: 100%;\n  background-color: #f5f5f5;\n}\n:host nz-layout {\n  width: 100%;\n  min-height: 100%;\n}\n:host nz-layout .login-main {\n  margin-top: 128px;\n  border: 1px solid lightcyan;\n  border-radius: 6px;\n  box-shadow: 0 0 8px lightgray;\n  background-color: white;\n}\n:host nz-layout .login-main .login-title {\n  padding: 48px 0 24px;\n  font-size: 20px;\n  text-align: center;\n}\n:host nz-layout .login-main .login-form {\n  margin: auto;\n  max-width: 300px;\n}\n:host nz-layout .login-main .login-form .btn-login {\n  width: 100%;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvbG9naW4vQzovY29kZS8yMDE5L2hmY2F0di1hY3Rpdml0eS9oZmNhdHYtYWN0aXZpdHktYWRtaW4vc3JjL2FwcC9wYWdlcy9sb2dpbi9sb2dpbi5jb21wb25lbnQubGVzcyIsInNyYy9hcHAvcGFnZXMvbG9naW4vbG9naW4uY29tcG9uZW50Lmxlc3MiLCJzcmMvYXBwL3BhZ2VzL2xvZ2luL0M6L2NvZGUvMjAxOS9oZmNhdHYtYWN0aXZpdHkvaGZjYXR2LWFjdGl2aXR5LWFkbWluL3NyYy9sZXNzL21peGlucy5sZXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBO0VBQ0ksV0FBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7QUNGSjtBRERBO0VBTVEsV0FBQTtFQUNBLGdCQUFBO0FDRlI7QURMQTtFQVVZLGlCQUFBO0VBQ0EsMkJBQUE7RUFDQSxrQkFBQTtFRWNSLDZCQUFBO0VGWlEsdUJBQUE7QUNBWjtBRGRBO0VBaUJnQixvQkFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtBQ0FoQjtBRG5CQTtFQXVCZ0IsWUFBQTtFQUNBLGdCQUFBO0FDRGhCO0FEdkJBO0VBMkJvQixXQUFBO0FDRHBCIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvbG9naW4vbG9naW4uY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IFwiLi4vLi4vLi4vbGVzcy92YXJzLmxlc3NcIjtcbkBpbXBvcnQgXCIuLi8uLi8uLi9sZXNzL21peGlucy5sZXNzXCI7XG5cbjpob3N0IHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtaW4taGVpZ2h0OiAxMDAlO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XG5cbiAgICBuei1sYXlvdXQge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgbWluLWhlaWdodDogMTAwJTtcblxuICAgICAgICAubG9naW4tbWFpbiB7XG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAxMjhweDtcbiAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Y3lhbjtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICAgICAgICAgIC5ib3gtc2hhZG93KDAgMCA4cHggbGlnaHRncmF5KTtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuXG4gICAgICAgICAgICAubG9naW4tdGl0bGUge1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDQ4cHggMCAyNHB4O1xuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICAgICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5sb2dpbi1mb3JtIHtcbiAgICAgICAgICAgICAgICBtYXJnaW46IGF1dG87XG4gICAgICAgICAgICAgICAgbWF4LXdpZHRoOiAzMDBweDtcblxuICAgICAgICAgICAgICAgIC5idG4tbG9naW4ge1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCI6aG9zdCB7XG4gIHdpZHRoOiAxMDAlO1xuICBtaW4taGVpZ2h0OiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xufVxuOmhvc3QgbnotbGF5b3V0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDEwMCU7XG59XG46aG9zdCBuei1sYXlvdXQgLmxvZ2luLW1haW4ge1xuICBtYXJnaW4tdG9wOiAxMjhweDtcbiAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRjeWFuO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIC13ZWJraXQtYm94LXNoYWRvdzogMCAwIDhweCBsaWdodGdyYXk7XG4gIC1tb3otYm94LXNoYWRvdzogMCAwIDhweCBsaWdodGdyYXk7XG4gIGJveC1zaGFkb3c6IDAgMCA4cHggbGlnaHRncmF5O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cbjpob3N0IG56LWxheW91dCAubG9naW4tbWFpbiAubG9naW4tdGl0bGUge1xuICBwYWRkaW5nOiA0OHB4IDAgMjRweDtcbiAgZm9udC1zaXplOiAyMHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG46aG9zdCBuei1sYXlvdXQgLmxvZ2luLW1haW4gLmxvZ2luLWZvcm0ge1xuICBtYXJnaW46IGF1dG87XG4gIG1heC13aWR0aDogMzAwcHg7XG59XG46aG9zdCBuei1sYXlvdXQgLmxvZ2luLW1haW4gLmxvZ2luLWZvcm0gLmJ0bi1sb2dpbiB7XG4gIHdpZHRoOiAxMDAlO1xufVxuIiwiLy8g5Y+C5pWw5re35YWl77ya5a2X5L2T5qC35byPXG4uZm9udC1zdHlsZXMgKEBmb250LXNpemU6IDE0cHgsIEBmb250LXdlaWdodDogbm9ybWFsLCBAbGluZS1oZWlnaHQ6IDEuNSwgQGNvbG9yOiAjMzMzLCBAdGV4dC1hbGlnbjogbGVmdCkge1xuICAgIGZvbnQtc2l6ZTogQGZvbnQtc2l6ZTtcbiAgICBmb250LXdlaWdodDogQGZvbnQtd2VpZ2h0O1xuICAgIGxpbmUtaGVpZ2h0OiBAbGluZS1oZWlnaHQ7XG4gICAgY29sb3I6IEBjb2xvcjtcbiAgICB0ZXh0LWFsaWduOiBAdGV4dC1hbGlnbjtcbn1cblxuLy8g5Y+C5pWw5re35YWl77ya5paH5pys5YaF5a656L+H6ZW/5pi+56S655yB55Wl5Y+3XG4udGV4dC1lbGxpcHNlKEB3aWR0aCkge1xuICAgIHdpZHRoOiBAd2lkdGg7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIC1tcy10ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbn1cblxuLy8g5Y+C5pWw5re35YWl77ya55uS5qih5Z6L6K6h566X6KeE5YiZXG4uYm94LXNpemluZyhAYm94LXNpemluZzogYm9yZGVyLWJveCkge1xuICAgIC13ZWJraXQtYm94LXNpemluZzogQGJveC1zaXppbmc7XG4gICAgLW1vei1ib3gtc2l6aW5nOiBAYm94LXNpemluZztcbiAgICBib3gtc2l6aW5nOiBAYm94LXNpemluZztcbn1cblxuLy8g5Y+C5pWw5re35YWl77ya5aSW6Zi05b2x5pWI5p6cXG4uYm94LXNoYWRvdyhAc2hhZG93KSB7XG4gICAgLXdlYmtpdC1ib3gtc2hhZG93OiBAc2hhZG93O1xuICAgIC1tb3otYm94LXNoYWRvdzogQHNoYWRvdztcbiAgICBib3gtc2hhZG93OiBAc2hhZG93O1xufVxuXG4vLyDlj4LmlbDmt7flhaXvvJrov4fmuKHmlYjmnpxcbi50cmFuc2l0aW9uKC4uLikge1xuICAgIEBwcm9wczogfmBcIkB7YXJndW1lbnRzfVwiLnJlcGxhY2UoL1tcXFtcXF1dL2csICcnKWA7XG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiBAcHJvcHM7XG4gICAgLW1vei10cmFuc2l0aW9uOiBAcHJvcHM7XG4gICAgLW1zLXRyYW5zaXRpb246IEBwcm9wcztcbiAgICAtby10cmFuc2l0aW9uOiBAcHJvcHM7XG4gICAgdHJhbnNpdGlvbjogQHByb3BzO1xufVxuXG4vLyDlj4LmlbDmt7flhaXvvJrovazmjaLmlYjmnpxcbi50cmFuc2Zvcm0oQHRyYW5zZm9ybSkge1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBAdHJhbnNmb3JtO1xuICAgIC1tb3otdHJhbnNmb3JtOiBAdHJhbnNmb3JtO1xuICAgIC1tcy10cmFuc2Zvcm06IEB0cmFuc2Zvcm07XG4gICAgLW8tdHJhbnNmb3JtOiBAdHJhbnNmb3JtO1xuICAgIHRyYW5zZm9ybTogQHRyYW5zZm9ybTtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/pages/login/login.component.ts":
/*!************************************************!*\
  !*** ./src/app/pages/login/login.component.ts ***!
  \************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/_tslib@1.10.0@tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/_@angular_core@8.2.8@@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/_@angular_router@8.2.8@@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/_@angular_forms@8.2.8@@angular/forms/fesm2015/forms.js");
/* harmony import */ var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng-zorro-antd */ "./node_modules/_ng-zorro-antd@8.3.1@ng-zorro-antd/fesm2015/ng-zorro-antd.js");
/* harmony import */ var _ts_services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../ts/services */ "./src/ts/services/index.ts");
/* harmony import */ var _ts_helpers_token_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../ts/helpers/token.helper */ "./src/ts/helpers/token.helper.ts");
/* harmony import */ var _ts_common_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../ts/common/utils */ "./src/ts/common/utils.ts");








let LoginComponent = class LoginComponent {
    constructor(router, formBuilder, message, managerService) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.message = message;
        this.managerService = managerService;
    }
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required),
            remember: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](true)
        });
    }
    login(formData) {
        if (!this.loginForm.valid) {
            for (const i in this.loginForm.controls) {
                this.loginForm.controls[i].markAsDirty();
                this.loginForm.controls[i].updateValueAndValidity();
            }
            return;
        }
        const { router, message, managerService } = this;
        let msgDf = message.loading("登录中……");
        managerService.login(formData.username, formData.password)
            .subscribe({
            next(token) {
                if (!token) {
                    message.remove(msgDf.messageId);
                    message.error("登录失败");
                }
                else {
                    let redirectUrl = managerService.redirectUrl ?
                        router.parseUrl(managerService.redirectUrl) : "/award";
                    setTimeout(() => {
                        message.remove(msgDf.messageId);
                        router.navigateByUrl(redirectUrl);
                        _ts_helpers_token_helper__WEBPACK_IMPORTED_MODULE_6__["default"].setVirtualPath(_ts_common_utils__WEBPACK_IMPORTED_MODULE_7__["Utils"].resolveVirtualPath("/login"));
                    }, 1000);
                }
            },
            error(err) {
                message.remove(msgDf.messageId);
                message.error(err);
            }
        });
    }
};
LoginComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
    { type: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_4__["NzMessageService"] },
    { type: _ts_services__WEBPACK_IMPORTED_MODULE_5__["ManagerService"] }
];
LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-login",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./login.component.html */ "./node_modules/_raw-loader@3.1.0@raw-loader/dist/cjs.js!./src/app/pages/login/login.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./login.component.less */ "./src/app/pages/login/login.component.less")).default]
    })
], LoginComponent);



/***/ }),

/***/ "./src/app/pages/lotto/lotto.component.less":
/*!**************************************************!*\
  !*** ./src/app/pages/lotto/lotto.component.less ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (":host {\n  width: 100%;\n  min-height: 100%;\n}\n:host nz-select {\n  width: 120px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvbG90dG8vQzovY29kZS8yMDE5L2hmY2F0di1hY3Rpdml0eS9oZmNhdHYtYWN0aXZpdHktYWRtaW4vc3JjL2FwcC9wYWdlcy9sb3R0by9sb3R0by5jb21wb25lbnQubGVzcyIsInNyYy9hcHAvcGFnZXMvbG90dG8vbG90dG8uY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxXQUFBO0VBQ0EsZ0JBQUE7QUNDSjtBREhBO0VBS1EsWUFBQTtBQ0NSIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvbG90dG8vbG90dG8uY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWluLWhlaWdodDogMTAwJTtcblxuICAgIG56LXNlbGVjdCB7XG4gICAgICAgIHdpZHRoOiAxMjBweDtcbiAgICB9XG59XG4iLCI6aG9zdCB7XG4gIHdpZHRoOiAxMDAlO1xuICBtaW4taGVpZ2h0OiAxMDAlO1xufVxuOmhvc3Qgbnotc2VsZWN0IHtcbiAgd2lkdGg6IDEyMHB4O1xufVxuIl19 */");

/***/ }),

/***/ "./src/app/pages/lotto/lotto.component.ts":
/*!************************************************!*\
  !*** ./src/app/pages/lotto/lotto.component.ts ***!
  \************************************************/
/*! exports provided: LottoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LottoComponent", function() { return LottoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/_tslib@1.10.0@tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/_@angular_core@8.2.8@@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/_@angular_forms@8.2.8@@angular/forms/fesm2015/forms.js");
/* harmony import */ var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-zorro-antd */ "./node_modules/_ng-zorro-antd@8.3.1@ng-zorro-antd/fesm2015/ng-zorro-antd.js");
/* harmony import */ var _ts_common_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../ts/common/utils */ "./src/ts/common/utils.ts");
/* harmony import */ var _ts_common_names__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../ts/common/names */ "./src/ts/common/names.ts");
/* harmony import */ var _ts_services__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../ts/services */ "./src/ts/services/index.ts");







let LottoComponent = class LottoComponent {
    constructor(formBuilder, modal, message, lottoService) {
        this.formBuilder = formBuilder;
        this.modal = modal;
        this.message = message;
        this.lottoService = lottoService;
        this.AwardTypes = _ts_common_names__WEBPACK_IMPORTED_MODULE_5__["AwardTypes"];
        this.AwardRanks = _ts_common_names__WEBPACK_IMPORTED_MODULE_5__["AwardRanks"];
        this.ActivityStatuses = _ts_common_names__WEBPACK_IMPORTED_MODULE_5__["ActivityStatuses"];
        this.RedPacketStatusMap = _ts_common_names__WEBPACK_IMPORTED_MODULE_5__["RedPacketStatusMap"];
        this.GoodsStatusMap = _ts_common_names__WEBPACK_IMPORTED_MODULE_5__["GoodsStatusMap"];
        this.isLoading = false;
        this.lottoPageResult = {
            docs: [],
            total: 0,
            page: 1,
            limit: 10
        };
        this.queryForm = this.formBuilder.group({
            nickname: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null),
            title: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null),
            type: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null),
            status: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null)
        });
    }
    ngOnInit() {
        this.fetchPageLottos();
    }
    fetchPageLottos(key, $event) {
        const self = this;
        if (key && $event) {
            self.lottoPageResult[key] = $event;
        }
        const { message, lottoService, queryForm, lottoPageResult } = self;
        self.isLoading = true;
        queryForm.value["status"] = Number(queryForm.value.status);
        lottoService.getPageLottos(_ts_common_utils__WEBPACK_IMPORTED_MODULE_4__["Utils"].filterConditions(queryForm.value, false), lottoPageResult.page, lottoPageResult.limit)
            .subscribe({
            next(result) {
                self.isLoading = false;
                self.lottoPageResult = result;
            },
            error(err) {
                self.isLoading = false;
                message.error(err);
            }
        });
    }
    queryLottos() {
        if (!this.queryForm.valid) {
            for (const i in this.queryForm.controls) {
                this.queryForm.controls[i].markAsDirty();
                this.queryForm.controls[i].updateValueAndValidity();
            }
            return;
        }
        this.fetchPageLottos();
    }
    setStatus(id, status) {
        const self = this;
        const { message, lottoService } = self;
        lottoService.setStatus(id, status)
            .subscribe({
            next(data) {
                // let attachInfo: any = data.attachInfo || {},
                //     lottos = lottoPageResult.docs;
                // lottos.forEach((lotto: LottoDocument<any, AwardVO>) => {
                //     if (lotto._id === data._id) {
                //         lotto.attachInfo["status"] = attachInfo.status;
                //     }
                // });
                // self.lottoPageResult["docs"] = lottos;
                self.fetchPageLottos();
            },
            error(err) {
                message.error(err);
            }
        });
    }
};
LottoComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
    { type: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__["NzModalService"] },
    { type: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__["NzMessageService"] },
    { type: _ts_services__WEBPACK_IMPORTED_MODULE_6__["LottoService"] }
];
LottoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-lotto",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./lotto.component.html */ "./node_modules/_raw-loader@3.1.0@raw-loader/dist/cjs.js!./src/app/pages/lotto/lotto.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./lotto.component.less */ "./src/app/pages/lotto/lotto.component.less")).default]
    })
], LottoComponent);



/***/ }),

/***/ "./src/app/pages/manager/manager.component.less":
/*!******************************************************!*\
  !*** ./src/app/pages/manager/manager.component.less ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (":host {\n  width: 100%;\n  min-height: 100%;\n}\n:host .manager-form {\n  margin: 80px auto;\n  width: 360px;\n}\n:host .manager-form .btn-modify {\n  display: block;\n  width: 100%;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvbWFuYWdlci9DOi9jb2RlLzIwMTkvaGZjYXR2LWFjdGl2aXR5L2hmY2F0di1hY3Rpdml0eS1hZG1pbi9zcmMvYXBwL3BhZ2VzL21hbmFnZXIvbWFuYWdlci5jb21wb25lbnQubGVzcyIsInNyYy9hcHAvcGFnZXMvbWFuYWdlci9tYW5hZ2VyLmNvbXBvbmVudC5sZXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksV0FBQTtFQUNBLGdCQUFBO0FDQ0o7QURIQTtFQUtRLGlCQUFBO0VBQ0EsWUFBQTtBQ0NSO0FEUEE7RUFTWSxjQUFBO0VBQ0EsV0FBQTtBQ0NaIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvbWFuYWdlci9tYW5hZ2VyLmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XG5cbiAgICAubWFuYWdlci1mb3JtIHtcbiAgICAgICAgbWFyZ2luOiA4MHB4IGF1dG87XG4gICAgICAgIHdpZHRoOiAzNjBweDtcblxuICAgICAgICAuYnRuLW1vZGlmeSB7XG4gICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgbWluLWhlaWdodDogMTAwJTtcbn1cbjpob3N0IC5tYW5hZ2VyLWZvcm0ge1xuICBtYXJnaW46IDgwcHggYXV0bztcbiAgd2lkdGg6IDM2MHB4O1xufVxuOmhvc3QgLm1hbmFnZXItZm9ybSAuYnRuLW1vZGlmeSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbn1cbiJdfQ== */");

/***/ }),

/***/ "./src/app/pages/manager/manager.component.ts":
/*!****************************************************!*\
  !*** ./src/app/pages/manager/manager.component.ts ***!
  \****************************************************/
/*! exports provided: ManagerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagerComponent", function() { return ManagerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/_tslib@1.10.0@tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/_@angular_core@8.2.8@@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/_@angular_router@8.2.8@@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/_@angular_forms@8.2.8@@angular/forms/fesm2015/forms.js");
/* harmony import */ var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng-zorro-antd */ "./node_modules/_ng-zorro-antd@8.3.1@ng-zorro-antd/fesm2015/ng-zorro-antd.js");
/* harmony import */ var _ts_services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../ts/services */ "./src/ts/services/index.ts");






let ManagerComponent = class ManagerComponent {
    constructor(router, formBuilder, message, managerService) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.message = message;
        this.managerService = managerService;
    }
    ngOnInit() {
        this.managerForm = this.formBuilder.group({
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required),
            confirmPassword: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required)
        });
    }
    modifyPassword(formData) {
        if (!this.managerForm.valid) {
            for (const i in this.managerForm.controls) {
                this.managerForm.controls[i].markAsDirty();
                this.managerForm.controls[i].updateValueAndValidity();
            }
            return;
        }
        const { router, message, managerService } = this;
        const { password, confirmPassword } = formData;
        if (password !== confirmPassword) {
            message.warning("两次密码不一致");
            return;
        }
        let msgDf = message.loading("密码修改中……");
        managerService.setPassword(password)
            .subscribe({
            next(result) {
                if (!result) {
                    message.remove(msgDf.messageId);
                    message.error("密码修改失败");
                }
                else {
                    setTimeout(() => {
                        message.remove(msgDf.messageId);
                        message.success("密码修改成功，请重新登录");
                        router.navigateByUrl("/login");
                    }, 1688);
                }
            },
            error(err) {
                message.remove(msgDf.messageId);
                message.error(err);
            }
        });
    }
};
ManagerComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
    { type: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_4__["NzMessageService"] },
    { type: _ts_services__WEBPACK_IMPORTED_MODULE_5__["ManagerService"] }
];
ManagerComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-manager",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./manager.component.html */ "./node_modules/_raw-loader@3.1.0@raw-loader/dist/cjs.js!./src/app/pages/manager/manager.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./manager.component.less */ "./src/app/pages/manager/manager.component.less")).default]
    })
], ManagerComponent);



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/_tslib@1.10.0@tslib/tslib.es6.js");
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const environment = {
    production: false,
    apiUrl: "http://localhost"
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/_tslib@1.10.0@tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/_@angular_core@8.2.8@@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/_@angular_platform-browser-dynamic@8.2.8@@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "./src/ts/common/constants.ts":
/*!************************************!*\
  !*** ./src/ts/common/constants.ts ***!
  \************************************/
/*! exports provided: Constants */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Constants", function() { return Constants; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/_tslib@1.10.0@tslib/tslib.es6.js");

const Constants = {
    TOKEN: "TOKEN",
    TOKEN_EXPIRE_TIME: 24 * 3600 * 1000,
    VIRTUAL_PATH: "VIRTUAL_PATH"
};


/***/ }),

/***/ "./src/ts/common/enums.ts":
/*!********************************!*\
  !*** ./src/ts/common/enums.ts ***!
  \********************************/
/*! exports provided: AwardType, AwardRank, ActivityStatus, RedPacketStatus, GoodsStatus, OperateType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AwardType", function() { return AwardType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AwardRank", function() { return AwardRank; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivityStatus", function() { return ActivityStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RedPacketStatus", function() { return RedPacketStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoodsStatus", function() { return GoodsStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OperateType", function() { return OperateType; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/_tslib@1.10.0@tslib/tslib.es6.js");

/**
 * 奖品类型
 */
var AwardType;
(function (AwardType) {
    AwardType[AwardType["Nothing"] = 0] = "Nothing";
    AwardType[AwardType["MemberCard"] = 1] = "MemberCard";
    AwardType[AwardType["RedPacket"] = 2] = "RedPacket";
    AwardType[AwardType["Goods"] = 3] = "Goods"; // 物品
})(AwardType || (AwardType = {}));
/**
 * 奖品等级
 */
var AwardRank;
(function (AwardRank) {
    AwardRank[AwardRank["Zero"] = 0] = "Zero";
    AwardRank[AwardRank["First"] = 1] = "First";
    AwardRank[AwardRank["Second"] = 2] = "Second";
    AwardRank[AwardRank["Third"] = 3] = "Third";
    AwardRank[AwardRank["Four"] = 4] = "Four";
    AwardRank[AwardRank["Five"] = 5] = "Five"; // 五等奖
})(AwardRank || (AwardRank = {}));
/**
 * 活动状态
 */
var ActivityStatus;
(function (ActivityStatus) {
    ActivityStatus[ActivityStatus["UnStarted"] = 0] = "UnStarted";
    ActivityStatus[ActivityStatus["Processing"] = 1] = "Processing";
    ActivityStatus[ActivityStatus["Finished"] = 2] = "Finished"; // 已结束
})(ActivityStatus || (ActivityStatus = {}));
/**
 * 红包状态
 */
var RedPacketStatus;
(function (RedPacketStatus) {
    RedPacketStatus[RedPacketStatus["SendFailed"] = -3] = "SendFailed";
    RedPacketStatus[RedPacketStatus["Expired"] = -2] = "Expired";
    RedPacketStatus[RedPacketStatus["Rejected"] = -1] = "Rejected";
    RedPacketStatus[RedPacketStatus["UnReceived"] = 0] = "UnReceived";
    RedPacketStatus[RedPacketStatus["UnSended"] = 1] = "UnSended";
    RedPacketStatus[RedPacketStatus["Received"] = 2] = "Received"; // 已领取
})(RedPacketStatus || (RedPacketStatus = {}));
/**
 * 物品状态
 */
var GoodsStatus;
(function (GoodsStatus) {
    GoodsStatus[GoodsStatus["SendFailed"] = -3] = "SendFailed";
    GoodsStatus[GoodsStatus["Expired"] = -2] = "Expired";
    GoodsStatus[GoodsStatus["Rejected"] = -1] = "Rejected";
    GoodsStatus[GoodsStatus["UnReceived"] = 0] = "UnReceived";
    GoodsStatus[GoodsStatus["UnSended"] = 1] = "UnSended";
    GoodsStatus[GoodsStatus["Sending"] = 2] = "Sending";
    GoodsStatus[GoodsStatus["Received"] = 3] = "Received"; // 已收货
})(GoodsStatus || (GoodsStatus = {}));
/**
 * 操作类型
 */
var OperateType;
(function (OperateType) {
    OperateType[OperateType["Add"] = 0] = "Add";
    OperateType[OperateType["Edit"] = 1] = "Edit";
})(OperateType || (OperateType = {}));


/***/ }),

/***/ "./src/ts/common/names.ts":
/*!********************************!*\
  !*** ./src/ts/common/names.ts ***!
  \********************************/
/*! exports provided: AwardTypes, AwardRanks, ActivityStatuses, RedPacketStatusMap, GoodsStatusMap, OperateTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AwardTypes", function() { return AwardTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AwardRanks", function() { return AwardRanks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivityStatuses", function() { return ActivityStatuses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RedPacketStatusMap", function() { return RedPacketStatusMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoodsStatusMap", function() { return GoodsStatusMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OperateTypes", function() { return OperateTypes; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/_tslib@1.10.0@tslib/tslib.es6.js");

const AwardTypes = ["参与奖", "会员卡", "红包", "物品"];
const AwardRanks = ["参与奖", "一等奖", "二等奖", "三等奖", "四等奖", "五等奖"];
const ActivityStatuses = ["未开始", "进行中", "已结束"];
const RedPacketStatusMap = {
    "-3": "发放失败",
    "-2": "已过期",
    "-1": "已驳回",
    "0": "未领取",
    "1": "待发放",
    "2": "已发放"
};
const GoodsStatusMap = {
    "-3": "发货失败",
    "-2": "已过期",
    "-1": "已驳回",
    "0": "未领取",
    "1": "待发货",
    "2": "发货中",
    "3": "已收货"
};
const OperateTypes = ["添加", "编辑"];


/***/ }),

/***/ "./src/ts/common/urls.ts":
/*!*******************************!*\
  !*** ./src/ts/common/urls.ts ***!
  \*******************************/
/*! exports provided: Urls */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Urls", function() { return Urls; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/_tslib@1.10.0@tslib/tslib.es6.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");


const apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].apiUrl;
console.log("environment.apiUrl:", apiUrl);
const Urls = {
    account: {
        login: `${apiUrl}/admin/account/login`,
        logout: `${apiUrl}/admin/account/logout`,
        setPassword: `${apiUrl}/admin/account/setPassword`
    },
    token: {
        status: `${apiUrl}/admin/token/status`,
        refresh: `${apiUrl}/admin/token/refresh`
    },
    award: {
        list: `${apiUrl}/admin/award/list`,
        add: `${apiUrl}/admin/award/add`,
        update: `${apiUrl}/admin/award/update`,
        remove: `${apiUrl}/admin/award/remove`
    },
    activity: {
        list: `${apiUrl}/admin/activity/list`,
        add: `${apiUrl}/admin/activity/add`,
        update: `${apiUrl}/admin/activity/update`,
        remove: `${apiUrl}/admin/activity/remove`
    },
    lotto: {
        list: `${apiUrl}/admin/lotto/list`,
        setStatus: `${apiUrl}/admin/lotto/setStatus`
    }
};


/***/ }),

/***/ "./src/ts/common/utils.ts":
/*!********************************!*\
  !*** ./src/ts/common/utils.ts ***!
  \********************************/
/*! exports provided: Utils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Utils", function() { return Utils; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/_tslib@1.10.0@tslib/tslib.es6.js");

// 判断是不是日期字符串
function isDateString(str) {
    return !isNaN(Date.parse(str));
}
// 判断是不是空对象
function isEmptyObject(obj) {
    return !obj || JSON.stringify(obj) === "{}";
}
// 日期替换函数，返回yyyy/MM/dd hh:mm格式日期
function dateReplace(date) {
    if (!date)
        return "";
    return date.replace(/-/g, "/");
}
// 日期转换函数
function dateConvert(date) {
    if (!date)
        return null;
    let result = new Date();
    if (typeof date === "string") {
        if (date.indexOf("-") > -1)
            result = new Date(dateReplace(date));
        else
            result = new Date(date);
    }
    else if (typeof date === "number")
        result = new Date(date);
    else if (date instanceof Date)
        result = date;
    else
        result = new Date(date);
    return result;
}
// 日期格式化函数，返回一个自定义格式日期
function dateFormat(date, format = "yyyy-MM-dd hh:mm", isZeroize = true) {
    let cdate = dateConvert(date);
    if (!cdate)
        return "";
    let dy = cdate.getFullYear(), dM = cdate.getMonth() + 1, dd = cdate.getDate(), dh = cdate.getHours(), dm = cdate.getMinutes(), ds = cdate.getSeconds(), dS = cdate.getMilliseconds(), config = {
        "y+": dy.toString(),
        "M+": !isZeroize ? dM.toString() : dM < 10 ? "0" + dM.toString() : dM.toString(),
        "d+": !isZeroize ? dd.toString() : dd < 10 ? "0" + dd.toString() : dd.toString(),
        "h+": !isZeroize ? dh.toString() : dh < 10 ? "0" + dh.toString() : dh.toString(),
        "m+": !isZeroize ? dm.toString() : dm < 10 ? "0" + dm.toString() : dm.toString(),
        "s+": !isZeroize ? ds.toString() : ds < 10 ? "0" + ds.toString() : ds.toString(),
        "S": dS.toString()
    };
    for (let key in config) {
        let pattern = new RegExp(key);
        if (!pattern.test(format))
            continue;
        let matches = format.match(pattern);
        if (!matches)
            continue;
        let first = matches[0], value = config[key];
        if (key === "S")
            format = format.replace(first, value);
        else
            format = format.replace(first, value.substr(value.length - first.length));
    }
    return format;
}
// 日期凌晨化函数，返回一个日期的凌晨时间
function dateMorning(date) {
    let cdate = dateConvert(date) || new Date(), year = cdate.getFullYear(), month = cdate.getMonth(), day = cdate.getDate();
    return new Date(year, month, day);
}
// 日期星期几函数，返回周期几
function dateWeek(date, type) {
    let cdate = dateConvert(date) || new Date();
    if (type === "星期") {
        return "星期" + "日一二三四五六".charAt(cdate.getDay());
    }
    return "周" + "日一二三四五六".charAt(cdate.getDay());
}
// 日期换行函数
function dateLine(date) {
    if (typeof date == "number" && date <= 0)
        return "--";
    if (!date)
        return "--";
    let cdate = Utils.dateFormat(date), parts = cdate.split(" ");
    return parts.join("<br/>");
}
// 日期计算函数，返回一个计算后的新日期
function dateCalculate(date, type = "y", value = 0) {
    let result = 0, clone = new Date(date.getTime());
    switch (type) {
        case "y":
            result = clone.setFullYear(clone.getFullYear() + value);
            break;
        case "M":
            result = clone.setMonth(clone.getMonth() + value);
            break;
        case "d":
            result = clone.setDate(clone.getDate() + value);
            break;
        case "h":
            result = clone.setHours(clone.getHours() + value);
            break;
        case "m":
            result = clone.setMinutes(clone.getMinutes() + value);
            break;
        case "s":
            result = clone.setSeconds(clone.getSeconds() + value);
            break;
        case "S":
            result = clone.setMilliseconds(clone.getMilliseconds() + value);
            break;
    }
    return new Date(result);
}
// 数组去重函数，返回一个去重的新数组
function arrayDistinct(arrs, key = "") {
    if (arrs.length <= 0)
        return [];
    let temp = {}, result = [];
    for (let i = 0; i < arrs.length; i++) {
        let item = arrs[i], value = key ? item[key] : JSON.stringify(item);
        if (!temp[value]) {
            result.push(item);
            temp[value] = true;
        }
    }
    return result;
}
// 数组排序，返回一个排序后的新数组
function arraySort(arrs, field = "", isAsc = false) {
    if (arrs.length <= 0)
        return [];
    if (!field)
        return arrs;
    arrs.sort((m, n) => {
        let v1 = field ? m[field] : m, v2 = field ? n[field] : n;
        if (v1 > v2)
            return isAsc ? 1 : -1;
        else if (v1 < v2)
            return isAsc ? -1 : 1;
        else
            return 0;
    });
    return arrs;
}
// 获取对象key集合
function getAllKeys(data) {
    data = data || {};
    let keys = [];
    for (let key in data) {
        keys.push(key);
    }
    return keys;
}
// 获取对象第一个key
function getFirstKey(data) {
    data = data || {};
    let firstKey = "";
    for (let key in data) {
        firstKey = key;
        break;
    }
    return firstKey;
}
// 获取对象第一个value
function getFirstValue(data) {
    data = data || {};
    let firstValue = "";
    for (let key in data) {
        firstValue = data[key];
        break;
    }
    return firstValue;
}
// json字符串转换函数
function parseJSON(value = "") {
    try {
        return (JSON.parse(value));
    }
    catch (e) {
        throw e;
    }
}
// 简易的对象副本函数
function duplicate(data) {
    return parseJSON(JSON.stringify(data));
}
// 查询参数字符串
function buildParams(data) {
    if (JSON.stringify(data) === "{}")
        return "";
    let temp = [];
    for (let key in data) {
        let value = data[key];
        temp.push(`${key}=${String(value)}`);
    }
    return temp.join("&");
}
// 补零数字
function zeroizeDigit(digit) {
    return digit >= 0 && digit < 10 ? `0${String(digit)}` : String(digit);
}
// 取整
function getIntpart(data) {
    let str = String(data), position = str.indexOf(".");
    return position > -1 ? Number(str.substring(0, position)) : data;
}
// 转换百分比
function convertPercent(data) {
    return Number((data * 100).toFixed(2));
}
// 打印错误
function printError(err, flag, isAlert = false) {
    console.log(`${flag} err:`, typeof err, err);
    isAlert && alert(`${flag} err:` + JSON.stringify(err, null, 2));
}
// 解析虚拟路径
function resolveVirtualPath(path) {
    let pathname = window.location.pathname;
    return pathname.substring(0, pathname.indexOf(path)) || "";
}
// 过滤筛选条件
function filterConditions(conditions, isFuzzy = true) {
    if (!conditions)
        return {};
    let result = {};
    for (let key in conditions) {
        let value = conditions[key];
        if (value !== undefined && value !== null && value !== "") {
            if (isFuzzy) {
                result[key] = typeof value === "string" ? { $regex: value } : value;
            }
            else {
                result[key] = value;
            }
        }
    }
    return result;
}
// 过滤更新数据
function filterUpdate(update, hasId = true) {
    if (!update)
        return {};
    !hasId && (delete update._id);
    delete update.createTime;
    delete update.updateTime;
    delete update._v;
    return update;
}
const Utils = {
    isDateString,
    isEmptyObject,
    dateReplace,
    dateConvert,
    dateFormat,
    dateMorning,
    dateWeek,
    dateLine,
    dateCalculate,
    arrayDistinct,
    arraySort,
    getAllKeys,
    getFirstKey,
    getFirstValue,
    parseJSON,
    duplicate,
    buildParams,
    zeroizeDigit,
    getIntpart,
    convertPercent,
    printError,
    resolveVirtualPath,
    filterConditions,
    filterUpdate,
};


/***/ }),

/***/ "./src/ts/helpers/activity.helper.ts":
/*!*******************************************!*\
  !*** ./src/ts/helpers/activity.helper.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ActivityHelper; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/_tslib@1.10.0@tslib/tslib.es6.js");
/* harmony import */ var _common_enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/enums */ "./src/ts/common/enums.ts");


class ActivityHelper {
    static getActivityStatus(startTime, endTime) {
        let sms = startTime.getTime(), ems = endTime.getTime(), nms = new Date().getTime();
        if (nms < sms)
            return _common_enums__WEBPACK_IMPORTED_MODULE_1__["ActivityStatus"].UnStarted;
        else if (nms >= sms && nms < ems)
            return _common_enums__WEBPACK_IMPORTED_MODULE_1__["ActivityStatus"].Processing;
        else
            return _common_enums__WEBPACK_IMPORTED_MODULE_1__["ActivityStatus"].Finished;
    }
}
;


/***/ }),

/***/ "./src/ts/helpers/index.ts":
/*!*********************************!*\
  !*** ./src/ts/helpers/index.ts ***!
  \*********************************/
/*! exports provided: TokenHelper, ActivityHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/_tslib@1.10.0@tslib/tslib.es6.js");
/* harmony import */ var _token_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./token.helper */ "./src/ts/helpers/token.helper.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TokenHelper", function() { return _token_helper__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _activity_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./activity.helper */ "./src/ts/helpers/activity.helper.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ActivityHelper", function() { return _activity_helper__WEBPACK_IMPORTED_MODULE_2__["default"]; });







/***/ }),

/***/ "./src/ts/helpers/token.helper.ts":
/*!****************************************!*\
  !*** ./src/ts/helpers/token.helper.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TokenHelper; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/_tslib@1.10.0@tslib/tslib.es6.js");
/* harmony import */ var jts_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jts-storage */ "./node_modules/_jts-storage@1.0.0@jts-storage/dist/index.js");
/* harmony import */ var jts_storage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jts_storage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var js_base64__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! js-base64 */ "./node_modules/_js-base64@2.5.1@js-base64/base64.js");
/* harmony import */ var js_base64__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(js_base64__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/constants */ "./src/ts/common/constants.ts");




class TokenHelper {
    static setToken(token) {
        return jts_storage__WEBPACK_IMPORTED_MODULE_1__["LocalStorage"].setItem(_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].TOKEN, token, _common_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].TOKEN_EXPIRE_TIME);
    }
    static getToken() {
        return jts_storage__WEBPACK_IMPORTED_MODULE_1__["LocalStorage"].getItem(_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].TOKEN) || "";
    }
    static removeToken() {
        return jts_storage__WEBPACK_IMPORTED_MODULE_1__["LocalStorage"].removeItem(_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].TOKEN);
    }
    static getManagerInfo() {
        let token = jts_storage__WEBPACK_IMPORTED_MODULE_1__["LocalStorage"].getItem(_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].TOKEN) || "";
        if (!token)
            return null;
        let parts = token.split(".");
        if (parts.length !== 3)
            return null;
        try {
            let payload = JSON.parse(js_base64__WEBPACK_IMPORTED_MODULE_2__["Base64"].decode(parts[1])) || {};
            return payload.data || null;
        }
        catch (err) {
            return null;
        }
    }
    static setVirtualPath(token) {
        return jts_storage__WEBPACK_IMPORTED_MODULE_1__["LocalStorage"].setItem(_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].VIRTUAL_PATH, token, _common_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].TOKEN_EXPIRE_TIME);
    }
    static getVirtualPath() {
        return jts_storage__WEBPACK_IMPORTED_MODULE_1__["LocalStorage"].getItem(_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].VIRTUAL_PATH) || "";
    }
    static removeVirtualPath() {
        return jts_storage__WEBPACK_IMPORTED_MODULE_1__["LocalStorage"].removeItem(_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].VIRTUAL_PATH);
    }
}


/***/ }),

/***/ "./src/ts/services/activity.service.ts":
/*!*********************************************!*\
  !*** ./src/ts/services/activity.service.ts ***!
  \*********************************************/
/*! exports provided: ActivityService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivityService", function() { return ActivityService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/_tslib@1.10.0@tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/_@angular_core@8.2.8@@angular/core/fesm2015/core.js");
/* harmony import */ var _common_urls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/urls */ "./src/ts/common/urls.ts");
/* harmony import */ var _http_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./http.service */ "./src/ts/services/http.service.ts");




let ActivityService = class ActivityService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    getPageActivities(conditions, page, limit) {
        return this.httpService
            .post(`${_common_urls__WEBPACK_IMPORTED_MODULE_2__["Urls"].activity.list}/${page}/${limit}`, conditions);
    }
    addActivity(data) {
        return this.httpService
            .post(_common_urls__WEBPACK_IMPORTED_MODULE_2__["Urls"].activity.add, data);
    }
    updateActivity(data) {
        return this.httpService
            .post(_common_urls__WEBPACK_IMPORTED_MODULE_2__["Urls"].activity.update, data);
    }
    removeActivity(id) {
        return this.httpService
            .post(_common_urls__WEBPACK_IMPORTED_MODULE_2__["Urls"].activity.remove, { id: id });
    }
};
ActivityService.ctorParameters = () => [
    { type: _http_service__WEBPACK_IMPORTED_MODULE_3__["default"] }
];
ActivityService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: "root"
    })
], ActivityService);



/***/ }),

/***/ "./src/ts/services/award.service.ts":
/*!******************************************!*\
  !*** ./src/ts/services/award.service.ts ***!
  \******************************************/
/*! exports provided: AwardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AwardService", function() { return AwardService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/_tslib@1.10.0@tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/_@angular_core@8.2.8@@angular/core/fesm2015/core.js");
/* harmony import */ var _common_urls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/urls */ "./src/ts/common/urls.ts");
/* harmony import */ var _http_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./http.service */ "./src/ts/services/http.service.ts");




let AwardService = class AwardService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    getAwards() {
        return this.httpService.get(_common_urls__WEBPACK_IMPORTED_MODULE_2__["Urls"].award.list);
    }
    getPageAwards(conditions, page, limit) {
        return this.httpService.post(`${_common_urls__WEBPACK_IMPORTED_MODULE_2__["Urls"].award.list}/${page}/${limit}`, conditions);
    }
    addAward(name, type) {
        return this.httpService.post(_common_urls__WEBPACK_IMPORTED_MODULE_2__["Urls"].award.add, { name: name, type: type });
    }
    updateAward(data) {
        return this.httpService.post(_common_urls__WEBPACK_IMPORTED_MODULE_2__["Urls"].award.update, data);
    }
    removeAward(id) {
        return this.httpService.post(_common_urls__WEBPACK_IMPORTED_MODULE_2__["Urls"].award.remove, { id: id });
    }
};
AwardService.ctorParameters = () => [
    { type: _http_service__WEBPACK_IMPORTED_MODULE_3__["default"] }
];
AwardService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: "root"
    })
], AwardService);



/***/ }),

/***/ "./src/ts/services/http.service.ts":
/*!*****************************************!*\
  !*** ./src/ts/services/http.service.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/_tslib@1.10.0@tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/_@angular_core@8.2.8@@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/_@angular_common@8.2.8@@angular/common/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/_rxjs@6.4.0@rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/_rxjs@6.4.0@rxjs/_esm2015/operators/index.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers */ "./src/ts/helpers/index.ts");






let HttpService = class HttpService {
    constructor(http) {
        this.http = http;
    }
    setHeaders() {
        let token = _helpers__WEBPACK_IMPORTED_MODULE_5__["TokenHelper"].getToken(), headers = { "Content-Type": "application/json" };
        if (token) {
            headers["Authorization"] = token ? `Bearer ${token}` : "";
        }
        console.log("HTTP Authorization:", token, headers);
        return { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"](headers) };
    }
    handleResponse(res) {
        console.log("HTTP res:", typeof res, res);
        let result = res, code = result.code;
        if (code === 200)
            return result.data;
        if (code === 401) {
            window.location.href = `${_helpers__WEBPACK_IMPORTED_MODULE_5__["TokenHelper"].getVirtualPath()}/login`;
            _helpers__WEBPACK_IMPORTED_MODULE_5__["TokenHelper"].removeToken();
            _helpers__WEBPACK_IMPORTED_MODULE_5__["TokenHelper"].removeVirtualPath();
        }
        throw new Error(result.message);
    }
    handleError(error) {
        console.log("HTTP error:", error);
        let message = error.message;
        if (error.error instanceof ErrorEvent) {
            message = error.error.message;
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])(message);
    }
    get(url) {
        console.log("GET args:", url);
        return this.http.get(url, this.setHeaders()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((res) => this.handleResponse(res)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(this.handleError));
    }
    post(url, data) {
        console.log("POST args:", url, data);
        return this.http.post(url, data, this.setHeaders()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((res) => this.handleResponse(res)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(this.handleError));
    }
};
HttpService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
HttpService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: "root"
    })
], HttpService);
/* harmony default export */ __webpack_exports__["default"] = (HttpService);


/***/ }),

/***/ "./src/ts/services/index.ts":
/*!**********************************!*\
  !*** ./src/ts/services/index.ts ***!
  \**********************************/
/*! exports provided: ManagerService, AwardService, ActivityService, LottoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/_tslib@1.10.0@tslib/tslib.es6.js");
/* harmony import */ var _manager_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./manager.service */ "./src/ts/services/manager.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ManagerService", function() { return _manager_service__WEBPACK_IMPORTED_MODULE_1__["ManagerService"]; });

/* harmony import */ var _award_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./award.service */ "./src/ts/services/award.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AwardService", function() { return _award_service__WEBPACK_IMPORTED_MODULE_2__["AwardService"]; });

/* harmony import */ var _activity_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./activity.service */ "./src/ts/services/activity.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ActivityService", function() { return _activity_service__WEBPACK_IMPORTED_MODULE_3__["ActivityService"]; });

/* harmony import */ var _lotto_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lotto.service */ "./src/ts/services/lotto.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LottoService", function() { return _lotto_service__WEBPACK_IMPORTED_MODULE_4__["LottoService"]; });









/***/ }),

/***/ "./src/ts/services/lotto.service.ts":
/*!******************************************!*\
  !*** ./src/ts/services/lotto.service.ts ***!
  \******************************************/
/*! exports provided: LottoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LottoService", function() { return LottoService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/_tslib@1.10.0@tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/_@angular_core@8.2.8@@angular/core/fesm2015/core.js");
/* harmony import */ var _common_urls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/urls */ "./src/ts/common/urls.ts");
/* harmony import */ var _http_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./http.service */ "./src/ts/services/http.service.ts");




let LottoService = class LottoService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    getPageLottos(conditions, page, limit) {
        return this.httpService
            .post(`${_common_urls__WEBPACK_IMPORTED_MODULE_2__["Urls"].lotto.list}/${page}/${limit}`, conditions);
    }
    setStatus(id, status) {
        return this.httpService
            .post(_common_urls__WEBPACK_IMPORTED_MODULE_2__["Urls"].lotto.setStatus, { id: id, status: status });
    }
};
LottoService.ctorParameters = () => [
    { type: _http_service__WEBPACK_IMPORTED_MODULE_3__["default"] }
];
LottoService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: "root"
    })
], LottoService);



/***/ }),

/***/ "./src/ts/services/manager.service.ts":
/*!********************************************!*\
  !*** ./src/ts/services/manager.service.ts ***!
  \********************************************/
/*! exports provided: ManagerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagerService", function() { return ManagerService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/_tslib@1.10.0@tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/_@angular_core@8.2.8@@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/_rxjs@6.4.0@rxjs/_esm2015/operators/index.js");
/* harmony import */ var _common_urls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/urls */ "./src/ts/common/urls.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers */ "./src/ts/helpers/index.ts");
/* harmony import */ var _http_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./http.service */ "./src/ts/services/http.service.ts");






let ManagerService = class ManagerService {
    constructor(httpService) {
        this.httpService = httpService;
        this.loginStatus = !!_helpers__WEBPACK_IMPORTED_MODULE_4__["TokenHelper"].getToken();
        this.redirectUrl = "";
    }
    login(username, password) {
        return this.httpService.post(_common_urls__WEBPACK_IMPORTED_MODULE_3__["Urls"].account.login, { username: username, password: password })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((token) => {
            if (token) {
                this.loginStatus = true;
                _helpers__WEBPACK_IMPORTED_MODULE_4__["TokenHelper"].setToken(token);
            }
            return token;
        }));
    }
    logout() {
        return this.httpService.get(_common_urls__WEBPACK_IMPORTED_MODULE_3__["Urls"].account.logout)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((data) => {
            if (data) {
                this.loginStatus = false;
                _helpers__WEBPACK_IMPORTED_MODULE_4__["TokenHelper"].removeToken();
            }
            return data;
        }));
    }
    setPassword(password) {
        return this.httpService.post(_common_urls__WEBPACK_IMPORTED_MODULE_3__["Urls"].account.setPassword, { password: password })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((data) => {
            if (data) {
                this.loginStatus = false;
                _helpers__WEBPACK_IMPORTED_MODULE_4__["TokenHelper"].removeToken();
            }
            return data;
        }));
    }
    getTokenStatus() {
        return this.httpService.get(_common_urls__WEBPACK_IMPORTED_MODULE_3__["Urls"].token.status);
    }
    refreshTokenStatus() {
        return this.httpService.get(_common_urls__WEBPACK_IMPORTED_MODULE_3__["Urls"].token.refresh)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((token) => {
            if (token) {
                this.loginStatus = true;
                _helpers__WEBPACK_IMPORTED_MODULE_4__["TokenHelper"].setToken(token);
            }
            return token;
        }));
    }
};
ManagerService.ctorParameters = () => [
    { type: _http_service__WEBPACK_IMPORTED_MODULE_5__["default"] }
];
ManagerService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: "root"
    })
], ManagerService);



/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\code\2019\hfcatv-activity\hfcatv-activity-admin\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map