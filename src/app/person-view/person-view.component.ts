import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeopleService } from '../people.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

interface Person { // Define the Person interface
  name: string;
  age: number;
  instructor: boolean;
  added_on: number; // Use number since you're storing timestamps
}

@Component({
  selector: 'app-person-view',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.css']
})
export class PersonViewComponent {
  pname: string
  person: Person
  form: FormGroup

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private ps: PeopleService) {
    this.pname =  this.activatedRoute.snapshot.params['name'] // param name is inside the endpoint person/:name
    const p = this.ps.getAPerson(this.pname)
    if (!p) {
      throw new Error(`Person with name ${this.pname} not found`);
    }
    this.person = p

    this.form = new FormGroup({
      age: new FormControl(this.person.age || ''),
      instructor: new FormControl(this.person.instructor)
    }, 
    {
      validators: [this.formValidator.bind(this)]  // Bind 'this' to access pname in the validator
    });
  }

   // Custom form validator
   formValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
   
    const valid_instructor_name = ['bobby', 'steve', 'sarah', 'mary', 'jane']
    const instructorControl = control.get('instructor')
    const ageControl = control.get('age')

    // Ensure ageControl is defined and trimmed before checking if it's empty
    const ageValue = ageControl?.value?.toString().trim();
    if (!ageValue || ageValue.length === 0) {
      return { form_error: 'Age is required' };
    }
  

    if (!instructorControl) {
      return null
    }
    
    const isInstructor = instructorControl.value;
    return ((valid_instructor_name.includes(this.pname) && isInstructor) || !isInstructor) ? null : { form_error: true }
  }

  onSubmit() {
    const age = this.form.get('age')?.value
    const instructor = this.form.get('instructor')?.value
    this.ps.edit(this.person, age, instructor)
    this.router.navigate(['/people'])
  }




}
