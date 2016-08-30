"use strict";
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var http_1 = require("@angular/http");
var router_deprecated_1 = require("@angular/router-deprecated");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
require("rxjs/add/operator/do");
var app_component_1 = require("./app.component");
var store_2 = require("./store");
var actionLog = function (action) {
    return action.do(function (val) {
        console.warn("DISPATCHED ACTION: ", val);
    });
};
var stateLog = function (state) {
    return state.do(function (val) {
        console.info("NEW STATE: ", val);
    });
};
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    router_deprecated_1.ROUTER_PROVIDERS,
    http_1.HTTP_PROVIDERS,
    core_1.provide(common_1.APP_BASE_HREF, { useValue: "/" }),
    core_1.provide(common_1.LocationStrategy, { useClass: common_1.HashLocationStrategy }),
    store_1.provideStore(store_2.store),
    store_1.usePreMiddleware(actionLog),
    store_1.usePostMiddleware(stateLog)
]);
//# sourceMappingURL=index.js.map