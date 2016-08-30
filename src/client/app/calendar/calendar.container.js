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
var month_view_component_1 = require("./month-view.component");
var stateTypes_1 = require("../shared/stateTypes");
var rxjs_1 = require("rxjs");
var moment = require("moment");
var week_view_component_1 = require("./week-view.component");
var day_view_component_1 = require("./day-view.component");
var calendar_model_1 = require("./calendar.model");
var Calendar = (function () {
    function Calendar(model) {
        this.model = model;
        this.selectedMonth$ = this.model.selectedMonth$;
        this.selectedDay$ = this.model.selectedDay$;
        this.selectedWeek$ = this.model.selectedWeek$;
        this.allMonthOverviews$ = this.model.allMonthOverviews$;
        this.viewMode$ = this.model.viewMode$;
        this.currentMonthOverview$ = rxjs_1.Observable.combineLatest(this.allMonthOverviews$, this.selectedMonth$, function (monthOverviews, selectedMonth) {
            return monthOverviews.filter(function (monthOverview) {
                return monthOverview.month === selectedMonth.month && monthOverview.year === selectedMonth.year;
            })[0];
        });
        this.currentWeekOverview$ = rxjs_1.Observable.combineLatest(this.allMonthOverviews$, this.selectedWeek$, function (monthOverviews, selectedWeek) {
            var daysWithAppointments = [];
            var weekMoment = moment().year(selectedWeek.year).week(selectedWeek.week);
            monthOverviews.forEach(function (overview) {
                var matchingDays = overview.daysWithAppointments.filter(function (day) {
                    var dayMoment = moment().year(day.day.year).month(day.day.month).date(day.day.day);
                    return dayMoment > weekMoment.startOf("week") && dayMoment < weekMoment.endOf("week");
                });
                daysWithAppointments.push.apply(daysWithAppointments, matchingDays);
            });
            return new stateTypes_1.WeekOverview(selectedWeek.year, selectedWeek.week, daysWithAppointments);
        });
        this.dayOverview$ = rxjs_1.Observable.combineLatest(this.allMonthOverviews$, this.selectedDay$, function (monthOverviews, selectedDay) {
            var dayWithAppointments = { day: selectedDay, appointments: [] };
            monthOverviews.forEach(function (overview) {
                dayWithAppointments = overview.daysWithAppointments.filter(function (day) {
                    return day.day.day === selectedDay.day && day.day.month === selectedDay.month
                        && day.day.year === selectedDay.year;
                })[0] || dayWithAppointments;
            });
            return dayWithAppointments;
        });
    }
    Calendar.prototype.ngOnInit = function () {
        this.model.resetCalendar();
    };
    Calendar.prototype.previous = function () {
        this.model.previous();
    };
    Calendar.prototype.next = function () {
        this.model.next();
    };
    Calendar.prototype.setViewMode = function (viewMode) {
        this.model.setViewMode(viewMode);
    };
    Calendar.prototype.addAppointment = function (appointment) {
        this.model.addAppointment(appointment);
    };
    Calendar.prototype.removeAppointment = function (appointment) {
        this.model.removeAppointment(appointment);
    };
    Calendar.prototype.updateAppointment = function (appointment) {
        this.model.updateAppointment(appointment);
    };
    Calendar = __decorate([
        core_1.Component({
            selector: "calendar",
            providers: [calendar_model_1.CalendarModel],
            directives: [month_view_component_1.MonthView, week_view_component_1.WeekView, day_view_component_1.DayView],
            template: "\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-sm-12\">\n                <button class=\"class btn btn-default\" (click)=\"previous()\"><i class=\"fa fa-chevron-left\"></i></button>\n                <button class=\"class btn btn-default\" (click)=\"next()\"><i class=\"fa fa-chevron-right\"></i></button>\n                <button class=\"btn btn-default\" (click)=\"setViewMode(0)\">Day</button>\n                <button class=\"btn btn-default\" (click)=\"setViewMode(1)\">Week</button>\n                <button class=\"btn btn-default\" (click)=\"setViewMode(2)\">Month</button>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-sm-12\">\n                <month-view *ngIf=\"(viewMode$|async) === 2\" [overview$]=\"currentMonthOverview$\" [month$]=\"selectedMonth$\" \n                    (addAppointment)=\"addAppointment($event)\" (removeAppointment)=\"removeAppointment($event)\" \n                    (updateAppointment)=\"updateAppointment($event)\"></month-view>\n                <week-view *ngIf=\"(viewMode$|async) === 1\" [overview$]=\"currentWeekOverview$\" [week$]=\"selectedWeek$\"\n                    (addAppointment)=\"addAppointment($event)\" (removeAppointment)=\"removeAppointment($event)\" \n                    (updateAppointment)=\"updateAppointment($event)\"></week-view>\n                <day-view *ngIf=\"(viewMode$|async) === 0\" [day]=\"dayOverview$|async\"\n                    (addAppointment)=\"addAppointment($event)\" (removeAppointment)=\"removeAppointment($event)\" \n                    (updateAppointment)=\"updateAppointment($event)\"></day-view>\n            </div>\n        </div>\n    </div>\n    "
        }), 
        __metadata('design:paramtypes', [calendar_model_1.CalendarModel])
    ], Calendar);
    return Calendar;
}());
exports.Calendar = Calendar;
//# sourceMappingURL=calendar.container.js.map