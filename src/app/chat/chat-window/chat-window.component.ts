import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MockedChatDatas } from '../mocked-chat.service';
import { Observable } from 'rxjs';
import { ChatMessageModel } from '../model/chat.model';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {
  @Input() roomId = environment.production ? null : MockedChatDatas.mockedRoomId;
  chatMessages$: Observable<ChatMessageModel[]>;
  resetForm = false;

  constructor(
    private _chatService: ChatService
  ) { }

  ngOnInit() {
    this.chatMessages$ = this._chatService.getRoomMessages(this.roomId);
  }

  onNewMessage(newMessage: string){
    this._chatService.addMessage(this.roomId,newMessage)
        .subscribe(
          resp => {
            if (resp){
              this.resetForm = true;
            } else {
              alert('Hiba a chat üzenet küldése közben');
            }
          }
      );
  }

}