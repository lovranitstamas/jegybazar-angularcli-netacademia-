import { Injectable } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Observable } from 'rxjs';
import { ChatMessageModel } from './model/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    protected _userService: UserService
  ) { }

  addMessage(roomId: string, msg: string):Observable<boolean>{
    return null;
  }

  getRoomMessages(roomId:string):Observable<ChatMessageModel[]>{
    return null;
  }
}
