"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = require('rxjs/Subject');
var Dispatcher = (function (_super) {
    __extends(Dispatcher, _super);
    function Dispatcher() {
        _super.apply(this, arguments);
    }
    Dispatcher.prototype.dispatch = function (action) {
        this.next(action);
    };
    return Dispatcher;
}(Subject_1.Subject));
exports.Dispatcher = Dispatcher;
