import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {EventService} from '../event.service';
import {UserService} from '../../shared/user.service';
import {BehaviorSubject, fromEvent, Subscription} from 'rxjs';
import {delay, distinctUntilChanged, flatMap, map} from 'rxjs/operators';
import {EventModel} from '../../shared/event-model';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventListComponent implements OnInit, AfterViewInit, OnDestroy {
  // public events$: Observable<EventModel[]>;
  events: EventModel[];
  isLoggedIn: boolean;
  @ViewChild('searchInput') searchInput: ElementRef;
  private filteredText$ = new BehaviorSubject<string>(null);
  private _eventsSubscription: Subscription;
  private isLoggedInSubscription: Subscription;

  constructor(private _eventService: EventService,
              userService: UserService,
              private cdr: ChangeDetectorRef
  ) {
    this.isLoggedInSubscription = userService.isLoggedIn$.subscribe(
      isLoggedIn => this.isLoggedIn = isLoggedIn
    );
  }

  ngOnInit() {
    this._eventsSubscription = this._eventService.getAllEvents().pipe(
      flatMap(
        events => {
          return this.filteredText$.pipe(
            map(
              filterText => {
                if (filterText === null) {
                  return events;
                } else {
                  return events.filter(
                    event => {
                      return event.name.toLowerCase().indexOf(filterText.toLowerCase()) > -1;
                    }
                  );
                }
              }
            )
          );
        }
      )
    ).subscribe(
      events => {
        this.events = events;
        this.cdr.detectChanges();
      }
    );
  }

  ngAfterViewInit(): void {
    const input = document.querySelector('#search-input');
    // this.searchInput.nativeElement
    fromEvent(input, 'keyup').pipe(
      delay(300),
      map(
        (event: Event) => {
          return (event.srcElement as HTMLInputElement).value;
        }
      ),
      distinctUntilChanged())
      .subscribe(
        text => {
          if (text.length === 0) {
            text = null;
          }
          this.filteredText$.next(text);
        }
      );

    this.cdr.detach();
  }

  ngOnDestroy(): void {
    this._eventsSubscription.unsubscribe();
    this.isLoggedInSubscription.unsubscribe();
  }

}
