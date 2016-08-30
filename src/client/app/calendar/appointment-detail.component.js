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
var common_1 = require("@angular/common");
var stateTypes_1 = require("../shared/stateTypes");
var moment = require("moment");
var AppointmentDetail = (function () {
    function AppointmentDetail() {
        this.update = new core_1.EventEmitter();
        this.editControl = new common_1.Control("description");
        this.editMode = false;
        this.description = "";
        this.hours = [];
        for (var i = 0; i < 24; i++) {
            this.hours.push(moment().hours(i).minutes(0).format("HH:mm"));
            this.hours.push(moment().hours(i).minutes(30).format("HH:mm"));
            this.selectedHour = this.hours[0];
        }
    }
    AppointmentDetail.prototype.enableEditMode = function () {
        this.editMode = true;
    };
    AppointmentDetail.prototype.onSave = function () {
        this.editMode = false;
        var splitted = this.selectedHour.split(":");
        var date = moment(this.appointment.date).hours(Number(splitted[0])).minutes(Number(splitted[1])).toDate();
        var freshAppointment = Object.assign({}, this.appointment, { description: this.description, date: date });
        this.update.emit(freshAppointment);
    };
    AppointmentDetail.prototype.onCancel = function () {
        this.editMode = false;
        this.description = this.appointment.description;
        this.selectedHour = moment(this.appointment.date).format("HH:mm");
    };
    AppointmentDetail.prototype.ngOnChanges = function () {
        this.description = this.appointment.description;
        this.selectedHour = moment(this.appointment.date).format("HH:mm");
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', stateTypes_1.Appointment)
    ], AppointmentDetail.prototype, "appointment", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AppointmentDetail.prototype, "update", void 0);
    AppointmentDetail = __decorate([
        core_1.Component({
            selector: "appointment-detail",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n        <div *ngIf=\"!editMode\" (click)=\"enableEditMode()\">\n            {{appointment.description}} {{appointment.date|date: \"hh:mm\"}}\n        </div>\n        <input *ngIf=\"editMode\" autofocus class=\"form-control\" type=\"text\" [(ngModel)]=\"description\"/>\n        <select name=\"\" class=\"form-control\" *ngIf=\"editMode\" [(ngModel)]=\"selectedHour\">\n            <option value=\"{{hour}}\" *ngFor=\"let hour of hours\">{{hour}}</option>\n        </select>\n        <br/>\n        <div *ngIf=\"editMode\" class=\"btn-group\">\n            <button class=\"btn btn-default\" (click)=\"onCancel()\"><i class=\"fa fa-undo\"></i></button>\n            <button class=\"btn btn-primary\" (click)=\"onSave()\"><i class=\"fa fa-save\"></i></button>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], AppointmentDetail);
    return AppointmentDetail;
}());
exports.AppointmentDetail = AppointmentDetail;
//# sourceMappingURL=appointment-detail.component.js.map