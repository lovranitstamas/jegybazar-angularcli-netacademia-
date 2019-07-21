import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { distinctUntilChanged, skip } from 'rxjs/operators'; 

@Component({
  selector: 'app-chat-message-send-form',
  templateUrl: './chat-message-send-form.component.html',
  styleUrls: ['./chat-message-send-form.component.scss']
})
export class ChatMessageSendFormComponent implements OnInit, OnChanges {
  form: FormGroup;
  invalidChatMessageInput = false;
  @ViewChild('chatMessageInput') chatMessageInput: ElementRef;
  @Output() newMessage = new EventEmitter<string>();
  @Input() reset = false;
  @Output() resetChange = new EventEmitter<boolean>();  

  constructor(private fb: FormBuilder) { }

  ngOnInit(){

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

  ngOnChanges (changes: SimpleChanges):void {
    if(changes['reset'] !=null 
      && changes['reset'].isFirstChange() === false
      && changes['reset'].currentValue === true){
        this.form.reset({'chat-message': null});
        this.chatMessageInput.nativeElement.focus();
      }

  }

  sendMessage(){
    if (this.form.invalid){
      this.invalidChatMessageInput = true;
      this.chatMessageInput.nativeElement.focus();
    } else {
      this.resetChange.emit(false);
      this.newMessage.emit(this.form.value['chat-message']);
    }

  }

}