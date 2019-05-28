import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { TicketModel } from 'src/app/shared/ticket-model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { bidMinimumValidator } from './bidding-card-form.validators';
import { BidService } from 'src/app/shared/bid.service';

@Component({
  selector: 'app-bidding-card-form',
  templateUrl: './bidding-card-form.component.html',
  styleUrls: ['./bidding-card-form.component.scss']
})
export class BiddingCardFormComponent implements OnInit {
  @Input() ticket:TicketModel;
  //@Output() bidWithBidStepEventEmitter = new EventEmitter<void>(); 
  @Output() bid = new EventEmitter<void>(); 
  displayBidStep = true;
  form: FormGroup;
  submitted = false;
  submitSuccessAlert = false;
  submitErrorAlert = false;

  constructor(
    private fb: FormBuilder,
    private _bidService: BidService
  ){  }

  ngOnInit(): void{
    //fill up the form with group method (the parameter is an object) of the service 
    this.form = this.fb.group(
      {
        //bid: null
        //bid: [null,Validators.required]
        bid: [null,Validators.compose([
          Validators.required,
          bidMinimumValidator(this.ticket.currentBid + this.ticket.bidStep)
        ])]
      }
    );

    /*this.form.get('bid').valueChanges.subscribe(
      val => console.log('Bid change: ', val)
    );*/
    //Bid change: 2

    /*this.form.valueChanges.subscribe(
      val => console.log('Form change => ', val)
    );*/
    //Form change => {bid: 2}
  }

  testMethod(){
    this.form.addControl('bid2', new FormControl());
  }

  displayBidWithStep($event: Event){
    $event.preventDefault();

    this.displayBidStep = false;
  }  

  onBidWithBidStepClickEvent() { 
    //this.bidWithBidStepEventEmitter.emit(); 
    this.toBid(this.ticket.currentBid + this.ticket.bidStep)
    .subscribe(
      () => {

        this.submitSuccessAlert = true;
        this.bid.emit();
      },
      err => {
        console.error(err);
        this.submitErrorAlert = true;
      }
    )
  }

  onSubmit(){
    this.submitted = true;
    this.submitSuccessAlert = false;
    this.submitErrorAlert = false;

    if(this.form.valid){
      //this._bidService.bid(this.ticket.id,this.form.value['bid'])
      this.toBid(this.form.value['bid'])
        .subscribe(
          () => {
            this.submitted = false;
            this.form.reset({bid: null});
            this.submitSuccessAlert = true;
            this.bid.emit();
          },
          err => {
            console.error(err);
            this.submitErrorAlert = true;
          }
        )
    }

    //alert("Licitáltak");
    //alert(this.form.value);
    //alert(this.form.valid);
  }

  toBid(value: number){
    return this._bidService.bid(this.ticket.id, value)
  }
}
