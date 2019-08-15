import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EventService} from '../event.service';
import {EventModel} from '../../shared/event-model';
import {UserService} from '../../shared/user.service';
import {BehaviorSubject, fromEvent, Observable} from 'rxjs';
import {delay, distinctUntilChanged, flatMap, map} from 'rxjs/operators';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventListComponent implements OnInit, AfterViewInit {
  public events$: Observable<EventModel[]>;
  @ViewChild('searchInput') searchInput: ElementRef;
  private filteredText$ = new BehaviorSubject<string>(null);

  constructor(private _eventService: EventService,
              public userService: UserService) {
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
  }

  ngOnInit() {
    this.events$ = this._eventService.getAllEvents().pipe(
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
    );
  }

}
