import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, DoCheck} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements DoCheck, AfterViewChecked, AfterViewInit {
  public isCollapsed = true;
  isLoggedIn = false;
  isCollapsedLanguageSwitcher = true;
  currentLang = 'hu';

  constructor(
    public userService: UserService,
    private cdr: ChangeDetectorRef,
    private _translateService: TranslateService) {
    this.userService.isLoggedIn$.subscribe(
      isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
        this.cdr.detectChanges();
      }
    );

    this._translateService.onLangChange.subscribe(
      newLang => {
        this.currentLang = newLang.lang;
        this.isCollapsedLanguageSwitcher = true;
        this.cdr.detectChanges();
      }
    );
  }

  ngDoCheck() {
    // console.log("navbar docheck");
  }

  ngAfterViewChecked() {
    // console.log("navbar afterviewchecked");
  }

  ngAfterViewInit() {
    this.cdr.detach();
  }

  logout() {
    this.userService.logout();
  }

  toggleLanguageSwitcher($event: MouseEvent) {
    $event.stopPropagation();
    $event.preventDefault();

    this.isCollapsedLanguageSwitcher = !this.isCollapsedLanguageSwitcher;
    this.cdr.detectChanges();
  }

  selectLang(lang: string, $event: MouseEvent) {
    $event.stopPropagation();
    $event.preventDefault();
    this.currentLang = lang;

    this._translateService.use(lang);

  }

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
    this.cdr.detectChanges();
  }
}
