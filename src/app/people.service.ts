import { Injectable } from '@angular/core';
// Injectable -> services as to the, it can be injected to all component in the root folder
// Service -> operation that I allow on the data I organize in this class. Some operation (CRUD)

interface Person { // Define the Person interface
  name: string;
  age: number;
  instructor: boolean;
  added_on: number; // Use number since you're storing timestamps
}


@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  people: Person[];
 
  constructor() {
    this.people = [
      {
        name: 'bobby',
        age:42,
        instructor: true,
        added_on: new Date().getTime() 
      },
      {
        name: 'steve',
        age:42,
        instructor: false,
        added_on: new Date().getTime() 
      },
      {
        name: 'sarah',
        age:20,
        instructor: true,
        added_on: new Date().getTime() 
      },
      {
        name: 'jacob',
        age:42,
        instructor: false,
        added_on: new Date().getTime() 
      }
    ]
  }

  // just return the list of pp we have
  get() : Person[]{
    return this.people;
  }

  // get 1 person
  getAPerson(pname: string): Person | undefined{
    return this.people.find(p => p.name.includes(pname))
  }


  // add a new person
  add(newPerson: Person) {
    newPerson.added_on = (new Date()).getTime()
    this.people.push(newPerson)
    console.log(this.people)
    return this.people
   
  }

  delete(del_person: string) {
    this.people = this.people.filter(p => p.name !== del_person)
    return this.people
  }

  edit(person: Person, age: number, instructor: boolean) {
    person.age = age
    person.instructor = instructor
  }

}
