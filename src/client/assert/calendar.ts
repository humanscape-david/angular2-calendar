import { bootstrap } from '@angular/platform-browser-dynamic';
import { Component, Input, Output, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'angular2-calendar',
  directives: [Calendar],
  templateUrl: 'src/client/app/app.component.html'
})

export class Calendar {
    constructor() {
        /* 현재 날짜와 현재 달에 1일의 날짜 객체를 생성합니다. */
        var date = new Date(); // 날짜 객체 생성
        var y = date.getFullYear(); // 현재 연도
        var m = date.getMonth(); // 현재 월
        var d = date.getDate(); // 현재 일

        // 현재 년(y)월(m)의 1일(1)의 요일을 구합니다.
        var theDate = new Date(y,m,1);
        // 그 날의 요일은?
        var theDay = theDate.getDay();

        /* 현재 월의 마지막 일을 구합니다. */
        // 1월부터 12월까지의 마지막 일을 배열로 만듭니다.
        var last = [31,28,31,30,31,30,31,31,30,31,30,31];
        // 4년마다 있는 윤년을 계산합니다.(100년||400년 주기는 제외)
        if (y%4 && y%100!=0 || y%400===0) {
            lastDate = last[1] = 29;
        }
        // 현재 월의 마지막 일이 며칠인지 구합니다.
        var lastDate = last[m];

        /* 현재 월의 달력에 필요한 행의 개수를 구합니다. */
        // theDay(빈 칸의 수), lastDate(월의 전체 일수)
        var row = Math.ceil((theDay+lastDate)/7);

        //문자 결합 연산자를 사용해 요일이 나오는 행을 생성합니다.
        var calendar = "<table class='calendar_table'>";

        // 달력에 표기되는 일의 초기값!
        var dNum = 1;
        for (var i=1; i<=row; i++) { // 행 만들기
            calendar += "<tr>";
            for (var k=1; k<=7; k++) { // 열 만들기
                // 월1일 이전 + 월마지막일 이후 = 빈 칸으로!
                if(i===1 && k<=theDay || dNum>lastDate) {
                    calendar += "<td> &nbsp; </td>";
                } else {
                    calendar += "<td>" + dNum + "</td>";
                    dNum++;
                }
            }
            calendar += "</tr>";
        }


        /* 달력 연도/월을 표기하고 달력이 들어갈 테이블을 작성합니다. */
        //document.write("<h1>" + y + "." + (m+1) + "</h1>");

        // 문서 출력!
        document.write(calendar);
    };
}