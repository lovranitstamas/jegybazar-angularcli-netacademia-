import { Injectable } from '@angular/core';
import { ChatService } from './chat.service';
import { UserService } from '../shared/user.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { ChatMessageModel } from './model/chat.model';
import { switchMap, delay } from 'rxjs/operators';
import * as moment from 'moment'; 

export const MockedChatDatas = {
  mockedRoomId: '-Ky0HolLJBH3Q5uVHWZf',
  mockedUserId: 'pmhs4PEZp6VyW9sfg6gPPPPyRaa2',
  mockedUsername: 'Lovranits Tamás',
  mockedPictureUrl: 'https://pbs.twimg.com/profile_images/831993825635745796/HnVmB0-k_400x400.jpg' 
}

@Injectable({
  providedIn: 'root'
})
export class MockedChatService extends ChatService {
  private rooms$ = new BehaviorSubject<BehaviorSubject<ChatMessageModel[]>[]>([])
  //private messages$ = new BehaviorSubject<ChatMessageModel[]>([]);

  constructor(userService: UserService){
    super(userService);

    //fill mocked messages
    const mockedMessages = [];
    for (let i=0; i<10; i++){
      mockedMessages.push({
          $id: null,
          msg: `Test messsage: ${i}`,
          userId: MockedChatDatas.mockedUserId,
          userName: MockedChatDatas.mockedUsername,
          userPictureUrl: MockedChatDatas.mockedPictureUrl,
          created: moment().unix()
        });
    }

    const currentRooms = this.rooms$.getValue();
    currentRooms[MockedChatDatas.mockedRoomId] = new BehaviorSubject<ChatMessageModel[]>(mockedMessages);
    this.rooms$.next(currentRooms);
  }

  addMessage(roomId: string, msg: string):Observable<boolean>{
    const rooms = this.rooms$.getValue();
    const roomMessages = rooms[roomId].getValue();

    return this._userService.getCurrentUser().pipe(
      delay(300),
      switchMap(
        user => {   
          roomMessages.push(
            new ChatMessageModel({
              $id: null,
              'msg': msg,
              userId: MockedChatDatas.mockedUserId, //user.id,
              userName: MockedChatDatas.mockedUsername, //user.name,
              userPictureUrl: MockedChatDatas.mockedPictureUrl, //user.profilePictureUrl,
              created: moment().unix()
            })
          );
          rooms[roomId].next(roomMessages);
          return of(true);
        }
      )
    );
        
  }

  getRoomMessages(roomId:string):Observable<ChatMessageModel[]>{
    // return type: BehaviorSubject<BehaviorSubject<ChatMessageModel[]>[]
    const rooms = this.rooms$.getValue();
    if(rooms[roomId] == null){
      // first init room
      rooms[roomId] = new BehaviorSubject<ChatMessageModel[]>([]);
      this.rooms$.next(rooms);
    }
    return rooms[roomId].asObservable();
  }

}
