import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

import { ComicBookInformationService } from './services/comic-book-information.service';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ComicCardComponent } from './components/homepage/comics/comic-card/comic-card.component';
import { ComicPageComponent } from './components/homepage/comics/comic-page/comic-page.component';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CharacterCardComponent } from './components/homepage/comics/character-card/character-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ComicCardComponent,
    ComicPageComponent,
    PageNotFoundComponent,
    CharacterCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FontAwesomeModule,
    ModalModule.forRoot(),
    FormsModule
  ],
  providers: [
    ComicBookInformationService,
    BsModalRef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
