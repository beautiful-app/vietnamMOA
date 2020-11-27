import {Directive, ElementRef, EventEmitter, Output, Renderer2} from '@angular/core';

@Directive({
	selector: '[TWInputKeyupStop]'
})
/**
 *  监听回车事件
 */
export class InputKeyupStopDirective {
	
	constructor(
		private element: ElementRef,
		private renderer: Renderer2
	) {
	}
	
	@Output('appClickStop')
	stopPropEvent = new EventEmitter();
	
	unsubscribe: () => void;
	
	ngOnInit() {
		this.unsubscribe = this.renderer.listen(
			this.element.nativeElement, 'keyup', (event) => {
				event.stopPropagation();
				event.preventDefault();
			});
	}
	
	ngOnDestroy() {
		this.unsubscribe();
	}
}
