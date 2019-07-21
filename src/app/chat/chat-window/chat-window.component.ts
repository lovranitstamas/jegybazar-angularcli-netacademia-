import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged, skip } from 'rxjs/operators'; 
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
  form: FormGroup;
  invalidChatMessageInput = false;
  @ViewChild('chatMessageInput') chatMessageInput: ElementRef;
  @Input() roomId = environment.production ? null : MockedChatDatas.mockedRoomId;
  chatMessages$: Observable<ChatMessageModel[]>;

  constructor(
    private fb: FormBuilder,
    private _chatService: ChatService
  ) { }

  ngOnInit() {
    this.chatMessages$ = this._chatService.getRoomMessages(this.roomId);

    this.form = this.fb.group({
      'chat-message': [null, Validators.required]
    });

    this.form.get('chat-message')
      .valueChanges
      .pipe(
        distinctUntilChanged(
          msg => {
            // van adat -> true && false -> false -> i
            //nincs     -> false && false -> false -> i
            return !(msg.length > 0 && this.invalidChatMessageInput)
          }
        ),
        skip(1)
      )
      .subscribe(
        //msg => console.log(msg)
        () => this.invalidChatMessageInput = false
      );    
  }

  sendMessage(){
    if (this.form.invalid){
      this.invalidChatMessageInput = true;
    } else {
      this._chatService.addMessage(this.roomId,this.form.value['chat-message'])
        .subscribe(
          resp => {
            if (resp){
              this.form.reset({'chat-message': null});
            } else {
              alert('Hiba a chat üzenet küldése közben');
            }
          }
        );
    }

    this.chatMessageInput.nativeElement.focus();
  }

}
