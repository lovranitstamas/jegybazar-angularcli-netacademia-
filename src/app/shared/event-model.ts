export class EventModel {
  id: string;
  name: string;
  date: string;
  pictureURL: string;
  description: string;

  constructor(param?: EventModel) {

    if (param) {
      Object.assign(this, param);
    }
  }

}
