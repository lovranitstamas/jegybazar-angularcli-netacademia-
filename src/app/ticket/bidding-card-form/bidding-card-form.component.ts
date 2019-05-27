import { Component, Input, EventEmitter, Output } from '@angular/core';
import { TicketModel } from 'src/app/shared/ticket-model';

@Component({
  selector: 'app-bidding-card-form',
  templateUrl: './bidding-card-form.component.html',
  styleUrls: ['./bidding-card-form.component.scss']
})
export class BiddingCardFormComponent {
  @Input() ticket:TicketModel;
  @Output() bidWithBidStepEventEmitter = new EventEmitter<void>(); 
  displayBidStep = true;

  onBidWithBidStepClickEvent() { 
    this.bidWithBidStepEventEmitter.emit(); 
  }
  
  displayBidWithStep($event: Event){
    $event.preventDefault();

    this.displayBidStep = false;
  }
}
