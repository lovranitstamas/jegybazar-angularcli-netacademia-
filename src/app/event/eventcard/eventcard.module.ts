import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventcardComponent} from './eventcard.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    EventcardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    EventcardComponent
  ]
})
export class EventcardModule {
}
