import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { MenuruService } from './menuru.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;
  leMenu = 'test';

  constructor(private accountService: AccountService, private loginModalService: LoginModalService, private menuruService: MenuruService) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    this.menuruService.getXMLMenuFile().subscribe(data => (this.leMenu = data));
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  donneLeMenuDuJour(): string {
    let parseString = require('xml2js').parseString;
    let menuVarGlobale = this.leMenu;
    parseString(menuVarGlobale, function (err, result) {
      if (typeof(result) !== undefined) {
         menuVarGlobale = Object.values(result.root.resto.16.menu);
      }
    });
    this.leMenu = menuVarGlobale;
    const cleanDate = decodeURIComponent(escape(this.leMenu[16].menu[0].$["date"];
    const dateArray = cleanDate.split("-");
    const laDateFormat = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0]
    let cleanMenu = decodeURIComponent(escape(this.leMenu[16].menu[0]._.replace(/liste-plats/gi, "list-group")));
    cleanMenu = cleanMenu.replace(/<li>/gi, "<li class=\"list-group-item\">");
    cleanMenu = cleanMenu.replace(/midi/gi, "");
    cleanMenu = cleanMenu.replace(/soir/gi, "");
    const menuArray = cleanMenu.split("<h4>");
    document.getElementById("menuTradi").innerHTML = "<h4>Midi - " + laDateFormat + " " + menuArray[1];
    document.getElementById("menuFrite").innerHTML = "<h4>Midi - " + laDateFormat + " " + menuArray[2];
    document.getElementById("menuPoisson").innerHTML = "<h4>Midi - " + laDateFormat + " " + menuArray[3];
    document.getElementById("menuTouriste").innerHTML = "<h4>Midi - " + laDateFormat + " " + menuArray[4];
    document.getElementById("menuAdministratif").innerHTML = "<h4>Midi - " + laDateFormat + " " + menuArray[5];
    document.getElementById("menuSoir").innerHTML = "<h4>Soir - " + laDateFormat + " " + menuArray[6];
    return "Menu du " +  decodeURIComponent(escape(cleanDate)) +  decodeURIComponent(escape(cleanMenu));
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
