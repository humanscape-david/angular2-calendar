import { Reducer } from './interfaces';
export declare function combineReducers(reducers: any): Reducer<any>;
export declare const compose: (...funcs: any[]) => (...args: any[]) => any;
