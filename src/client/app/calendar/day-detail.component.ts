import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from "@angular/core";
import {Appointment, DayWithAppointments} from "../shared/stateTypes";
import * as  moment from "moment";
import {AppointmentDetail} from "./appointment-detail.component";
@Component({
    selector: "day-detail",
    directives: [AppointmentDetail],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <table class="table table-striped" (drop)="drop($event)" (dragover)="allowDrop($event)">
            <thead>
                <tr>
                    <td>{{dayWithAppointments.day.day}}
                        <span class="label label-success pull-right" *ngIf="dayWithAppointments.appointments.length === 0">Free</span>
                        <span class="label label-danger pull-right" *ngIf="dayWithAppointments.appointments.length > 0">Occupied</span>
                    </td>
                    <td>
                        <button class="btn btn-block btn-sm btn-default" (click)="onAdd()">+</button>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let appointment of dayWithAppointments.appointments" draggable="true" (dragstart)="drag($event)">
                    <td>
                        <appointment-detail [appointment]="appointment" (remove)="removeAppointment.emit($event)" 
                        (update)="updateAppointment.emit($event)"></appointment-detail>
                    </td>
                    <td>
                        <button class="btn btn-danger" (click)="removeAppointment.emit(appointment)">-</button>
                    </td>
                </tr>
            </tbody>
        </table>
    `
})
export class DayDetail {
    @Input() public dayWithAppointments: DayWithAppointments;

    @Output() public addAppointment = new EventEmitter<Appointment>();
    @Output() public updateAppointment = new EventEmitter<Appointment>();
    @Output() public removeAppointment = new EventEmitter<Appointment>();

    allowDrop = function(ev) {
    ev.preventDefault();
    }

    drag = function(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    drop = function(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }
    public onAdd(): void {
        let fakeDate = moment().year(this.dayWithAppointments.day.year).month(this.dayWithAppointments.day.month)
            .date(this.dayWithAppointments.day.day).hours(0).minutes(0);
        this.addAppointment.emit(new Appointment(fakeDate.toDate(), ""));
    }

    constructor() {
    }
}