import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { ProjetFiaSharedModule } from 'app/shared/shared.module';
import { ProjetFiaCoreModule } from 'app/core/core.module';
import { ProjetFiaAppRoutingModule } from './app-routing.module';
import { ProjetFiaHomeModule } from './home/home.module';
import { ProjetFiaEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    ProjetFiaSharedModule,
    ProjetFiaCoreModule,
    ProjetFiaHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    ProjetFiaEntityModule,
    ProjetFiaAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent]
})
export class ProjetFiaAppModule {}
