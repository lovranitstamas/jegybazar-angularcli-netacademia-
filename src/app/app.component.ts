import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jegybazarnewversion';

  pipeDemo = [
    {
      id: 1,
      name: 'puffancs'
    },
    {
      id: 2,
      name: 'puffancs'
    }
  ];

}

