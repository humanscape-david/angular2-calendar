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
var store_1 = require("@ngrx/store");
var actions_1 = require("../shared/actions");
var moment = require("moment");
var enums_1 = require("../shared/enums");
var CalendarModel = (function () {
    function CalendarModel(store) {
        this.store = store;
        this.allMonthOverviews$ = this.store.select(function (state) { return state.data.monthOverviews; });
        this.selectedMonth$ = this.store.select(function (state) { return state.application.selectedMonth; });
        this.selectedDay$ = this.store.select(function (state) { return state.application.selectedDay; });
        this.selectedWeek$ = this.store.select(function (state) { return state.application.selectedWeek; });
        this.viewMode$ = this.store.select(function (state) { return state.application.viewMode; });
    }
    CalendarModel.prototype.resetCalendar = function () {
        var time = moment();
        this.store.dispatch(actions_1.setSelectedMonth(time.month(), time.year()));
        this.store.dispatch(actions_1.setSelectedWeek(time.week(), time.year()));
        this.store.dispatch(actions_1.setSelectedDay(time.date(), time.month(), time.year()));
    };
    CalendarModel.prototype.previous = function () {
        var viewMode = this.store.getState().application.viewMode;
        var calculatedTime;
        switch (viewMode) {
            case enums_1.ViewMode.Month:
                var curMonth = this.store.getState().application.selectedMonth;
                calculatedTime = moment().year(curMonth.year).month(curMonth.month).add(-1, "months");
                this.store.dispatch(actions_1.setSelectedMonth(calculatedTime.month(), calculatedTime.year()));
                break;
            case enums_1.ViewMode.Week:
                var curWeek = this.store.getState().application.selectedWeek;
                calculatedTime = moment().year(curWeek.year).week(curWeek.week).startOf("week").add(-1, "weeks");
                this.store.dispatch(actions_1.setSelectedWeek(calculatedTime.week(), calculatedTime.year()));
                break;
            case enums_1.ViewMode.Day:
                var curDay = this.store.getState().application.selectedDay;
                calculatedTime = moment().year(curDay.year).month(curDay.month).date(curDay.day).add(-1, "days");
                this.store.dispatch(actions_1.setSelectedDay(calculatedTime.date(), calculatedTime.month(), calculatedTime.year()));
                break;
            default:
                break;
        }
    };
    CalendarModel.prototype.next = function () {
        var viewMode = this.store.getState().application.viewMode;
        switch (viewMode) {
            case enums_1.ViewMode.Month:
                var curMonth = this.store.getState().application.selectedMonth;
                var calculatedTime = moment().year(curMonth.year).month(curMonth.month).add(1, "months");
                this.store.dispatch(actions_1.setSelectedMonth(calculatedTime.month(), calculatedTime.year()));
                break;
            case enums_1.ViewMode.Week:
                var curWeek = this.store.getState().application.selectedWeek;
                calculatedTime = moment().year(curWeek.year).week(curWeek.week).startOf("week").add(1, "weeks");
                this.store.dispatch(actions_1.setSelectedWeek(calculatedTime.week(), calculatedTime.year()));
                break;
            case enums_1.ViewMode.Day:
                var curDay = this.store.getState().application.selectedDay;
                calculatedTime = moment().year(curDay.year).month(curDay.month).date(curDay.day).add(1, "days");
                this.store.dispatch(actions_1.setSelectedDay(calculatedTime.date(), calculatedTime.month(), calculatedTime.year()));
                break;
            default:
                break;
        }
    };
    CalendarModel.prototype.setViewMode = function (viewMode) {
        this.store.dispatch(actions_1.setViewMode(viewMode));
    };
    CalendarModel.prototype.addAppointment = function (appointment) {
        var appointmentMoment = moment(appointment.date);
        var day = { year: appointmentMoment.year(), month: appointmentMoment.month(), day: appointmentMoment.date() };
        this.store.dispatch(actions_1.addAppointment(appointment, day));
    };
    CalendarModel.prototype.removeAppointment = function (appointment) {
        var appointmentMoment = moment(appointment.date);
        var day = { year: appointmentMoment.year(), month: appointmentMoment.month(), day: appointmentMoment.date() };
        this.store.dispatch(actions_1.removeAppointment(appointment.id, day));
    };
    CalendarModel.prototype.updateAppointment = function (appointment) {
        var appointmentMoment = moment(appointment.date);
        var day = { year: appointmentMoment.year(), month: appointmentMoment.month(), day: appointmentMoment.date() };
        this.store.dispatch(actions_1.updateAppointment(appointment, day));
    };
    CalendarModel = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [store_1.Store])
    ], CalendarModel);
    return CalendarModel;
}());
exports.CalendarModel = CalendarModel;
//# sourceMappingURL=calendar.model.js.map