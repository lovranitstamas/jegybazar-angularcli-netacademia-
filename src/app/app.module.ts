import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CollapseModule} from 'ngx-bootstrap';
import {NavbarComponent} from './navbar/navbar.component';
import {JumbotronComponent} from './jumbotron/jumbotron.component';
import {EventcardComponent} from './eventcard/eventcard.component';
import {FooterComponent} from './footer/footer.component';
import { EventComponent } from './event/event.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventListComponent } from './event-list/event-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { BidComponent } from './bid/bid.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketComponent } from './ticket/ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    JumbotronComponent,
    EventcardComponent,
    FooterComponent,
    EventComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    ProfileEditComponent,
    EventDetailComponent,
    EventListComponent,
    PageNotFoundComponent,
    AboutComponent,
    HomeComponent,
    BidComponent,
    TicketDetailComponent,
    TicketListComponent,
    TicketComponent
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
