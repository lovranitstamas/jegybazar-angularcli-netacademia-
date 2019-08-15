import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {JumbotronComponent} from './jumbotron/jumbotron.component';
import {FooterComponent} from './footer/footer.component';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {NavBarItemComponent} from './nav-bar-item/nav-bar-item.component';
import {CollapseModule} from 'ngx-bootstrap';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    NavbarComponent,
    JumbotronComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    NavBarItemComponent
  ],
  imports: [
    CommonModule,
    CollapseModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    JumbotronComponent,
    FooterComponent,
    LoadingSpinnerComponent,
  ]
})
export class CoreModule {
}
