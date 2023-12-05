import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent implements OnInit{
  searchHotelObj:any = {
    city:"",
    checkInDate:null,
    checkOutDate:null,
    rooms:"",
  }

  hotelList:any;
  selectedType:string="";
  hotelListCopy:any;
  constructor(private activatedRoute:ActivatedRoute,private http:HttpService,private router:Router){
   this.searchHotelObj.city = this.activatedRoute.snapshot.queryParamMap.get("city");
   this.searchHotelObj.checkInDate = this.activatedRoute.snapshot.queryParamMap.get("checkIn");
   this.searchHotelObj.checkOutDate = this.activatedRoute.snapshot.queryParamMap.get("checkout");
   this.searchHotelObj.rooms = this.activatedRoute.snapshot.queryParamMap.get("rooms");
   console.log("Search Hotel Obj ", this.searchHotelObj);
  }


  ngOnInit(){
      let endPoint="search-hotels";
      this.http.getHotesDataFromServer(endPoint,this.searchHotelObj).subscribe((el:any)=>{
        if(el && el.response && el.response.personalizedSections){
         this.hotelList = el.response.personalizedSections[0].hotels;
         
         //copy one array into another array 
         this.hotelListCopy = [...this.hotelList];
         console.log("Hotel ", this.hotelListCopy);
        } 
      })
  }


  selectHotel(hotelId:string){
     this.router.navigate(['/hotels/hotel-details'],{queryParams:{id:hotelId}})
  }

  sortHotels(type:string){
    this.selectedType = type;
    if(type == 'Rating'){
      this.hotelList.sort((a:any,b:any)=> b.reviewSummary.cumulativeRating - a.reviewSummary.cumulativeRating);
    }else if(type == 'Price_Highest'){
      this.hotelList.sort((a:any,b:any)=> b.priceDetail.discountedPrice - a.priceDetail.discountedPrice);
    }else if(type == 'Price_Lowest'){
      this.hotelList.sort((a:any,b:any)=> a.priceDetail.discountedPrice - b.priceDetail.discountedPrice);
    }
  }

  getFilterCriteria(filterCriteria:any){
    console.log("FIlter Criteria ", filterCriteria);
    //single filter
  //  this.filterHotels(filterCriteria);

  //multi filter
   this.filterHotelsByMultipleAction(filterCriteria);

  }

   filterHotels(criteria: any) {
    if(criteria.type == 'RATING' && criteria.isSelected){
        this.hotelList = this.hotelListCopy.filter((el:any)=> el.reviewSummary.cumulativeRating > criteria.filterValue);
       //filter based on rating
    }else if(criteria.type == 'HOTEL_PRICE_BUCKET' && criteria.isSelected){
      //filter based on price-range
       this.hotelList = this.hotelListCopy.filter((el:any)=> (el.priceDetail.discountedPrice > criteria.filterRange.min && el.priceDetail.discountedPrice < criteria.filterRange.max));
    }else {
      this.hotelList = this.hotelListCopy;
    }

  }

  filterHotelsByMultipleAction(criteriaArr:any){
    this.hotelList = [];
    var ratingArr:any = [];
    var priceArr:any = [];
    criteriaArr.forEach((criteria:any)=>{
       if(criteria.type == 'RATING') {
        ratingArr = this.hotelListCopy.filter((el:any)=> el.reviewSummary.cumulativeRating > criteria.filterValue);
       }
       if(criteria.type == 'HOTEL_PRICE_BUCKET'){
        priceArr = this.hotelListCopy.filter((el:any)=> (el.priceDetail.discountedPrice > criteria.filterRange.min && el.priceDetail.discountedPrice < criteria.filterRange.max));
       }
    })

    if(criteriaArr.length > 0){
     this.hotelList = this.hotelList.concat(ratingArr,priceArr)
    }else {
      this.hotelList = this.hotelListCopy;
    }
  }
}


