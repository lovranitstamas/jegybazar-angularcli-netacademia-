import {AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {EventModel} from '../../shared/event-model';

@Component({
  selector: 'app-eventcard',
  templateUrl: './eventcard.component.html',
  styleUrls: ['./eventcard.component.scss']
})
export class EventcardComponent implements AfterViewInit, OnChanges {
  @Input() event: EventModel;
  @Input() nextLabel = 'Tovább';

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.cdr.detach();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['nextLabel'] != null
      && !changes['nextLabel'].isFirstChange()
    ) {
      this.cdr.detectChanges();
    } else if (changes['event'] != null
      && !changes['event'].isFirstChange()) {
      const prev: EventModel = changes['event'].previousValue;
      const current: EventModel = changes['event'].currentValue;

      if (prev == null || current == null) {
        this.cdr.detectChanges();
      } else if (prev.name !== current.name) {
        this.cdr.detectChanges();
      } else if (prev.date !== current.date) {
        this.cdr.detectChanges();
      } else if (prev.pictureURL !== current.pictureURL) {
        this.cdr.detectChanges();
      } else if (prev.description !== current.description) {
        this.cdr.detectChanges();
      }

    }
  }

}
