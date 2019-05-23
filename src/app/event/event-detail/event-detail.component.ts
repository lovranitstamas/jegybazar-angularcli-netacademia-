import {Component, OnInit, OnDestroy} from '@angular/core';
import {EventService} from '../../shared/event.service';
import {EventModel} from '../../shared/event-model';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../../shared/user.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit, OnDestroy {
  event: EventModel;
  viewForm = false;

  //close all subscription
  private _destroy$ = new Subject<void>();
  //private _destroy$: Subject<void> = new Subject();

  constructor(private _route: ActivatedRoute, 
              private _eventService: EventService, 
              private _location: Location,
              public userService: UserService) {
  }

  ngOnInit() {
    const evId = this._route.snapshot.params['id'];

    //create an empty model while we wait for data
    this.event = new EventModel(EventModel.emptyEvent);

    //a method get true/false value in all case
    //from false to true oninit and set false from click
    //the other option is set true the default value
    this.viewForm = !!evId; 

    if (evId) {
      this._eventService.getEventById(evId).pipe(
      takeUntil(this._destroy$))
      .subscribe(evm => (this.event = evm));
    } 
  }

  ngOnDestroy() {
    //through the takeUntil function will be closed all stream
    //in this case it is not absolutely necessary because all http stream close itself
    // http://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
    this._destroy$.next();
    this._destroy$.complete();
  
  }

  onSubmit() {
    this._eventService.save(this.event).pipe(
      takeUntil(this._destroy$))
      .subscribe(
        () => this.navigateBack(),
        (err) => {
          console.warn(`Problémánk van a form mentésnél: ${err}`);
        }
      );
  };

  
  delete() {
    this._eventService.delete(this.event).pipe(
      takeUntil(this._destroy$))
      .subscribe(
        () => this.navigateBack(),
        (err) => {
          console.warn(`Problémánk van a form mentésnél: ${err}`);
        }
      );
  }

  navigateBack() {
    this._location.back();
  }

}
