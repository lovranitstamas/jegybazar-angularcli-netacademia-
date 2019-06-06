import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { TicketService } from 'src/app/shared/ticket.service';
import { TicketModel } from 'src/app/shared/ticket-model';
import { UserService } from 'src/app/shared/user.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { share } from 'rxjs/operators';  

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BidComponent implements OnInit, OnDestroy {
  ticket$: Observable<TicketModel>;
  isLoggedIn$: Observable<boolean>;
  progressRefreshTicket = false;
  private ticketWatcherSubscription: Subscription; 

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

    this.ticket$ = this._ticketService.getOne(id).pipe(share());
    this.ticketWatcherSubscription = this.ticket$.subscribe(
      ticket => {
        this.progressRefreshTicket = false;
        if (ticket === null){
          handle404();
        } /*else {
          this.ticket = ticket;
        } */
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

  ngOnDestroy(): void { 
    this.ticketWatcherSubscription.unsubscribe(); 
  } 

  onBid(){
    this.progressRefreshTicket = true;
  }

  /*
  onRefreshTicket(){
    this.refreshTicket(this.ticket.id);
  }*/

}