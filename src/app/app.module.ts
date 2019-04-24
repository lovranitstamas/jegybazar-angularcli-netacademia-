import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CollapseModule} from 'ngx-bootstrap';
import {NavbarComponent} from './core/navbar/navbar.component';
import {JumbotronComponent} from './core/jumbotron/jumbotron.component';
import {EventcardComponent} from './event/eventcard/eventcard.component';
import {FooterComponent} from './core/footer/footer.component';
import {AppRoutingModule} from './app-routing.module';
import {EventService} from './shared/event.service';
import {UserService} from './shared/user.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    JumbotronComponent,
    EventcardComponent,
    FooterComponent,
    ...AppRoutingModule.routableComponents

  ],
  imports: [
    BrowserModule,
    CollapseModule.forRoot(),
    AppRoutingModule
  ],
  providers: [EventService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
