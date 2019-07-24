import {Component, OnInit,  ChangeDetectionStrategy, ElementRef, ViewChild} from '@angular/core';
//import {EventService} from '../../shared/event.service';
import {EventService} from '../event.service';
import {EventModel} from '../../shared/event-model';
import {UserService} from '../../shared/user.service';
import {Observable} from 'rxjs';
import {map, delay, distinctUntilChanged, flatMap} from 'rxjs/operators';
import {BehaviorSubject, fromEvent} from 'rxjs';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventListComponent implements OnInit {

  public eventsGrouppedBy3: EventModel[];
  public events$:Observable<EventModel[]>;
  public eventsGrouppedBy3$:Observable<EventModel[][]>;
  @ViewChild('searchInput') searchInput: ElementRef;
  private filteredText$ = new BehaviorSubject<string>(null);

  constructor(private _eventService: EventService,
              public userService: UserService) {
  }

  
  ngAfterViewInit(): void {
    var input = document.querySelector("#search-input");
    //console.log(this.searchInput);
    //this.searchInput.nativeElement
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
    // [0,1,2],[3,4,5]
    /*this.eventsGrouppedBy3 = this._eventService.getAllEvents()
    .reduce((acc, curr: EventModel, ind: number) => {
      if (ind % 3 === 0) {
        // []
        acc.push([]);
      }
      acc[acc.length - 1].push(curr);
      return acc;
    }, []);*/
    //this.events$ = this._eventService.getAllEvents();
    /*this._eventService.getAllEvents().subscribe(data => {
      this.eventsGrouppedBy3 = data.reduce((acc, curr: EventModel, ind: number) => {
        if (ind % 3 === 0) {
          // []
          acc.push([]);
        }
        acc[acc.length - 1].push(curr);
        return acc;
      }, [])
    });*/
    this.eventsGrouppedBy3$ = this._eventService.getAllEvents().pipe(
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
      ),
      map(data => {
          return data.reduce((acc: Array<any>, curr: EventModel, ind: number) => {
            if (ind % 3 === 0) {
              // []
              acc.push([]);
            }
            acc[acc.length - 1].push(curr);
            return acc;
          }, [])
        }
      )
    );
  }

}
