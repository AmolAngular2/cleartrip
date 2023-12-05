import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelsRoutingModule } from './hotels-routing.module';
import { HotelsComponent } from './hotels.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelFilterComponent } from './hotel-filter/hotel-filter.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';


@NgModule({
  declarations: [
    HotelsComponent,
    HotelListComponent,
    HotelFilterComponent,
    HotelDetailsComponent
  ],
  imports: [
    CommonModule,
    HotelsRoutingModule,
    BsDatepickerModule.forRoot(),
    FormsModule
  ]
})
export class HotelsModule { }
