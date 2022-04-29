import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationBarComponent } from './location-bar/location-bar.component';
import { NewLocationListComponent } from './new-location-list/new-location-list.component';
import { LocationItemComponent } from './new-location-item/location-item.component';
import { PaginationModule } from '../../pagination/pagination.module';

const exportsComponentsDeclarations = [
  LocationListComponent, LocationBarComponent, NewLocationListComponent
]

@NgModule({
  declarations: [...exportsComponentsDeclarations, LocationItemComponent],
  imports: [
    CommonModule,
    PaginationModule
  ],
  exports: [...exportsComponentsDeclarations]
})
export class LocationBarModule {
}
