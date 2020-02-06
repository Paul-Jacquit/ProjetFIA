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
      menuVarGlobale = result;
    });
    if (menuVarGlobale != undefined) {
      console.log("Le menu en Object javascript :");
      console.dir(menuVarGlobale);
      this.leMenu = Object.values(menuVarGlobale.root.resto.16.menu);
      console.dir(this.leMenu[16]);
    }
    const cleanDate = decodeURIComponent(escape(this.leMenu[16].menu[0].$["date"];
    const dateArray = cleanDate.split("-");
    const laDateFormat = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0]
    let cleanMenu = decodeURIComponent(escape(this.leMenu[16].menu[0]._.replace(/liste-plats/gi, "list-group")));
    cleanMenu = cleanMenu.replace(/<li>/gi, "<li class=\"list-group-item\">");
    cleanMenu = cleanMenu.replace(/midi/gi, "");
    cleanMenu = cleanMenu.replace(/soir/gi, "");
    const menuArray = cleanMenu.split("<h4>");

    let tradiArray = menuArray[1].split("<ul");
    tradiArray[1] = "<ul" + tradiArray[1];
    document.getElementById("titreTradi").innerHTML = "<h4>Midi - " + laDateFormat + " " + tradiArray[0];
    document.getElementById("menuTradi").innerHTML = tradiArray[1];
    let friteArray = menuArray[2].split("<ul");
    friteArray[1] = "<ul" + friteArray[1];
    document.getElementById("titreFrite").innerHTML = "<h4>Midi - " + laDateFormat + " " + friteArray[0];
    document.getElementById("menuFrite").innerHTML = friteArray[1];
    let poissonArray = menuArray[3].split("<ul");
    poissonArray[1] = "<ul" + poissonArray[1];
    document.getElementById("titrePoisson").innerHTML = "<h4>Midi - " + laDateFormat + " " + poissonArray[0];
    document.getElementById("menuPoisson").innerHTML = poissonArray[1];
    let touristeArray = menuArray[4].split("<ul");
    touristeArray[1] = "<ul" + touristeArray[1];
    document.getElementById("titreTouriste").innerHTML = "<h4>Midi - " + laDateFormat + " " + touristeArray[0];
    document.getElementById("menuTouriste").innerHTML = touristeArray[1];
    let administratifArray = menuArray[5].split("<ul");
    administratifArray[1] = "<ul" + administratifArray[1];
    document.getElementById("titreAdministratif").innerHTML = "<h4>Midi - " + laDateFormat + " " + administratifArray[0];
    document.getElementById("menuAdministratif").innerHTML = administratifArray[1];
    let soirArray = menuArray[6].split("<ul");
    soirArray[1] = "<ul" + soirArray[1];
    document.getElementById("titreSoir").innerHTML = "<h4>Midi - " + laDateFormat + " " + soirArray[0];
    document.getElementById("menuSoir").innerHTML = soirArray[1];
    return "";
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
