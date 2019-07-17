import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EventComponent} from './event.component';
import {EventListComponent} from './event-list/event-list.component';
import {EventDetailComponent} from './event-detail/event-detail.component';
import {FormsModule} from '@angular/forms';
import {AlertModule} from 'ngx-bootstrap';

import { EventRoutingModule } from './event-routing.module';
import { EventcardModule } from './eventcard/eventcard.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    EventComponent,
    EventListComponent,
    EventDetailComponent,
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    FormsModule,
    AlertModule,
    EventcardModule,
    CoreModule
  ]
})
export class EventModule { }
