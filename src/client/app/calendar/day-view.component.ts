import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit} from "@angular/core";
import {Appointment, DayWithAppointments} from "../shared/stateTypes";
import {DayDetail} from "./day-detail.component";

@Component({
    selector: "day-view",
    directives: [DayDetail],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
       <h1>Overview of day: {{day.day.day}}-{{day.day.month +1 }}-{{day.day.year}}</h1>
       <day-detail *ngIf="day" [dayWithAppointments]="day"
                            (addAppointment)="addAppointment.emit($event)" (updateAppointment)="updateAppointment.emit($event)"
                            (removeAppointment)="removeAppointment.emit($event)">
       </day-detail>
       
        <div id="div1" class="container" (drop)="drop($event)" (dragover)="allowDrop($event)">
            <img id="drag1" src="https://s3.amazonaws.com/delivia-static/v2.0.0/snsf.png" draggable="true" (dragstart)="drag($event)" width="90" height="69">
        </div>
    `
})
export class DayView implements OnInit {
    @Input() public day: DayWithAppointments;

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
    public ngOnInit(): void {
    }
}