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
var rxjs_1 = require("rxjs");
var moment = require("moment");
var day_detail_component_1 = require("./day-detail.component");
var WeekView = (function () {
    function WeekView() {
        this.addAppointment = new core_1.EventEmitter();
        this.updateAppointment = new core_1.EventEmitter();
        this.removeAppointment = new core_1.EventEmitter();
        this.subscriptions = [];
    }
    WeekView.prototype.tracker = function (index) {
        return index;
    };
    WeekView.prototype.ngOnInit = function () {
        var _this = this;
        this.days$ = this.overview$.map(function (overview) {
            return _this.emptyDaysWithAppointments.map(function (dayWithAppointments) {
                return overview.daysWithAppointments.filter(function (item) {
                    return item.day.day === dayWithAppointments.day.day;
                })[0] || dayWithAppointments;
            });
        });
        this.subscriptions.push(this.week$.subscribe(function (week) {
            _this.emptyDaysWithAppointments = _this.getDefaultDaysWithAppointments(week);
        }));
    };
    WeekView.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    WeekView.prototype.getDefaultDaysWithAppointments = function (week) {
        var days = [];
        var momentWeek = moment().year(week.year).week(week.week);
        for (var i = 0; i < 7; i++) {
            var sunday = momentWeek.startOf("week");
            var date = sunday.add(i, "days");
            days.push({ day: { year: date.year(), month: date.month(), day: date.date() }, appointments: [] });
        }
        return days;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', rxjs_1.Observable)
    ], WeekView.prototype, "overview$", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', rxjs_1.Observable)
    ], WeekView.prototype, "week$", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], WeekView.prototype, "addAppointment", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], WeekView.prototype, "updateAppointment", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], WeekView.prototype, "removeAppointment", void 0);
    WeekView = __decorate([
        core_1.Component({
            selector: "week-view",
            directives: [day_detail_component_1.DayDetail],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n        <h1>Overview of week: {{(overview$|async)?.week}}/{{(overview$|async)?.year}}</h1>\n\n        <table class=\"table\">\n            <thead>\n                <tr>\n                    <th>Sunday</th>\n                    <th>Monday</th>\n                    <th>Tuesday</th>\n                    <th>Wednesday</th>\n                    <th>Thursday</th>\n                    <th>Friday</th>\n                    <th>Saturday</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr>\n                    <td *ngFor=\"let day of days$|async; trackBy tracker\">\n                        <day-detail *ngIf=\"day\" [dayWithAppointments]=\"day\"\n                            (addAppointment)=\"addAppointment.emit($event)\" (updateAppointment)=\"updateAppointment.emit($event)\"\n                            (removeAppointment)=\"removeAppointment.emit($event)\">\n                        </day-detail>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], WeekView);
    return WeekView;
}());
exports.WeekView = WeekView;
//# sourceMappingURL=week-view.component.js.map