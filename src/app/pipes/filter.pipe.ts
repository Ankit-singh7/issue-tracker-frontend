import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(details:any,keys: string, term: string): any {
      if(!term)
      
        return details ;
      
  
  
       return details.filter((item)=> keys.split(',').some(key=>item.hasOwnProperty(key) && new RegExp(term,'gi').test(item[key])));
           
  
      }
  
      
     
    }
  
  
  

