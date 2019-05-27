import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { TicketModel } from 'src/app/shared/ticket-model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bidding-card-form',
  templateUrl: './bidding-card-form.component.html',
  styleUrls: ['./bidding-card-form.component.scss']
})
export class BiddingCardFormComponent implements OnInit {
  @Input() ticket:TicketModel;
  @Output() bidWithBidStepEventEmitter = new EventEmitter<void>(); 
  displayBidStep = true;
  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ){  }

  ngOnInit(): void{
    //fill up the form with group method (the parameter is an object) of the service 
    this.form = this.fb.group(
      {
        bid: null
      }
    );
  }

  onBidWithBidStepClickEvent() { 
    this.bidWithBidStepEventEmitter.emit(); 
  }
  
  displayBidWithStep($event: Event){
    $event.preventDefault();

    this.displayBidStep = false;
  }

  onSubmit(){
    alert("Licitáltak");
  }
}
