import { createGesture, Gesture, GestureDetail } from '@ionic/core';
import { EventEmitter, Directive, OnInit, OnDestroy, Output, Input, ElementRef } from '@angular/core';

@Directive({
    selector: '[appLongPress]'
})
export class LongPressDirective implements OnInit, OnDestroy {

    ionicGesture: Gesture;
    timerId: any;

    @Input() delay: number;
    @Output() longPressed: EventEmitter<any> = new EventEmitter();
    @Output() longPressStarted: EventEmitter<any> = new EventEmitter();

    constructor(
        private elementRef: ElementRef
    ) {  }

    ngOnInit() {
        this.ionicGesture = createGesture({
            el: this.elementRef.nativeElement,
            gestureName: 'longpress',
            threshold: 0,
            canStart: () => true,
            onStart: (gestureEv: GestureDetail) => {
                //gestureEv.event.preventDefault();
                this.longPressStarted.emit();
                this.timerId = setTimeout(() => {
                    this.longPressed.emit(gestureEv.event);
                }, this.delay);
            },
            onEnd: () => {
                clearTimeout(this.timerId);
            }
        });
        this.ionicGesture.enable(true);
    }

    ngOnDestroy() {
        this.ionicGesture.destroy();
    }
}
