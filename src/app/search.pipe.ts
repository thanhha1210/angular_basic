import { Pipe, PipeTransform } from '@angular/core';

interface Person { // Define the Person interface
  name: string;
  age: number;
  instructor: boolean;
  added_on: number; // Use number since you're storing timestamps
}

// name: search -> how we can invoke this pipe
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  // return new list of people that contain queryName
  // for each person, we filter out people that has querystring as the substring
  transform(people : Person[], queryName: String): Person[] {
    
    return people.filter(p => p.name.toLowerCase().includes(queryName.toLowerCase()));
  }

}
