import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtlasRoutingModule } from './atlas-routing.module';
import { AtlasComponent } from './atlas.component';
import { AnimalCardComponent } from './animal-card/animal-card.component';


@NgModule({
  declarations: [
    AtlasComponent,
    AnimalCardComponent
  ],
  imports: [
    CommonModule,
    AtlasRoutingModule
  ]
})
export class AtlasModule { }
