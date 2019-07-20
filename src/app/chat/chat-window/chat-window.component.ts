import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged, skip } from 'rxjs/operators'; 

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {
  form: FormGroup;
  invalidChatMessageInput = false;
  @ViewChild('chatMessageInput') chatMessageInput: ElementRef;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
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
      console.log(this.form.value);
    }

    this.chatMessageInput.nativeElement.focus();
  }

}
