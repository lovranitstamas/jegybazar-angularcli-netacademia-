import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from './chat.service';
import { MockedChatService } from './mocked-chat.service';
import { UserService } from '../shared/user.service';
import { environment } from '../../environments/environment';

export const chatServiceProvidefactoryFn =
  (userService: UserService) => {
    return environment.production ? 
    new ChatService(userService) : 
    new MockedChatService(userService);
  }

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ChatModule { 
  static forRoot():ModuleWithProviders {
    return {
      ngModule : ChatModule,
      //[{provide: ChatService, useValue: ChatService}]
      providers: [
        {
          provide: ChatService,
          useFactory: chatServiceProvidefactoryFn,
          deps: [UserService]
        }
      ]
    }    
  }
}
