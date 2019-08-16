import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef, EventEmitter,
  HostBinding,
  Input,
  OnInit, Output,
  ViewChild
} from '@angular/core';
import {Observable} from 'rxjs';
import {ChatMessageModel} from '../model/chat.model';
import {ChatService} from '../chat.service';
import {delay, first} from 'rxjs/operators';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChatService]
})
export class ChatWindowComponent implements OnInit, AfterViewChecked {
  @Input() id: string;
  @Input() roomId; // environment.production ? null : MockedChatDatas.mockedRoomId;
  @Input() title: string;
  @Input() closeable = false;
  @Output() close = new EventEmitter<void>();

  chatMessages$: Observable<ChatMessageModel[]>;
  resetForm = false;
  @ViewChild('cardBody') cardBody: ElementRef;
  collapseBody = false; // boolean
  @HostBinding('style.height') height = '100%';
  private shouldScrolling = false;

  constructor(
    private _chatService: ChatService
  ) {
  }

  ngOnInit() {
    this.chatMessages$ = this._chatService.getRoomMessages(this.roomId);
    this.chatMessages$.pipe(first(), delay(500)).subscribe(
      () => {
        this.shouldScrolling = true;
        this.ngAfterViewChecked();
      }
    );
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrolling) {
      // this.cardBody.nativeElement.scrollTo(0, this.cardBody.nativeElement.scrollHeight);
      document.querySelector('#card-body').scrollTop = this.cardBody.nativeElement.scrollHeight;
      this.shouldScrolling = false;
    }
  }

  onNewMessage(newMessage: string) {
    this._chatService.addMessage(this.roomId, newMessage)
      .subscribe(
        resp => {
          if (resp) {
            this.resetForm = true;
            this.shouldScrolling = true;
          } else {
            alert('Hiba a chat üzenet küldése közben');
          }
        }
      );
  }

  trackByMessages(index: number, model: ChatMessageModel) {
    return model.$id;
  }

  collapseChat() {
    this.collapseBody = !this.collapseBody;
    if (this.collapseBody === true) {
      this.height = null;
    } else {
      this.height = '100%';
    }
  }

  closeWindow() {
    this.close.emit();
  }
}
