import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../people.service';

interface Person { // Define the Person interface
  name: string;
  age: number;
  instructor: boolean;
  added_on: number; // Use number since you're storing timestamps
}

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
// OnInit requires us to implement method ngOnInit -> describe what will do on the initialization of this component
// Difference between OnInit & constructor
// OnInit -> do mostly calculator& processing. Constructor -> just declare variables and stuff like that
export class PeopleListComponent implements OnInit {
  add(newPerson: Person) {
    throw new Error('Method not implemented.');
  }
  people: Person[];
  query : string;

  constructor(private ps: PeopleService) {
    this.query= '';
    this.people = [];
    /*this.people = [
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
    ]*/
  }
  // whenever initialize component, add people service
  ngOnInit(): void {
    // return the list of people in the service. Theroretically, call to backend database
    this.people = this.ps.get();
  }

  onPersonDelete(evt:{person_name:string}) {    // event has data person_name in there
    let del_per_name = evt.person_name
    // go through all people, if person name is not the one delete -> keep
    //this.people = this.people.filter((p:{name: string}) => p.name != del_per_name)
    
    this.people = this.ps.delete(del_per_name)
    console.log(`person ${del_per_name} has been delete`)
  }
}
