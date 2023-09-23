import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtlasRoutingModule } from './atlas-routing.module';
import { AtlasComponent } from './atlas.component';


@NgModule({
  declarations: [
    AtlasComponent
  ],
  imports: [
    CommonModule,
    AtlasRoutingModule
  ]
})
export class AtlasModule { }
