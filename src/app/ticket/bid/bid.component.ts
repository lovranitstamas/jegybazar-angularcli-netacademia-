import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/shared/ticket.service';
import { TicketModel } from 'src/app/shared/ticket-model';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.scss']
})
export class BidComponent implements OnInit {
  ticket: TicketModel;
  isLoggedIn: boolean;

  constructor(private _ticketService:TicketService,
              userService: UserService) {
    this.isLoggedIn = userService.isLoggedIn;            
  }

  ngOnInit() {
    const id = '-Ky0HolLJBH3Q5uVHWZf';
    this._ticketService.getOne(id).subscribe(
      ticket => this.ticket = ticket
    );
  }

}
