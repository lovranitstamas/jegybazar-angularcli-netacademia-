import { Component, Input } from '@angular/core';
import { TicketModel } from 'src/app/shared/ticket-model';

@Component({
  selector: 'app-ticket-details-card',
  templateUrl: './ticket-details-card.component.html',
  styleUrls: ['./ticket-details-card.component.scss']
})
export class TicketDetailsCardComponent{
  @Input() ticket: TicketModel;
}
