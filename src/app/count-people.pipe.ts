import { Pipe, PipeTransform } from '@angular/core';

interface Person { // Define the Person interface
  name: string;
  age: number;
  instructor: boolean;
  added_on: number; // Use number since you're storing timestamps
}

@Pipe({
  name: 'countPeople'
})

export class CountPeoplePipe implements PipeTransform {
  /*
    Here, transform takes an array of people , define a transformation function to a new data
  */

  transform(people: Person[]): number {
    console.log('Pipe received:', people);
    return people ? people.length : 0;
  }
}
