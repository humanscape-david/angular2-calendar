import { Subject } from 'rxjs/Subject';
export declare class Dispatcher<T> extends Subject<T> {
    dispatch(action: T): void;
}
