import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { Menu_RuService } from './menu-ru.service';



const parseString = require('xml2js').parseString;

@Component({
  selector: 'jhi-menu-ru',
  templateUrl: './menu-ru.component.html'
})
export class Menu_RuComponent implements OnInit, OnDestroy {
  eventSubscriber?: Subscription;
  leMenu ?: Object ;

  constructor(protected menu_RuService: Menu_RuService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}


  ngOnInit(): void {
    this.menu_RuService.getXMLMenuFile().subscribe(data => (this.leMenu = data));
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  donneLeMenuDuJour(): string {
    let menuVarGlobale;
    parseString(this.leMenu, function (err: any, result: any) {
      menuVarGlobale = result;
    });
    if (menuVarGlobale != undefined) {
      // @ts-ignore
      this.leMenu = Object.values(menuVarGlobale.root.resto.16.menu);
    }
    const cleanDate = decodeURIComponent(escape(this.leMenu![16].menu[0].$["date"]));
    const dateArray = cleanDate.split("-");
    const laDateFormat = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0]
    let cleanMenu = decodeURIComponent(escape(this.leMenu![16].menu[0]._.replace(/liste-plats/gi, "list-group")));
    cleanMenu = cleanMenu.replace(/<li>/gi, "<li class=\"list-group-item\">");
    cleanMenu = cleanMenu.replace(/midi/gi, "");
    cleanMenu = cleanMenu.replace(/soir/gi, "");
    const menuArray = cleanMenu.split("<h4>");

    let tradiArray = menuArray[1].split("<ul");
    tradiArray[1] = "<ul" + tradiArray[1];
    document.getElementById("titreTradi")!.innerHTML = "<h4>Midi - " + laDateFormat + " " + tradiArray[0];
    document.getElementById("menuTradi")!.innerHTML = tradiArray[1];
    let friteArray = menuArray[2].split("<ul");
    friteArray[1] = "<ul" + friteArray[1];
    document.getElementById("titreFrite")!.innerHTML = "<h4>Midi - " + laDateFormat + " " + friteArray[0];
    document.getElementById("menuFrite")!.innerHTML = friteArray[1];
    let poissonArray = menuArray[3].split("<ul");
    poissonArray[1] = "<ul" + poissonArray[1];
    document.getElementById("titrePoisson")!.innerHTML = "<h4>Midi - " + laDateFormat + " " + poissonArray[0];
    document.getElementById("menuPoisson")!.innerHTML = poissonArray[1];
    let touristeArray = menuArray[4].split("<ul");
    touristeArray[1] = "<ul" + touristeArray[1];
    document.getElementById("titreTouriste")!.innerHTML = "<h4>Midi - " + laDateFormat + " " + touristeArray[0];
    document.getElementById("menuTouriste")!.innerHTML = touristeArray[1];
    let administratifArray = menuArray[5].split("<ul");
    administratifArray[1] = "<ul" + administratifArray[1];
    document.getElementById("titreAdministratif")!.innerHTML = "<h4>Midi - " + laDateFormat + " " + administratifArray[0];
    document.getElementById("menuAdministratif")!.innerHTML = administratifArray[1];
    let soirArray = menuArray[6].split("<ul");
    soirArray[1] = "<ul" + soirArray[1];
    document.getElementById("titreSoir")!.innerHTML = "<h4>Soir - " + laDateFormat + " " + soirArray[0];
    document.getElementById("menuSoir")!.innerHTML = soirArray[1];
    return "";
  }


}
