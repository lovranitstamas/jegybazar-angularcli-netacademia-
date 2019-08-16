import {Injectable, Optional} from '@angular/core';
import {UserService} from '../shared/user.service';
import {Observable} from 'rxjs';
import {ChatMessageModel} from './model/chat.model';
import {AngularFireDatabase} from '@angular/fire/database';
import {first, map, switchMap} from 'rxjs/operators';
import * as moment from 'moment';
import {ChatFriendModel} from './model/chat-friend.model';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // private static PATH = 'chat/ticket_room';
  private static PATH = 'chat';

  constructor(
    protected _userService: UserService,
    @Optional() protected afDb?: AngularFireDatabase
  ) {
  }

  addMessage(roomId: string, msg: string): Observable<boolean> {
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
      .valueChanges()
      .pipe(
        map(list => list.map(chatMessage => {
            return new ChatMessageModel(Object.assign(chatMessage, {$id: chatMessage.$key}));
          })
        ));
  }

  getMyFriendList() {
    return this._userService.getCurrentUser().pipe(
      first(),
      switchMap(
        user => {
          return this.afDb.list(`chat_friend_list/${user.id}`).snapshotChanges()
            .pipe(
              map(
                friends =>
                  friends.map(
                    friend => {
                      console.log(friend);
                      return new ChatFriendModel({$id: friend.key});
                    }
                  )
              )
            );
        }
      )
    );
  }
}
