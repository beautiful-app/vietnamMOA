import {Directive, ElementRef, EventEmitter, Output, Renderer2} from '@angular/core';

@Directive({
    selector: '[TWInputKeyupStop]'
})
export class InputKeyupStopDirective {
    
    constructor(
        private element: ElementRef,
        private renderer: Renderer2
    ) {
    }
    
    @Output('appClickStop')
    stopPropEvent = new EventEmitter();
    
    // Function和箭头函数均一样
    unsubscribe: () => void;
    
    ngOnInit() {
        this.unsubscribe = this.renderer.listen(
            this.element.nativeElement, 'keyup', (event) => {
                event.stopPropagation();
                event.preventDefault();
                console.log('监听到了:', event);
                // this.stopPropEvent.emit(event);
            });
    }
    
    ngOnDestroy() {
        this.unsubscribe();
    }
    
}
