import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PeopleListComponent } from '../people-list/people-list.component';
import { PeopleService } from '../people.service';
import { Router, RouterModule } from '@angular/router';

interface Person { // Define the Person interface
  name: string;
  age: number;
  instructor: boolean;
  added_on: number; // Use number since you're storing timestamps
}

@Component({
  selector: 'app-person-add-form',
  templateUrl: './person-add-form.component.html',
  styleUrls: ['./person-add-form.component.css']
})
export class PersonAddFormComponent {
  form: FormGroup // define a form which inside has all the control we need to create the form for HTML 


  // construct with router obj to nevigate to another endpoint when need
  constructor(private ps: PeopleService, private router: Router) {
    // create obj name formControls which is basically we can interact in this form
    // this form has 3 attribute: name, instructor, and age
    // validator to check what can't be in the input
    // FormControl(x, y) -> x : default value, y : some validators. E.g: Validators.required -> that field is required
    let formControls = {
      name: new FormControl('', [Validators.required, Validators.minLength(4), this.forbiddenNameValidator as ValidatorFn] ),
      instructor: new FormControl(20, Validators.required), 
      age: new FormControl(), 
    }
    // create a form based on that shape
    this.form = new FormGroup(formControls, {validators: [this.formValidator]});
  }

  // if having a list of instructor name, so if instructor is check, the name has to be same as 1 of some instructor there, otherwise invalid
  // function formValidation in the form of ValidationFn return ValidationErrors obj or null
  formValidator: ValidatorFn = (control: AbstractControl) : ValidationErrors | null => {
    const name = control.get("name")
    const instructor = control.get("instructor");
    const valid_instructor_name = ['bobby', 'steve', 'sarah', 'mary', 'jane']
    // if instructor name include in the list or is not instructor -> true
    return ((valid_instructor_name.includes(name?.value.trim()) && instructor!.value) || !instructor!.value) ? null: {form_error: true};
  }


  // Create a new validator -> a name control will be passed & return a ValidationFunction
  forbiddenNameValidator(control: FormControl) : any {
    var invalid_names = ['stupid', 'hell', 'freak', 'idiot']
    if (invalid_names.includes(control.value.trim())) {
      return { name_error: "Your name cannot be " + control.value.trim()} //return an object with name error
    }
    else {
      return null;
    }
  }

  // create a onSubmit function to trigger when some action occur
  onSubmit(newPerson: Person) {
    this.ps.add(newPerson)
    // after adding -> navigate to people endpoint
    this.router.navigate(['/people'])
  }
}
