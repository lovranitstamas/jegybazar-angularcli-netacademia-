import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/shared/ticket.service';
import { TicketModel } from 'src/app/shared/ticket-model';
import { UserService } from 'src/app/shared/user.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.scss']
})
export class BidComponent implements OnInit {
  ticket: TicketModel;
  isLoggedIn: boolean;
  progressRefreshTicket = false;

  constructor(private _ticketService:TicketService,
              userService: UserService,
              private _route: ActivatedRoute,
              private _router: Router) {
    this.isLoggedIn = true;//userService.isLoggedIn;            
  }

  private refreshTicket(id: string){
    this.progressRefreshTicket = true;

    const handle404 = ()=>{
      this._router.navigate(['404'])
    }

    this._ticketService.getOne(id).subscribe(
      ticket => {
        this.progressRefreshTicket = false;
        if (ticket === null){
          handle404();
        } else {
          this.ticket = ticket;
        }
      },
      err => {
        return handle404();
      }
    );
  }

  ngOnInit() {
    this._route.paramMap.subscribe(
      (params:ParamMap) => {
        this.refreshTicket(params.get('id'));
        /*this._ticketService.getOne(params.get('id')).subscribe(
          ticket => {
            if (ticket === null){
              handle404();
            } else {
              this.ticket = ticket;
            }
          },
          err => {
            return handle404();
          }
        );*/
      }
    );
  }

  onRefreshTicket(){
    this.refreshTicket(this.ticket.id);
  }

}