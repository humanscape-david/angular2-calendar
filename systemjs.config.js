/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 * systemjs.config.js 파일의 내용을 보면 결국 사용할 패키지 선언과 실행할 앱을 설정하는 내용에 불과합니다.
 * 지금은 자세한 내용을 이해하려 하기 보다는 모듈을 로드하기 위한 설정이 필요하다는 점만 인식합니다.
 */
(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'app':                        'src/client/app', // 'dist',
    '@angular':                   'node_modules/@angular',
    '@ngrx/core':                 'node_modules/@ngrx/core',
    '@ngrx/store':                'node_modules/@ngrx/store',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs':                       'node_modules/rxjs',
    'moment':                     'node_modules/moment',
    'lodash':                     'node_modules/lodash'
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'index.js',  defaultExtension: 'js' },
    'rxjs':                       { main:'Rx.js', defaultExtension: 'js' },
    '@ngrx/core':                 { main:'index.js', defaultExtension: 'js' },
    '@ngrx/store':                { main:'index.js', defaultExtension: 'js' },
    'angular2-in-memory-web-api': { defaultExtension: 'js' },
    'moment':                     { main:'moment.js', defaultExtension:'js'},
    'lodash':                     { main:'index.js', defaultExtension:'js'}
  };
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
  ];
  // Add package entries for angular packages
  ngPackageNames.forEach(function(pkgName) {
    packages['@angular/'+pkgName] = { main: pkgName + '.umd.js', defaultExtension: 'js' };
  });
  var config = {
    map: map,
    packages: packages
  }
  System.config(config);
})(this);