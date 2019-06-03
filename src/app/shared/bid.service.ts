import { Injectable } from '@angular/core';
import { TicketService } from './ticket.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  constructor(
    private _ticketService: TicketService,
    private _http: HttpClient
  ) { }

  bid(ticketId: string, value: number ){
    const userId = 'pmhs4PEZp6VyW9sfg6gPPPPyRaa2';
    return this._http
      .put(`${environment.firebase.baseUrl}/bids/${ticketId}/${userId}.json`,value)
      .pipe(
        flatMap(
          () => {
            return this._ticketService.getOneOnce(ticketId);
          }
        ),
        flatMap(
          ticket => {
            return this._ticketService.modify(
              Object.assign(ticket,
                {currentBid:value, bidCounter: ++ticket.bidCounter}
                )
              );
          }
        )
      )

  }
}
