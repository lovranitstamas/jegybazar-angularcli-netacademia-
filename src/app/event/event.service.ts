import {Injectable} from '@angular/core';
import {EventModel} from '../shared/event-model';
import {HttpClient} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable()
export class EventService {

  constructor(private _http: HttpClient,
              private afDb: AngularFireDatabase
  ) {
  }

  getAllEvents(): Observable<EventModel[]> {
    return this.afDb.list<any>('events/').valueChanges()
      .pipe(
        map(
          (events) =>
            events.map(
              event => {
                console.log(event);
                return new EventModel(Object.assign(event, {id: event.id}));
              }
            )
        )
      );
  }

  getEventById(id: string) {
    return this.afDb.object<any>(`events/${id}`).valueChanges();
  }

  save(param: EventModel) {
    if (param.id) {
      return from(this.afDb.object(`events/${param.id}`).update(param));
    } else {
      return from(
        this.afDb.list(`events`).push(param)
      ).pipe(
        map((eventPostReturn: { key: string }) => {
          return eventPostReturn.key;
        }),
        switchMap(eventId => this.afDb.object(
          `events/${eventId}`).set({...param, id: eventId})
        )
      );
    }
  }

  delete(event: EventModel) {
    return from(this.afDb.object(`events/${event.id}`).remove());
  }

  addTicket(eventId: string, ticketId: string): Observable<string> {
    return from(this.afDb.list(`events/${eventId}/tickets`).push({[ticketId]: true}))
      .pipe(
        map(rel => {
          console.log(Object.keys(rel)[0]);
          return Object.keys(rel)[0];
        })
      );
  }
}
