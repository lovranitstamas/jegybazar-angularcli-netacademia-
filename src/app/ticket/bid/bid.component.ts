import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/shared/ticket.service';
import { TicketModel } from 'src/app/shared/ticket-model';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.scss']
})
export class BidComponent implements OnInit {
  ticket: TicketModel

  constructor(private _ticketService:TicketService) { }

  ngOnInit() {
    const id = '-LfiSyB59rEvFVyj2Qph';
    this._ticketService.getOne(id).subscribe(
      ticket => this.ticket = ticket
    );
  }

  onBidWithBidStep() { 
    alert('Megnyomták a gombot'); 
  } 

}
