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
var day_detail_component_1 = require("./day-detail.component");
var DayView = (function () {
    function DayView() {
        this.addAppointment = new core_1.EventEmitter();
        this.updateAppointment = new core_1.EventEmitter();
        this.removeAppointment = new core_1.EventEmitter();
    }
    DayView.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', stateTypes_1.DayWithAppointments)
    ], DayView.prototype, "day", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DayView.prototype, "addAppointment", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DayView.prototype, "updateAppointment", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DayView.prototype, "removeAppointment", void 0);
    DayView = __decorate([
        core_1.Component({
            selector: "day-view",
            directives: [day_detail_component_1.DayDetail],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n       <h1>Overview of day: {{day.day.day}}-{{day.day.month +1 }}-{{day.day.year}}</h1>\n       <day-detail *ngIf=\"day\" [dayWithAppointments]=\"day\"\n                            (addAppointment)=\"addAppointment.emit($event)\" (updateAppointment)=\"updateAppointment.emit($event)\"\n                            (removeAppointment)=\"removeAppointment.emit($event)\">\n       </day-detail>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], DayView);
    return DayView;
}());
exports.DayView = DayView;
//# sourceMappingURL=day-view.component.js.map