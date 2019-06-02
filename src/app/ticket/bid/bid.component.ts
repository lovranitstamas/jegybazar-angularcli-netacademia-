import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/shared/ticket.service';
import { TicketModel } from 'src/app/shared/ticket-model';
import { UserService } from 'src/app/shared/user.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.scss']
})
export class BidComponent implements OnInit {
  ticket: TicketModel;
  isLoggedIn$: Observable<boolean>;
  progressRefreshTicket = false;

  constructor(private _ticketService:TicketService,
              public userService: UserService,
              private _route: ActivatedRoute,
              private _router: Router) {     
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
      }
    );
  }

  onRefreshTicket(){
    this.refreshTicket(this.ticket.id);
  }

}