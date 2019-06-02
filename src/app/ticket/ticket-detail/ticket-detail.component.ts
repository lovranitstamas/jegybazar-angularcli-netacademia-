import { Component, OnInit, OnDestroy } from '@angular/core';
import { TicketModel } from '../../shared/ticket-model';
import { EventModel } from '../../shared/event-model';
import { UserService } from '../../shared/user.service';
import { EventService } from '../../shared/event.service';
import { TicketService } from '../../shared/ticket.service';
import { Router } from '@angular/router';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit,OnDestroy {
  ticket: TicketModel;
  //events: EventModel[];
  events$: Observable<EventModel[]>;
  private _subs: Subscription;

  constructor(
    private _ticketService: TicketService,
    private _eventService: EventService,
    private _userService: UserService,
    private _router: Router) { }

  ngOnInit() {
    this.ticket = new TicketModel();
    //this.ticket.sellerUserId = this._userService.getCurrentUser().id;
    //this.events = this._eventService.getAllEvents();
    
    // not beautiful
    this.ticket.eventId = '';
    this._userService.getCurrentUser().subscribe(
      user => this.ticket.sellerUserId = user.id
    );
    this.events$ = this._eventService.getAllEvents();
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }

  
  /*onSubmit() {
    this._ticketService.create(this.ticket);
    this._router.navigate(['/ticket']);
  }*/
  onSubmit() {
    //console.log(this.ticket);
    this._subs = this._ticketService.create(this.ticket)
      .subscribe(newTicketId => this._router.navigate(['/ticket']));
  }

}
