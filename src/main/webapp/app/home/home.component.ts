import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { MenuruService } from './menuru.service';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;
  leMenu = '';

  constructor(private accountService: AccountService, private loginModalService: LoginModalService, private leMenuRU: MenuruService) {}

  ngOnInit(): void {
    this.leMenu = this.leMenuRU.get().toString();
    console.log(this.leMenu.toString);
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }

  importMenuRestoU(): void {
    this.leMenuRU.get();
    /*
    getMenuGouvURL();
    let url =
      "http://query.yahooapis.com/v1/public/yql?q=select * from xml where url='http://dailyjs.com/atom.xml' and itemPath='feed.entry'&format=json&diagnostics=true&callback=JSON_CALLBACK";
    url = 'https://www.data.gouv.fr/fr/datasets/r/0e08266e-0c9a-4b27-a4d6-235de261c5d3';
    url = 'http://webservices-v2.crous-mobile.fr:8080/feed/bordeaux/externe/resto.xml';
    this.leMenu = '';
    let localLeMenu = '';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
    xhr.setRequestHeader('Access-Control-Allow-Headers', 'Origin');
    xhr.onload = function(): string {
      if (xhr.status === 200) {
        localLeMenu = xhr.responseText;
        return 'ok';
      } else {
        //  console.log('Request failed.  Returned status of ' + xhr.status);
        return 'error';
      }
    };
    this.leMenu = localLeMenu;
    xhr.send();
    */
  }
  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  donneLeMenu(): string {
    return this.leMenu;
  }

  login(): void {
    this.loginModalService.open();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
