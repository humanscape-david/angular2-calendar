"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_deprecated_1 = require("@angular/router-deprecated");
var calendar_container_1 = require("./calendar/calendar.container");
var jake_container_1 = require("./jake/jake.container");
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: "angular2-calendar",
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, calendar_container_1.Calendar],
            template: "\n        <router-outlet></router-outlet>\n    "
        }),
        router_deprecated_1.RouteConfig([
            { path: "/", name: "Root", redirectTo: ["Calendar"] },
            { path: "/calendar", name: "Calendar", component: calendar_container_1.Calendar },
            { path: "/jake", name: "Jake", component: jake_container_1.Jake }
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map