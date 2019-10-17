import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ComicBookInformationService } from './services/comic-book-information.service';
import { HttpClientModule } from '@angular/common/http';
import { ComicCardComponent } from './components/homepage/comic-card/comic-card.component';

@NgModule({
  declarations: [
    HomepageComponent,
    ComicCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ComicBookInformationService
  ],
  bootstrap: [HomepageComponent]
})
export class AppModule { }
