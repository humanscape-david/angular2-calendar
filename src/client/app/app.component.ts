import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES, RouteConfig} from "@angular/router-deprecated";
import {bootstrap} from '@angular/platform-browser-dynamic';
import {Calendar} from "./calendar/calendar.container";
@Component({
    selector: "angular2-calendar",
    directives: [ROUTER_DIRECTIVES, Calendar],
    template: `
        <router-outlet></router-outlet>
    `
})
@RouteConfig([
    {path: "/", name: "Root", redirectTo: ["Calendar"]},
    {path: "/calendar", name: "Calendar", component: Calendar}
])

// AppComponent라는 클레스를 생성하고 외부에 공개한다라는 의미.
export class AppComponent {
	// component에서는 ajax로 가져온 데이터를 가공하여 뷰에 노출한다거나,
  // 사용자의 액션을 처리할 이벤트를 등록로직을 메소드 형태로 구현.
}