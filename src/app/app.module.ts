import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { PromptComponent } from "@app/main/prompt/prompt.component";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            { path: '', component: MainComponent },
            { path: ':prompt', component: MainComponent }
        ]),
        PromptComponent
    ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
