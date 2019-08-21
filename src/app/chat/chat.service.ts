import {Injectable, Optional} from '@angular/core';
import {UserService} from '../shared/user.service';
import {Observable} from 'rxjs';
import {ChatMessageModel} from './model/chat.model';
import {AngularFireDatabase} from '@angular/fire/database';
import {delay, first, map, switchMap} from 'rxjs/operators';
import * as moment from 'moment';
import {ChatFriendModel} from './model/chat-friend.model';
import {ChatCallModel} from './model/chat-call.model';

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

  getMyFriendList(): Observable<ChatFriendModel[]> {
    return this._userService.getCurrentUser().pipe(
      first(),
      switchMap(
        user => {
          return this.afDb.list<any>(`chat_friend_list/${user.id}`).snapshotChanges()
            .pipe(
              map(
                friends => friends.map(
                  friend => {
                    // console.log({...friend.payload.val(), $id: friend.key});
                    return new ChatFriendModel({...friend.payload.val(), $id: friend.key});
                  }
                )
              )
            );
        })
    );
  }

  // came from onSelectFriend method
  // loggedUser - friend
  // const roomId = `${user.id}-${friend.$id}`;
  addChatWait(roomId: string, friend: ChatFriendModel) {
    this._userService.getCurrentUser().pipe(first())
      .subscribe(
        user => {
          this.afDb.object(`chat_wait/${friend.$id}/${user.id}`)
            .set({
              'roomId': roomId,
              'friend': new ChatFriendModel({
                $id: user.id,
                name: user.name,
                profilePictureUrl: user.profilePictureUrl
              })
            });
        }
      );
  }

  getChatCallWatcher(): Observable<ChatCallModel[]> {
    return this._userService.getCurrentUser().pipe(
      first(),
      switchMap(
        user => {
          // const l = 'D1ZPEmskLJaPqQWmsVxZu51SmWN2';
          return this.afDb.list(`chat_wait/${user.id}`).snapshotChanges()
            .pipe(
              map(
                calls => calls.map(
                  call => {
                    const model = new ChatCallModel(Object.assign({},
                      {$id: call.key},
                      {roomId: call.payload.val()['roomId']},
                      {
                        $id: call.key, friend: new ChatFriendModel(Object.assign(call.payload.val()['friend'], {$id: call.key}))
                      }
                    ));
                    console.log(model);
                    return model;
                  }
                )
              )
            );
        })
    );
  }

  removeWatcher(id: string) {
    this._userService.getCurrentUser()
      .pipe(
        first(),
        delay(1000)).subscribe(
      user => {
        this.afDb.object(`chat_wait/${user.id}/${id}`).remove().then();
      }
    );
  }

}
