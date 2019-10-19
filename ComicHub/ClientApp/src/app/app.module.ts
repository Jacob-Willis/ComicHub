import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { ComicBookInformationService } from './services/comic-book-information.service';

import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ComicCardComponent } from './components/homepage/comics/comic-card/comic-card.component';
import { ComicPageComponent } from './components/homepage/comics/comic-page/comic-page.component';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ComicCardComponent,
    ComicPageComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [
    ComicBookInformationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
