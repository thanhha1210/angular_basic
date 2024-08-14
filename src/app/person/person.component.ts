import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent {
  @Input() person: any;   //Input -> not keep person internally. Rather, it takes input from external view
  /*
  take input from person -> send to its parents (here is people-list)
  EventEmitter -> used for emitting events from 1 component to another
  Use case: Child to Parent communication. When child need to send data back to its parents component
  How it work:
    1. Declare an EventEmitter in Child component & decorate it with @Output decorator
      -> makes it an output property that the parent component can bind to.
    2. Emit an Event
      -> When a specific action happens in the child component, call emit() method on EventEmitter instance
      to send an event to the parent component.
    3. Listen to the Event in the Parent Component
      -> Listen for event emitted by rhw child component & decide what action should be taken when event triggered
  */
  @Output() delete = new EventEmitter()
  
  constructor(private router: Router) {
    // this.person = {
    //   name: 'bobby',
    //   age:42,
    //   instructor: true,
    //   added_on: new Date().getTime() 
    // }
  }

  // When click delete -> trigger onDelete event function, take along with event obj, attack person_name in there
  onDelete(evt: any, person_name: string) {  // Define the function call when click delete
    evt["person_name"] = person_name
    console.log(evt)
    this.delete.emit(evt)
  }
  // activative route -> navigate based on id
  onView() {
    this.router.navigate(['/person', this.person.name]);
  }


}
