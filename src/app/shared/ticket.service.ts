import {Injectable} from '@angular/core';
import {TicketModel} from './ticket-model';
import {UserService} from './user.service';
import {EventService} from './event.service';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {switchMap,map} from 'rxjs/operators'; 
import {of,zip,forkJoin} from 'rxjs';
import {EventModel} from './event-model';
import {UserModel} from './user-model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private _tickets: TicketModel[];

  constructor(private _eventService: EventService,
              private  _userService: UserService,
              private _http: HttpClient) {
    //this._tickets = this._getMockData();
  }

  /*getAllTickets() {
    return this._tickets.map(ticket => {
      return {
        ...ticket,
        event: this._eventService.getEventById(ticket.eventId),
        seller: this._userService.getUserById(ticket.sellerUserId)
      };
    });
  }*/
  getAllTickets() {
    // 1.) query all ticket in object via http get. We get objects
    // {key1: ticketObject1, key2: TicketObject2, key3: ticketObject3, ...} 
    // 2. convert it to [ticketObject1, ticketObject2, ticketObject3, ...] with Object.values()
    // 3. loop on every ticketObjectX-en and packed it into Observable with zip
    // 3. a create three stream: ticketObjectX, Event and User based on ticketObjectX id
    // we must to the ticketObjectX generate observable-nek, cause without this we can not use zip on it   
    // 3.b) we tape the three stream in each other with fat arrow function
    // 4. Last step we tape the all stream (arrays) into a big stream. We use it, so we change on switchMap 
    return this._http.get(`${environment.firebase.baseUrl}/tickets.json`).pipe(
      //tickets
      map(ticketsObject => Object.values(ticketsObject)),
      //Ky0HolLJBH3Q5uVHWZf
      map(ticketsArray => ticketsArray.map(tm =>
        zip(
          of(tm),
          this._eventService.getEventById(tm.eventId),
          this._userService.getUserById(tm.sellerUserId),
          (t: TicketModel, e: EventModel, u: UserModel) => {
            return {
              ...t,
              event: e,
              seller: u
            };
          })
      ))).pipe(
        switchMap(zipStreamArray => forkJoin(zipStreamArray))
      );
  }

  /*create(param: TicketModel) {
    this._tickets = [
      ...this._tickets,
      new TicketModel({
        id: this._tickets.reduce((x, y) => x.id > y.id ? x : y).id + 1,
        ...param,
        event: this._eventService.getEventById(param.eventId),
        seller: this._userService.getUserById(param.sellerUserId)
      })
      /*{
        id: this._tickets.reduce((x, y) => x.id > y.id ? x : y).id + 1,
        ...param
      }*/
    /*];
  }*/
  create(param: TicketModel) {
    return this._http.post(`${environment.firebase.baseUrl}/tickets.json`, param).pipe(
    switchMap((fbPostReturn: { name: string }) => this._http.patch( 
      `${environment.firebase.baseUrl}/tickets/${fbPostReturn.name}.json`, 
      {id: fbPostReturn.name} 
    ))); 
  }

  private _getMockData() {
    /*return [
      new TicketModel({
        id: 1,
        date: '2018-05-02',
        numberOfTickets: 5,
        minimalBidPrice: 2000,
        bidStep: 500,
        eventId: 4,
        sellerUserId: 1
      }),
      new TicketModel({
        id: 2,
        date: '2018-10-12',
        numberOfTickets: 4,
        minimalBidPrice: 4000,
        bidStep: 1000,
        eventId: 1,
        sellerUserId: 2
      }),
      new TicketModel({
        id: 3,
        date: '2018-10-02',
        numberOfTickets: 7,
        minimalBidPrice: 5000,
        bidStep: 2000,
        eventId: 2,
        sellerUserId: 3
      }),
      new TicketModel({
        id: 4,
        date: '2019-06-04',
        numberOfTickets: 5,
        minimalBidPrice: 10000,
        bidStep: 1000,
        eventId: 5,
        sellerUserId: 2
      }),
      new TicketModel({
        id: 5,
        date: '2018-11-06',
        numberOfTickets: 2,
        minimalBidPrice: 20000,
        bidStep: 2000,
        eventId: 7,
        sellerUserId: 2
      }),
      new TicketModel({
        id: 6,
        date: '2019-11-06',
        numberOfTickets: 1,
        minimalBidPrice: 15000,
        bidStep: 1500,
        eventId: 9,
        sellerUserId: 3
      })
    ];*/
  }

}