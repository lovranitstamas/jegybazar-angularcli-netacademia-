import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ChatWindowConfig} from '../model/chat-window.config';
import {ChatService} from '../chat.service';
import {ChatFriendModel} from '../model/chat-friend.model';
import {first} from 'rxjs/operators';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-chat-wrapper',
  templateUrl: './chat-wrapper.component.html',
  styleUrls: ['./chat-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChatService]
})
export class ChatWrapperComponent implements OnInit {
  windows$ = new BehaviorSubject<ChatWindowConfig[]>([]);

  constructor(private _userService: UserService) {
  }

  ngOnInit() {
    // this.openChat({ title: 'test ablak', roomId: 'testelo' });
    // this.openChat({ title: 'test ablak', roomId: 'testelo2' });
  }

  openChat(config: ChatWindowConfig) {
    const windows = this.windows$.getValue();
    if (windows.find(_config => _config.roomId === `friend_list/${config.roomId}`)
      == null) {
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
          this.openChat({
            title: friend.name, roomId: `${user.id}-${friend.$id}`,
            closeable: true,
            'friend': friend
          });
        }
      );
  }

}
