import {Component, OnInit} from '@angular/core';
import {EventService} from '../../shared/event.service';
import {EventModel} from '../../shared/event-model';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  event: EventModel;
  editForm = false;

  constructor(private _route: ActivatedRoute, 
              //private _router: Router, 
              private _eventService: EventService, 
              private _location: Location,
              public userService: UserService) {
  }

  ngOnInit() {
    const evId = this._route.snapshot.params['id'];
    if (evId) {
      this._eventService.getEventById(evId).subscribe(evm => (this.event = evm));
    } else {
      this.editForm = true;
      this.event = new EventModel(EventModel.emptyEvent);
    }
  }

  onSubmit(form) {
    // console.log('formValue', form);
    // console.log('event', this.event);
    if (this.event.id) {
      console.log('update');
      this._eventService.update(this.event);
    } else {
      console.log('insert');
      this._eventService.create(this.event);
    }

    //this._router.navigate(['/event/list']);
    this._location.back();
  };

  navigateBack() {
    this._location.back();
  }

}
