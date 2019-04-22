import {Component} from '@angular/core';

export class EventModel {
  id: number;
  name: string;
  pic?: string;

  constructor(name: string, id = 0, pic = '') {
    this.id = id;
    this.name = name;
    this.pic = pic;
  }

  /*constructor(param: EventModel) {
    Object.assign(this, param);
  }*/
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isCollapsed = false;

  // events: any[];
  events: EventModel[];
  modifyEvent: EventModel;

  constructor() {
    this.events = [
      {
        id: 1,
        name: 'sziget',
        pic: 'https://www.grammy.com/sites/com/files/styles/news_detail_header/public/gettyimages-855399920.jpg'
      },
      {
        id: 2,
        name: 'fezen',
        pic: 'https://www.grammy.com/sites/com/files/styles/news_detail_header/public/gettyimages-855399920.jpg'
      },
      {
        id: 3,
        name: 'rockmaraton',
        pic: 'https://www.grammy.com/sites/com/files/styles/news_detail_header/public/gettyimages-855399920.jpg'
      }
    ];
    this.modifyEvent = new EventModel('');
  }

  delete(id: number) {
    this.events = this.events.filter((ev: EventModel) => ev.id !== id);
    return this.events;
  }

  save(newEventNameInput: HTMLInputElement, newEventPicInput: HTMLInputElement) {
    if (this.modifyEvent.id === 0) {
      // cause the 0 id, we know here we insert new element
      const puf = this.events.reduce((x: EventModel, y: EventModel) => {
        return x.id > y.id ? x : y;
      }).id;

      this.events = [...this.events,
        /*{
          id: 3,
          name: newEventNameInput.value,
          pic: 'sd'
        }*/
        new EventModel(newEventNameInput.value, puf + 1, newEventPicInput.value)
      ];
    } else {
      this.events = this.events.map((ev) => {
        // equivalent with filter, search the good apples
        if (ev.id === this.modifyEvent.id) {
          // cut the apples to clove
          return {
            id: ev.id,
            name: newEventNameInput.value,
            pic: newEventPicInput.value
          };
        } else {
          return ev;
        }
      });

      // cleaning
      this.modifyEvent = new EventModel('');

    }

    newEventNameInput.value = '';
    newEventPicInput.value = '';

  }

  edit(id: number) {
    this.modifyEvent = this.events.filter((ev) => ev.id === id) [0];
  }
}

