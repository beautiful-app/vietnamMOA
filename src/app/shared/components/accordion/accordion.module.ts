import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccordionComponent} from './accordion.component';
import {AccordionGroupComponent} from './accordion-group/accordion-group.component';
import {DemoAccordionAccordionComponent} from './demo/accordion';
import {DemoAccordionBasicComponent} from './demo/basic';

@NgModule({
    imports: [CommonModule],
    declarations: [AccordionComponent, AccordionGroupComponent, DemoAccordionAccordionComponent, DemoAccordionBasicComponent],
    exports: [AccordionComponent, AccordionGroupComponent, DemoAccordionAccordionComponent, DemoAccordionBasicComponent]
})
export class AccordionModule {
}
