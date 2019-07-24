import {Injectable} from '@angular/core';
import {TicketModel} from './ticket-model';
import {UserService} from './user.service';
//import { EventService } from './event.service';
import {EventService} from '../event/event.service';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {switchMap,map, flatMap, first} from 'rxjs/operators'; 
import {Observable,of,zip,forkJoin,combineLatest} from 'rxjs';
import {EventModel} from './event-model';
import {UserModel} from './user-model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private _eventService: EventService,
              private _userService: UserService,
              private _http: HttpClient) {
  }

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
          //of(tm),
          of(new TicketModel(tm)),
          this._eventService.getEventById(tm.eventId),
          this._userService.getUserById(tm.sellerUserId),
          (t: TicketModel, e: EventModel, u: UserModel) => {
            /*return {
              ...t,
              event: e,
              seller: u
            };*/
            //return t.setEvent(e).setSeller(u); 
            t.setEvent(e);
            t.setSeller(u);
            return t;
          })
      ))).pipe(
        switchMap(zipStreamArray => forkJoin(zipStreamArray))
      );
  }

  create(param: TicketModel) {
    return this._http
      .post<{ name: string }>(`${environment.firebase.baseUrl}/tickets.json`, param)
      // konnyitsuk meg magunknak kicsit az eletunket es kuldjuk tovabb csak azt ami kell nekunk
      .pipe(
        map(fbPostReturn => fbPostReturn.name),
        // ez itt amiatt kell, hogy meglegyen a fbid objektumon belul is,
        // mert kesobb epitunk erre az infora
        // viszont ezt csak a post valaszaban kapjuk vissza
        // es legalabb hasznaljuk a patch-et is :)
        switchMap(ticketId => this._saveGeneratedId(ticketId)),
        // keszitsuk kicsit elo a jovilagot es vezessuk esemenyeknel is a hozzajuk tartozo ticketeket
        switchMap(ticketId => this._eventService.addTicket(param.eventId, ticketId)),
        // keszitsuk kicsit elo a jovilagot es vezessuk a profilunknal a hozzank tartozo ticketeket
        switchMap(ticketId => this._userService.addTicket(ticketId))
      );
  }  

  private _saveGeneratedId(ticketId: string): Observable<string> { 
    return this._http.patch<{ id: string }>( 
      `${environment.firebase.baseUrl}/tickets/${ticketId}.json`, 
      {id: ticketId} 
    ).pipe(
      map(x => x.id)
    ); 
  }

   
  getOneOnce(id: string): Observable<TicketModel> { 
    return this.getOne(id).pipe(first()); 
  } 
  
  getOne(id:string):Observable<TicketModel>{
    /*return this._http.get<TicketModel>(`${environment.firebase.baseUrl}/tickets/${id}.json`).pipe(
     flatMap(
       ticket => combineLatest(
        of(new TicketModel(ticket)),
        this._eventService.getEventById(ticket.eventId),
        this._userService.getUserById(ticket.sellerUserId),
          (t: TicketModel, e: EventModel, u: UserModel) => {
            return t.setEvent(e).setSeller(u); 
            return {
              ...t,
              event: e,
              seller: u
            };
          })
       )
    );*/
     
    return new Observable(
       observer => {
         const dbTicket = firebase.database().ref(`tickets/${id}`);
         dbTicket.on('value', snapshot => {
           const ticket = snapshot.val();
           const subscription = combineLatest(
            of(new TicketModel(ticket)),
            this._eventService.getEventById(ticket.eventId),
            this._userService.getUserById(ticket.sellerUserId),
              (t: TicketModel, e: EventModel, u: UserModel) => {
                return t.setEvent(e).setSeller(u); 
                /*return {
                  ...t,
                  event: e,
                  seller: u
                };*/
              }).subscribe(
                ticketModel => {
                  observer.next(ticketModel);
                  subscription.unsubscribe();
                }
              )
          });
        }
    ) 
      
  }

  modify(ticket: TicketModel){
    return this._http
      .put(`${environment.firebase.baseUrl}/tickets/${ticket.id}.json`,ticket);
  }

}