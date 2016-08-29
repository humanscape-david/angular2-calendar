/*
bootstrap을 import하고 있는게 눈에 들어오네요.
import의 출처를 보면 ‘@angular/platform-browser-dynamic’으로 되어 있는데요.
이는 angular2가 bootstrap 될 환경이 browser에만 국한되지 않는다는 것을 보여줍니다.
즉  bootstrap될 환경에 따라 다른 bootsrap 메서드를 import할 수가 있습니다. 
예를 들면, 현재 Angular2는 네이티브 앱 및 서버 렌더링까지 지원을 가지고 있습니다.
*/
import { bootstrap } from "@angular/platform-browser-dynamic";
import { AppComponent } from './app.component';

bootstrap(AppComponent);