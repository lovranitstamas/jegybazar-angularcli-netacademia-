import { Injectable, Optional } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Observable } from 'rxjs';
import { ChatMessageModel } from './model/chat.model';
import { AngularFireDatabase } from '@angular/fire/database';
import {map,switchMap} from 'rxjs/operators';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private static PATH = 'chat/ticket_room'; 

  constructor(
    protected _userService: UserService,
    @Optional() protected afDb?: AngularFireDatabase
  ) { }

  addMessage(roomId: string, msg: string):Observable<boolean>{
    return this._userService.getCurrentUser().pipe( 
      switchMap( 
        user => {
          return new Observable<boolean>( 
            observer => { 
              const room = this.afDb.list(`${ChatService.PATH}/${roomId}`); 
              room.push( 
                new ChatMessageModel({ 
                  $id: null, 
                  'msg': msg, 
                  userId: user.id, 
                  userName: user.name, 
                  userPictureUrl: user.profilePictureUrl, 
                  created: moment().unix() 
                }) 
              ).then( 
                () => { 
                  observer.next(true); 
                  observer.complete(); 
                }, 
                error => { 
                  observer.next(false); 
                  observer.error(error); 
                  observer.complete(); 
                }
              ); 
            } 
          ); 
        } 
      )
    );
  }

  getRoomMessages(roomId: string): Observable<ChatMessageModel[]> {
    return this.afDb.list<any>(`${ChatService.PATH}/${roomId}`)
      .valueChanges() // add this!
      .pipe(
        map(list => list.map(chatMessage => {  
          return new ChatMessageModel(Object.assign(chatMessage, { $id: chatMessage.$key }))
      }) 
    ));
  }
}
