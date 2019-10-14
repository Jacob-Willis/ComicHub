import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ComicBookInformationService } from './services/comic-book-information.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HomepageComponent
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
