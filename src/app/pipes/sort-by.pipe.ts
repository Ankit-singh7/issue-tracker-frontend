import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(value:any[],orderType:boolean,field:String): any[] {
    if(value!=undefined){

      value.sort((a:any, b:any ) => {//calling Array.sort method by passing the custom comparator to it.

        let temp1 :any;
        let temp2 :any;

        if(field=="status"){
            temp1 = a.status;
            temp2 = b.status;
        }else if(field=="issueTitle"){
            temp1 = a.issueTitle;
            temp2 = b.issueTitle;
        }else if(field=="reporterName"){
            temp1 = a.reporterName;
            temp2 = b.reporterName;
        }else if(field=="reportedOn"){
            let date1 = new Date(a.reportedOn);
            temp1 = date1.getTime();
            //console.log(temp1)
            let date2=new Date(b.reportedOn)
            temp2 = date2.getTime();
            //console.log(temp2)
        }else{

        }

      
        if( temp1 == undefined && temp2 == undefined ) return 0;//cheching for undefined values.
        if( temp1 == undefined && temp2 != undefined ) return orderType ? 1: -1;
        if( temp1 != undefined && temp2 == undefined ) return orderType ? -1: 1;
        if( temp1 == temp2) return 0;//equality check

        //checking for the lesser or greater value and arranging accordingly.
        return orderType ? (temp1.toString().toLowerCase() > temp2.toString().toLowerCase()? -1 :1):(temp2.toString().toLowerCase() > temp1.toString().toLowerCase()? -1 :1);
      });

     return value;//finally returning the sorted array to the view for display.



    }else{
      
    }

  }

}