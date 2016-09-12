import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit, OnDestroy} from "@angular/core";
import {Appointment, DayWithAppointments, WeekOverview, Week} from "../shared/stateTypes";
import {Observable, Subscription} from "rxjs";
import * as moment from "moment";
import {DayDetail} from "./day-detail.component";

@Component({
    selector: "week-view",
    directives: [DayDetail],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <h1>Overview of week: {{(overview$|async)?.week}}/{{(overview$|async)?.year}}</h1>

        <table class="table">
            <thead>
                <tr>
                    <th>Sunday</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                </tr>
            </thead>
            <tbody>
                <tr (drop)="drop($event)" (dragover)="allowDrop($event)">
                    <td *ngFor="let day of days$|async; trackBy tracker" (drop)="drop($event)" (dragover)="allowDrop($event)">
                        <day-detail *ngIf="day" [dayWithAppointments]="day"
                            (addAppointment)="addAppointment.emit($event)" (updateAppointment)="updateAppointment.emit($event)"
                            (removeAppointment)="removeAppointment.emit($event)">
                        </day-detail>
                    </td>
                </tr>
            </tbody>
        </table>

        <div id="div1" class="container" (drop)="drop($event)" (dragover)="allowDrop($event)" width="100" height="100">
            <img id="drag1" src="https://s3.amazonaws.com/delivia-static/v2.0.0/snsf.png" draggable="true" (dragstart)="drag($event)" width="90" height="69">
        </div>
    `
})
export class WeekView implements OnInit, OnDestroy {
    @Input() public overview$: Observable<WeekOverview>;
    @Input() public week$: Observable<Week>;

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
    public days$: Observable<Array<DayWithAppointments>>;
    public emptyDaysWithAppointments: Array<DayWithAppointments>;

    public tracker(index: number): number {
        return index;
    }

    private subscriptions: Array<Subscription> = [];

    public ngOnInit(): void {
        this.days$ = this.overview$.map((overview: WeekOverview) => {
            return this.emptyDaysWithAppointments.map((dayWithAppointments: DayWithAppointments) => {
                return overview.daysWithAppointments.filter((item: DayWithAppointments) => {
                        return item.day.day === dayWithAppointments.day.day;
                    })[0] || dayWithAppointments;
            });
        });
        this.subscriptions.push(this.week$.subscribe((week: Week) => {
            this.emptyDaysWithAppointments = this.getDefaultDaysWithAppointments(week);
        }));
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    private getDefaultDaysWithAppointments(week: Week): Array<DayWithAppointments> {
        let days: Array<DayWithAppointments> = [];
        let momentWeek = moment().year(week.year).week(week.week);
        for (let i = 0; i < 7; i++) {
            let sunday = momentWeek.startOf("week");
            let date = sunday.add(i, "days");
            days.push({day: {year: date.year(), month: date.month(), day: date.date()}, appointments: []});
        }
        return days;
    }
}
