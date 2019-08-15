import {AfterViewChecked, Component, DoCheck, Input} from '@angular/core';

@Component({
  selector: 'app-nav-bar-item',
  templateUrl: './nav-bar-item.component.html',
  styleUrls: ['./nav-bar-item.component.scss']
})
export class NavBarItemComponent implements DoCheck, AfterViewChecked {
  @Input() url: string;
  @Input() name: string;

  ngDoCheck() {
    // console.log("navbar docheck");
  }

  ngAfterViewChecked() {
    // console.log("navbar afterviewchecked");
  }

}
