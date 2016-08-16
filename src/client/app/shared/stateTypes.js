"use strict";
var _ = require("lodash");
var MonthOverview = (function () {
    function MonthOverview(year, month, daysWithAppointments) {
        this.year = year;
        this.month = month;
        this.daysWithAppointments = daysWithAppointments;
    }
    return MonthOverview;
}());
exports.MonthOverview = MonthOverview;
var WeekOverview = (function () {
    function WeekOverview(year, week, daysWithAppointments) {
        this.year = year;
        this.week = week;
        this.daysWithAppointments = daysWithAppointments;
    }
    return WeekOverview;
}());
exports.WeekOverview = WeekOverview;
var Appointment = (function () {
    function Appointment(date, description) {
        this.date = date;
        this.description = description;
        this.id = _.uniqueId();
    }
    return Appointment;
}());
exports.Appointment = Appointment;
var DayWithAppointments = (function () {
    function DayWithAppointments(day, appointments) {
        this.day = day;
        this.appointments = appointments;
    }
    return DayWithAppointments;
}());
exports.DayWithAppointments = DayWithAppointments;
//# sourceMappingURL=stateTypes.js.map