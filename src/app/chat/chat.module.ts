import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatService} from './chat.service';
import {MockedChatService} from './mocked-chat.service';
import {UserService} from '../shared/user.service';
import {environment} from '../../environments/environment';
import {ChatWindowComponent} from './chat-window/chat-window.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';
import {ChatMessageRowComponent} from './chat-message-row/chat-message-row.component';
import {ChatMessageSendFormComponent} from './chat-message-send-form/chat-message-send-form.component';
import {MomentModule} from 'angular2-moment';
import { ChatWrapperComponent } from './chat-wrapper/chat-wrapper.component';
import { ChatFriendListComponent } from './chat-friend-list/chat-friend-list.component';

/*export const chatServiceProvidefactoryFn =
  (userService: UserService) => {
    return environment.production ?
      new ChatService(userService) :
      new MockedChatService(userService);
  };*/

@NgModule({
  declarations: [ChatWindowComponent, ChatMessageRowComponent, ChatMessageSendFormComponent, ChatWrapperComponent, ChatFriendListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    MomentModule
  ],
  exports: [
    ChatWrapperComponent
  ]
})
export class ChatModule {
  /*static forRoot(): ModuleWithProviders {
    return {
      ngModule: ChatModule,
      //[{provide: ChatService, useValue: ChatService}]
      providers: [
        {
          provide: ChatService,
          useFactory: chatServiceProvidefactoryFn,
          deps: [UserService]
        }
      ]
    };
  }*/
}
