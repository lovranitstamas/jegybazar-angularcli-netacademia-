import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jegybazarnewversion';
  events = ['sziget', 'volt', 'efot', 'fazen'];

  show = false;
  klikk = true;

  inputContent = 'Basic value';


  toggleBackgroundColor() {
    this.show = !this.show;
    this.inputContent = 'macska';
  }

  demo(ev: MouseEvent) {
    console.log(ev.screenX);
  }
}
