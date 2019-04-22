import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CollapseModule} from 'ngx-bootstrap';
import { AzenpipomPipe } from './azenpipom.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AzenpipomPipe
  ],
  imports: [
    BrowserModule,
    CollapseModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
