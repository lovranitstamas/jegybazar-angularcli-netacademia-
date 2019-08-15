import {Injectable} from '@angular/core';
import {TicketService} from './ticket.service';
import {flatMap, switchMap} from 'rxjs/operators';
import {UserService} from './user.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {from} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  constructor(
    private _ticketService: TicketService,
    private _userService: UserService,
    private afDb: AngularFireDatabase
  ) {
  }

  bid(ticketId: string, value: number) {
    return this._userService.getCurrentUser().pipe(
      switchMap(
        user => {
          return from(this.afDb.object(`bids/${ticketId}/${user.id}`).set(value)).pipe(
            flatMap(
              () => {
                return this._ticketService.getOneOnce(ticketId);
              }
            ),
            flatMap(
              ticket => {
                return this._ticketService.modify(
                  Object.assign(ticket, {currentBid: value, bidCounter: ++ticket.bidCounter})
                );
              }
            )
          );
        }
      )
    );
  }
}
