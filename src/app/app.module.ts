import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SecondCurrancyComponent } from './components/second-currancy/second-currancy.component';
import { ThirdCurrancyComponent } from './components/third-currancy/third-currancy.component';
import { FirstCurrancyComponent } from './components/first-currancy/first-currancy.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainPageComponent,
    SecondCurrancyComponent,
    ThirdCurrancyComponent,
    FirstCurrancyComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
