import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PipelineModule } from 'src/pipeline/pipeline.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PipelineModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
