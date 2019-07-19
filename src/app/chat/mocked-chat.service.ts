import { Injectable } from '@angular/core';
import { ChatService } from './chat.service';
import { UserService } from '../shared/user.service';
import { Observable } from 'rxjs';
import { ChatMessageModel } from './model/chat.model';

@Injectable({
  providedIn: 'root'
})
export class MockedChatService extends ChatService {

  constructor(userService: UserService){
    super(userService)
  }

  addMessage(roomId: string, msg: string):Observable<boolean>{
    return super.addMessage(roomId,msg);
  }

  getRoomMessages(roomId:string):Observable<ChatMessageModel[]>{
    return super.getRoomMessages(roomId);
  }
}
