// 외부 모듈 import EC6에서 새로 추가된 문법
import { bootstrap }    from '@angular/platform-browser-dynamic';
import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit, OnDestroy} from "@angular/core";
import {Appointment, Month, DayWithAppointments, MonthOverview} from "./shared/stateTypes";
import {DayDetail} from "./home/day-detail.component";
import {Observable, Subscription} from "rxjs";
import * as moment from "moment";
import * as _ from "lodash";
import { Schedule } from './shared/schedule';

@Component({
  selector: 'angular2-calendar',
  directives: [DayDetail],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'src/client/app/app.component.html'
})

// AppComponent라는 클레스를 생성하고 외부에 공개한다라는 의미. EC6에서 새로 추가된 문법
export class AppComponent implements OnInit, OnDestroy {
	// ajax로 가져온 데이터를 가공하여 뷰에 노출한다거나, 사용자의 액션을 처리할 이벤트를 등록로직을 메소드 형태로 구현.
  @Input() public overview$: Observable<MonthOverview>;
  @Input() public month$: Observable<Month>;

  @Output() public addAppointment = new EventEmitter<Appointment>();
  @Output() public updateAppointment = new EventEmitter<Appointment>();
  @Output() public removeAppointment = new EventEmitter<Appointment>();

  public weeks$: Observable<Array<Array<DayWithAppointments>>>;
  public formattedMonth$: Observable<string>;

  public emptyDaysWithAppointments: Array<DayWithAppointments>;

  public tracker(index: number): number {
      return index;
  }

  private subscriptions: Array<Subscription> = [];

  public ngOnInit(): void {
      this.formattedMonth$ = this.month$.map((month: Month) => moment().year(month.year).month(month.month).format("MMM YYYY"));
      let daysWithAppointments$ = this.overview$.map((curMonthOverview: MonthOverview) => {
          if (!curMonthOverview) {
              return this.emptyDaysWithAppointments;
          }
          return this.emptyDaysWithAppointments.map((dayWithAppointments: DayWithAppointments) => {
              return curMonthOverview.daysWithAppointments.filter((item: DayWithAppointments) => {
                  return item.day.day === dayWithAppointments.day.day;
              })[0] || dayWithAppointments;
          });
      });
      this.weeks$ = daysWithAppointments$.map((days: Array<DayWithAppointments>) => {
          let res: any = _.groupBy(days, (item => moment().year(item.day.year).month(item.day.month).date(item.day.day).week()));
          var groupedByWeek: Array<Array<DayWithAppointments>> = Object.keys(res).map((key) => res[key]);
          return groupedByWeek.map((items: Array<DayWithAppointments>) => this.fulfillWeek(items));
      });
      this.subscriptions.push(this.month$.subscribe((month: Month) => {
          this.emptyDaysWithAppointments = this.getDefaultDaysWithAppointments(month);
      }));
  }

  public ngOnDestroy(): void {
      this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private getDefaultDaysWithAppointments(month: Month): Array<DayWithAppointments> {
      let dayOne = moment().year(month.year).month(month.month).date(1);
      let days: Array<DayWithAppointments> = [];
      for (var i = 0; i < dayOne.daysInMonth(); i++) {
          days.push({day: {year: month.year, month: month.month, day: i + 1}, appointments: []});
      }
      return days;
  }

  private fulfillWeek(days: Array<DayWithAppointments>): Array<DayWithAppointments> {
      let week = [null, null, null, null, null, null, null];
      days.forEach(day => {
          let momentDay = moment().year(day.day.year).month(day.day.month).date(day.day.day);
          week[momentDay.weekday()] = day;
      });
      return week;
  }
}