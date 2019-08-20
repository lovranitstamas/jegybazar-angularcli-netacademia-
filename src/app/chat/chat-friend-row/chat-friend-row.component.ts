import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';
import {ChatFriendModel} from '../model/chat-friend.model';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-chat-friend-row',
  templateUrl: './chat-friend-row.component.html',
  styleUrls: ['./chat-friend-row.component.scss']
})
export class ChatFriendRowComponent implements AfterViewInit {
  @Input() friend: ChatFriendModel;
  @HostBinding('class.clearfix') classClearfix = true;
  @HostBinding('class.text-muted') classTextMuted = true;
  @HostBinding('class.focused') classFocused = false;
  private focus$ = new Subject<boolean>();
  @Output() select = new EventEmitter<ChatFriendModel>();

  constructor(private cdr: ChangeDetectorRef) {
    this.focus$
      .subscribe(
        value => {
          // false !== true => default
          if (value !== this.classTextMuted) {
            this.classTextMuted = value;  // false
            this.classFocused = !value;   // true
          }
        }
      );
  }

  ngAfterViewInit(): void {
    this.cdr.detach();
  }

  @HostListener('mouseover', ['$event'])
  onHostFocus($event) {
    $event.stopPropagation();
    $event.preventDefault();
    this.focus$.next(false);
  }

  @HostListener('mouseout', ['$event'])
  onHostBlur($event) {
    $event.stopPropagation();
    $event.preventDefault();
    this.focus$.next(true);
  }

  @HostListener('click', ['$event'])
  onHostClick($event) {
    $event.stopPropagation();
    $event.preventDefault();
    this.select.emit(this.friend);
  }
}
