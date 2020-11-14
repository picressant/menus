import { createGesture, Gesture, GestureDetail } from '@ionic/core';
import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { environment } from "../../../environments/environment";

@Directive({
    selector: '[appLongPress]'
})
export class LongPressDirective implements OnInit, OnDestroy {

    ionicGesture: Gesture;
    timerId: any;
    timerStartId: any;

    @Output() longPressed: EventEmitter<any> = new EventEmitter();
    @Output() longPressStarted: EventEmitter<any> = new EventEmitter();
    @Output() longPressCanceled: EventEmitter<any> = new EventEmitter();

    constructor(
        private elementRef: ElementRef
    ) {
    }

    ngOnInit() {
        this.ionicGesture = createGesture({
            el: this.elementRef.nativeElement,
            gestureName: 'longpress',
            threshold: 0,
            canStart: () => true,
            onStart: (gestureEv: GestureDetail) => {
                //gestureEv.event.preventDefault();
                this.timerStartId = setTimeout(() => {
                    window.navigator.vibrate(200);
                    this.longPressStarted.emit();
                    this.timerId = setTimeout(() => {
                        this.longPressed.emit(gestureEv.event);
                    }, environment.delayLongPress);
                }, environment.delayLongPressStart);

            },
            onMove: () => {
                this.clearTimeouts();
            },
            onEnd: () => {
                this.clearTimeouts();
            }
        });
        this.ionicGesture.enable(true);
    }

    private clearTimeouts() {
        if (this.timerStartId || this.timerId) {
            this.longPressCanceled.emit();
            clearTimeout(this.timerStartId);
            clearTimeout(this.timerId);

            this.timerStartId = this.timerId = undefined;
        }
    }

    ngOnDestroy() {
        this.ionicGesture.destroy();
    }
}
