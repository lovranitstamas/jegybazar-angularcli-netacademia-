import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ChatWindowConfig} from '../model/chat-window.config';
import {ChatService} from '../chat.service';
import {ChatFriendModel} from '../model/chat-friend.model';
import {first} from 'rxjs/operators';
import {UserService} from '../../shared/user.service';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-chat-wrapper',
  templateUrl: './chat-wrapper.component.html',
  styleUrls: ['./chat-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChatService]
})
export class ChatWrapperComponent implements OnInit {
  windows$ = new BehaviorSubject<ChatWindowConfig[]>([]);

  constructor(
    private _userService: UserService,
    private _chatService: ChatService,
    private afDb: AngularFireDatabase
  ) {
    this._chatService.getChatCallWatcher().subscribe(
      data => {
        if (data != null && data.length > 0) {
          data.forEach(
            call => {
              this.openChat({title: call.friend.name, roomId: call.roomId, friend: call.friend});
              this._chatService.removeWatcher(call.friend.$id);
            }
          );
        }
      }
    );
  }

  ngOnInit() {
    // this.openChat({ title: 'test ablak', roomId: 'testelo' });
    // this.openChat({ title: 'test ablak', roomId: 'testelo2' });
  }

  openChat(config: ChatWindowConfig) {
    const windows = this.windows$.getValue();
    if (windows.find(_config => _config.roomId === `friend_list/${config.roomId}`)
      == null) {

      this._chatService.addChatWait(config.roomId, config.friend);

      if (config.id === null) {
        // default
        config.id = `${config.roomId}${new Date().getTime()}`;
      }
      if (config.closeable == null) {
        // default
        config.closeable = true;
      }
      config.roomId = `friend_list/${config.roomId}`;
      windows.push(config);
      this.windows$.next(windows);
    }

    /*if (config.id === null) {
      // default
      config.id = `${config.roomId}${new Date().getTime()}`;
    }

    if (config.closeable == null) {
      // default
      config.closeable = true;
    }
    config.roomId = `friend_list/${config.roomId}`;
    const windows = this.windows$.getValue();
    windows.push(config);
    this.windows$.next(windows);
    // [...this.windows$.getValue(), config]*/
  }

  removeChat(id: string) {
    const windows = this.windows$.getValue();
    const configIndex = windows.findIndex(config => config.id === id);
    if (configIndex > -1) {
      windows.splice(configIndex, 1);
      this.windows$.next(windows);
    }
  }

  onSelectFriend(friend: ChatFriendModel) {
    this._userService.getCurrentUser().pipe(first())
      .subscribe(
        user => {
          let roomId = `${user.id}-${friend.$id}`;
          this.afDb.object(`chat/friend_list/${roomId}`).snapshotChanges()
            .subscribe(
              room => {
                if (room.key !== null) {
                  this.openChat({
                    title: friend.name,
                    'roomId': roomId,
                    closeable: true,
                    'friend': friend
                  });
                } else {
                  roomId = `${friend.$id}-${user.id}`;
                  this.openChat({
                    title: friend.name,
                    'roomId': roomId,
                    closeable: true,
                    'friend': friend
                  });
                }
              }
            );
          // this._chatService.addChatWait(roomId, friend);
        }
      );
  }

  /*onSelectFriend(friend: ChatFriendModel) {
  this._userService.getCurrentUser().pipe(first())
    .subscribe(
      user => {
        const roomId = `${user.id}-${friend.$id}`;
        this.openChat({
          title: friend.name,
          'roomId': roomId,
          closeable: true,
          'friend': friend
        });
        this._chatService.addChatWait(roomId, friend);
      }
    );
}*/

}
