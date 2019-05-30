import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TicketModel } from 'src/app/shared/ticket-model';

@Component({
  selector: 'app-bidding-card',
  templateUrl: './bidding-card.component.html',
  styleUrls: ['./bidding-card.component.scss']
})
export class BiddingCardComponent {
  @Input() ticket: TicketModel;
  @Input() isLoggedIn: Boolean;
  @Output() refreshTicket = new EventEmitter<void>();
  @Input() loading = false;

  onBidWithBidStepBiddingCard() { 
    this.refreshTicket.emit(); 
  } 
}
