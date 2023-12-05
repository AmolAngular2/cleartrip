import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-hotel-filter',
  templateUrl: './hotel-filter.component.html',
  styleUrls: ['./hotel-filter.component.scss']
})
export class HotelFilterComponent {


  filterObj: any;

  multiFilterData:any=[];

  @Output()
  emitSingleAction:EventEmitter<any> = new EventEmitter();


  @Output()
  emitMultiAction:EventEmitter<any> = new EventEmitter();


  constructor() {

  }

  ngOnInit() {
    this.filterObj = {
      rating: [
        {
          type: "RATING",
          filterValue: 4,
          isRangeFilter: false,
          filterRange: null,
          isSelected: false
        },
        {
          type: "RATING",
          filterValue: 3,
          isRangeFilter: false,
          filterRange: null,
          isSelected: false
        },
      ],
      pricePerNight: [
        {
          type: "HOTEL_PRICE_BUCKET",
          filterValue: null,
          isRangeFilter: true,
          filterRange: {
            min: 0,
            max: 2000
          },
          isSelected: false
        },
        {
          type: "HOTEL_PRICE_BUCKET",
          filterValue: null,
          isRangeFilter: true,
          filterRange: {
            min: 2000,
            max: 4000
          },
          isSelected: false
        },
        {
          type: "HOTEL_PRICE_BUCKET",
          filterValue: null,
          isRangeFilter: true,
          filterRange: {
            min: 4000,
            max: 8000
          },
          isSelected: false
        }
      ]
    }
  }

  emitData(filterCriteria:any){
     this.emitSingleAction.emit(filterCriteria);
  }

  emitMultiActionData(filterCriteria:any){
    this.multiFilterData = [] ;
      
     if(this.filterObj.rating){
        var ratingArr = this.filterObj.rating.filter((el:any)=> el.isSelected);
        if(ratingArr && ratingArr.length > 0){
        this.multiFilterData =  this.multiFilterData.concat(ratingArr);
        }
      }

      if(this.filterObj.pricePerNight){
        var priceArr = this.filterObj.pricePerNight.filter((el:any)=> el.isSelected);
        if(priceArr && priceArr.length > 0){
         this.multiFilterData = this.multiFilterData.concat(priceArr);
        }
      }

      console.log("selectedData ",this.multiFilterData);
      this.emitMultiAction.emit(this.multiFilterData); 
  }
}
