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
var day_detail_component_1 = require("./home/day-detail.component");
var rxjs_1 = require("rxjs");
var moment = require("moment");
var _ = require("lodash");
var AppComponent = (function () {
    function AppComponent() {
        this.addAppointment = new core_1.EventEmitter();
        this.updateAppointment = new core_1.EventEmitter();
        this.removeAppointment = new core_1.EventEmitter();
        this.subscriptions = [];
    }
    AppComponent.prototype.tracker = function (index) {
        return index;
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.formattedMonth$ = this.month$.map(function (month) { return moment().year(month.year).month(month.month).format("MMM YYYY"); });
        var daysWithAppointments$ = this.overview$.map(function (curMonthOverview) {
            if (!curMonthOverview) {
                return _this.emptyDaysWithAppointments;
            }
            return _this.emptyDaysWithAppointments.map(function (dayWithAppointments) {
                return curMonthOverview.daysWithAppointments.filter(function (item) {
                    return item.day.day === dayWithAppointments.day.day;
                })[0] || dayWithAppointments;
            });
        });
        this.weeks$ = daysWithAppointments$.map(function (days) {
            var res = _.groupBy(days, (function (item) { return moment().year(item.day.year).month(item.day.month).date(item.day.day).week(); }));
            var groupedByWeek = Object.keys(res).map(function (key) { return res[key]; });
            return groupedByWeek.map(function (items) { return _this.fulfillWeek(items); });
        });
        this.subscriptions.push(this.month$.subscribe(function (month) {
            _this.emptyDaysWithAppointments = _this.getDefaultDaysWithAppointments(month);
        }));
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    AppComponent.prototype.getDefaultDaysWithAppointments = function (month) {
        var dayOne = moment().year(month.year).month(month.month).date(1);
        var days = [];
        for (var i = 0; i < dayOne.daysInMonth(); i++) {
            days.push({ day: { year: month.year, month: month.month, day: i + 1 }, appointments: [] });
        }
        return days;
    };
    AppComponent.prototype.fulfillWeek = function (days) {
        var week = [null, null, null, null, null, null, null];
        days.forEach(function (day) {
            var momentDay = moment().year(day.day.year).month(day.day.month).date(day.day.day);
            week[momentDay.weekday()] = day;
        });
        return week;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', rxjs_1.Observable)
    ], AppComponent.prototype, "overview$", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', rxjs_1.Observable)
    ], AppComponent.prototype, "month$", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AppComponent.prototype, "addAppointment", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AppComponent.prototype, "updateAppointment", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AppComponent.prototype, "removeAppointment", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'angular2-calendar',
            directives: [day_detail_component_1.DayDetail],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            templateUrl: 'src/client/app/app.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map