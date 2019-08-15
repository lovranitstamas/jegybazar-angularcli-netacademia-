import {EventModel} from './event-model';
import {UserModel} from './user-model';

export class TicketModel {
  id: string;
  numberOfTickets: number;
  minimalBidPrice: number;
  bidStep: number;
  eventId: string;
  event: EventModel;
  sellerUserId: string;
  seller: UserModel;
  currentBid: number;
  bidCounter: number;
  bidEndDate: number;
  details: string;

  constructor(param?: TicketModel) {
    Object.assign(this, param);
  }

  setEvent(event: EventModel) {
    delete this.event;
    this.event = event;
    const eventPropertyDescriptior = Object.getOwnPropertyDescriptor(this, 'event');
    eventPropertyDescriptior.enumerable = false;
    Object.defineProperty(this, 'event', eventPropertyDescriptior);
    return this;
  }

  setSeller(seller: UserModel) {
    delete this.seller;
    this.seller = seller;
    const sellerPropertyDescriptor = Object.getOwnPropertyDescriptor(this, 'seller');
    sellerPropertyDescriptor.enumerable = false;
    Object.defineProperty(this, 'seller', sellerPropertyDescriptor);
    return this;
  }
}
