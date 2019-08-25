import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
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
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWindowComponent implements OnInit, AfterViewChecked, AfterViewInit {
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
  @Input() @HostBinding('class.floating') floating = true;
  private shouldScrolling = false;

  constructor(
    private _chatService: ChatService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.chatMessages$ = this._chatService.getRoomMessages(this.roomId);
    this.chatMessages$.pipe(first(), delay(500)).subscribe(
      () => {
        this.shouldScrolling = true;
        this.cdr.detectChanges();
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

  ngAfterViewInit(): void {
    this.chatMessages$.subscribe(
      () => {
        this.shouldScrolling = true;
        this.cdr.detectChanges();
        this.ngAfterViewChecked();
      }
    );
    // this.cdr.detach();
  }

  onNewMessage(newMessage: string) {
    this._chatService.addMessage(this.roomId, newMessage)
      .subscribe(
        resp => {
          if (resp) {
            this.resetForm = true;
            // this.shouldScrolling = true;
            this.cdr.detectChanges();
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
    this.cdr.detectChanges();
  }

  closeWindow() {
    this.close.emit();
  }
}
