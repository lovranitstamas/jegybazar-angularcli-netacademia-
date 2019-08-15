import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {TicketModel} from 'src/app/shared/ticket-model';

@Component({
  selector: 'app-bidding-card',
  templateUrl: './bidding-card.component.html',
  styleUrls: ['./bidding-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BiddingCardComponent implements OnChanges {
  @Input() ticket: TicketModel;
  @Input() isLoggedIn: boolean;
  @Output() bid = new EventEmitter<void>();
  loading = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ticket'] != null
      && !changes['ticket'].isFirstChange()
      && !changes['ticket'].currentValue != null) {
      this.loading = false;
    }
  }

  onBidWithBidStepBiddingCard() {
    this.bid.emit();
    this.loading = true;
  }
}
