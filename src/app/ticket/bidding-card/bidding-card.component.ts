import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { TicketModel } from 'src/app/shared/ticket-model';

@Component({
  selector: 'app-bidding-card',
  templateUrl: './bidding-card.component.html',
  styleUrls: ['./bidding-card.component.scss']
})
export class BiddingCardComponent implements OnChanges {
  @Input() ticket: TicketModel;
  @Input() isLoggedIn: Boolean;
  //@Output() refreshTicket = new EventEmitter<void>();
  @Output() bid = new EventEmitter<void>();
  //@Input() loading = false;
  loading = false;

  ngOnChanges(changes:SimpleChanges){
    if (changes['ticket'] != null
      && !changes['ticket'].isFirstChange()
      && !changes['ticket'].currentValue != null) {
        this.loading = false;
    }
  }

  onBidWithBidStepBiddingCard() { 
    //this.refreshTicket.emit();
    this.bid.emit();
    this.loading = true;  
  } 
}
