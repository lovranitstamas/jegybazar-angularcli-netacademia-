import { Component, ChangeDetectorRef, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketComponent implements AfterViewInit {

  constructor(private cdr:ChangeDetectorRef) { }

  ngAfterViewInit() {
    //this.cdr.detach();
    //not useable way
  }

}
