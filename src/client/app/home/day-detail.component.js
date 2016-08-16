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
var stateTypes_1 = require("../shared/stateTypes");
var moment = require("moment");
var appointment_detail_component_1 = require("./appointment-detail.component");
var DayDetail = (function () {
    function DayDetail() {
        this.addAppointment = new core_1.EventEmitter();
        this.updateAppointment = new core_1.EventEmitter();
        this.removeAppointment = new core_1.EventEmitter();
    }
    DayDetail.prototype.onAdd = function () {
        var fakeDate = moment().year(this.dayWithAppointments.day.year).month(this.dayWithAppointments.day.month)
            .date(this.dayWithAppointments.day.day).hours(0).minutes(0);
        this.addAppointment.emit(new stateTypes_1.Appointment(fakeDate.toDate(), ""));
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', stateTypes_1.DayWithAppointments)
    ], DayDetail.prototype, "dayWithAppointments", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DayDetail.prototype, "addAppointment", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DayDetail.prototype, "updateAppointment", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DayDetail.prototype, "removeAppointment", void 0);
    DayDetail = __decorate([
        core_1.Component({
            selector: "day-detail",
            directives: [appointment_detail_component_1.AppointmentDetail],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n        <table class=\"table table-striped\">\n            <thead>\n                <tr>\n                    <td>{{dayWithAppointments.day.day}}\n                        <span class=\"label label-success pull-right\" *ngIf=\"dayWithAppointments.appointments.length === 0\">Free</span>\n                        <span class=\"label label-danger pull-right\" *ngIf=\"dayWithAppointments.appointments.length > 0\">Occupied</span>\n                    </td>\n                    <td>\n                        <button class=\"btn btn-block btn-sm btn-default\" (click)=\"onAdd()\"><i class=\"fa fa-plus-circle\"></i></button>\n                    </td>\n                </tr>\n            </thead>\n            <tbody>\n                <tr *ngFor=\"let appointment of dayWithAppointments.appointments\">\n                    <td>\n                        <appointment-detail [appointment]=\"appointment\" (remove)=\"removeAppointment.emit($event)\" \n                        (update)=\"updateAppointment.emit($event)\"></appointment-detail>\n                    </td>\n                    <td>\n                        <button class=\"btn btn-danger\" (click)=\"removeAppointment.emit(appointment)\"><i class=\"fa fa-trash-o\"></i></button>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], DayDetail);
    return DayDetail;
}());
exports.DayDetail = DayDetail;
//# sourceMappingURL=day-detail.component.js.map