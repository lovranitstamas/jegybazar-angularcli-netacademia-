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
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    JumbotronComponent,
    EventcardComponent,
    FooterComponent,
    // EventComponent, moved in app-routing.module.ts
    ...AppRoutingModule.routableComponents
    /*LoginComponent, moved in app-routing.module.ts
    RegistrationComponent, moved in app-routing.module.ts
    ProfileComponent moved in app-routing.module.ts,
    ProfileEditComponent moved in app-routing.module.ts,
    EventDetailComponent,  moved in app-routing.module.ts
    EventListComponent,  moved in app-routing.module.ts
    PageNotFoundComponent, moved in app-routing.module.ts
    AboutComponent, moved in app-routing.module.ts
    HomeComponent, moved in app-routing.module.ts
    BidComponent,
    TicketDetailComponent,
    TicketListComponent,
    TicketComponent moved in app-routing.module.ts*/
  ],
  imports: [
    BrowserModule,
    CollapseModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
