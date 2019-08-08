import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MockedChatDatas } from '../mocked-chat.service';
import { Observable } from 'rxjs';
import { ChatMessageModel } from '../model/chat.model';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  //providers: [ChatService]
})
export class ChatWindowComponent implements OnInit, AfterViewChecked,AfterViewInit {
  @Input() roomId;// environment.production ? null : MockedChatDatas.mockedRoomId;
  chatMessages$: Observable<ChatMessageModel[]>;
  resetForm = false;
  @ViewChild('cardBody') cardBody: ElementRef;
  private shouldScrolling = false;

  constructor(
    private _chatService: ChatService
  ) { }

  ngOnInit() {
    this.chatMessages$ = this._chatService.getRoomMessages(this.roomId);
    this.shouldScrolling = true; //or the default state is true
  }

  ngAfterViewInit(): void {
    window.setTimeout(() => {
        this.cardBody.nativeElement.scrollTo(0, this.cardBody.nativeElement.scrollHeight);
    },500);    
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrolling){     
        this.cardBody.nativeElement.scrollTo(0, this.cardBody.nativeElement.scrollHeight);
        this.shouldScrolling = false;      
    }
  }

  onNewMessage(newMessage: string){
    this._chatService.addMessage(this.roomId,newMessage)
        .subscribe(
          resp => {
            if (resp){
              this.resetForm = true;
              this.shouldScrolling = true;
            } else {
              alert('Hiba a chat üzenet küldése közben');
            }
          }
      );
  }

  trackByMessages(index: number, model: ChatMessageModel){
    return model.$id;
  }

}