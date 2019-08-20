import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ChatFriendModel} from '../model/chat-friend.model';
import {Observable} from 'rxjs';
import {ChatService} from '../chat.service';

@Component({
  selector: 'app-chat-friend-list',
  templateUrl: './chat-friend-list.component.html',
  styleUrls: ['./chat-friend-list.component.scss']
})
export class ChatFriendListComponent implements OnInit {
  @Output() select = new EventEmitter<ChatFriendModel>();
  friendList$: Observable<ChatFriendModel[]>;

  constructor(
    private chatService: ChatService
  ) {
  }

  ngOnInit() {
    this.friendList$ = this.chatService.getMyFriendList();
  }

  onSelectFriend(friend: ChatFriendModel) {
    this.select.emit(friend);
  }

}
