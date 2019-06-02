import { Component, OnInit } from '@angular/core';
import { TicketModel } from '../../shared/ticket-model';
import { TicketService } from '../../shared/ticket.service';
import { UserService } from '../../shared/user.service';
import { Observable } from 'rxjs'; 

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets$: Observable<TicketModel[]>; 

  constructor(private _ticketService: TicketService,
              public userService: UserService
              ) { }

  ngOnInit() {
    this.tickets$ = this._ticketService.getAllTickets(); 
  }

}
