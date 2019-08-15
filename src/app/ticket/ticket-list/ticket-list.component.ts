import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TicketModel} from '../../shared/ticket-model';
import {TicketService} from '../../shared/ticket.service';
import {UserService} from '../../shared/user.service';
import {BehaviorSubject, fromEvent, Subscription} from 'rxjs';
import {delay, distinctUntilChanged, flatMap, map} from 'rxjs/operators';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketListComponent implements OnInit, AfterViewInit, OnDestroy {
  // tickets$: Observable<TicketModel[]>;
  tickets: TicketModel[];
  isLoggedIn: boolean;
  @ViewChild('searchInput') searchInput: ElementRef;
  private filteredText$ = new BehaviorSubject<string>(null);
  private _ticketsSubscription: Subscription;
  private isLoggedInSubscription: Subscription;

  constructor(private _ticketService: TicketService,
              userService: UserService,
              private cdr: ChangeDetectorRef
  ) {
    this.isLoggedInSubscription = userService.isLoggedIn$.subscribe(
      isLoggedIn => this.isLoggedIn = isLoggedIn
    );
  }

  ngOnInit() {
    this._ticketsSubscription = this._ticketService.getAllTickets().pipe(
      flatMap(
        tickets => {
          return this.filteredText$.pipe(
            map(
              filterText => {
                if (filterText === null) {
                  return tickets;
                } else {
                  return tickets.filter(
                    ticket => {
                      return ticket.event.name.toLowerCase().indexOf(filterText.toLowerCase()) > -1;
                    }
                  );
                }
              }
            )
          );
        }
      )
    ).subscribe(
      tickets => {
        this.tickets = tickets;
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
    this._ticketsSubscription.unsubscribe();
    this.isLoggedInSubscription.unsubscribe();
  }

}
