import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PeopleListComponent } from './people-list/people-list.component';
import { PersonAddFormComponent } from './person-add-form/person-add-form.component';
import { PersonViewComponent } from './person-view/person-view.component';

// define some route here, type Routes - an array with list of path obj (contain property path, component)
// Here, whenever go to end point people, call PeopleListComponent
const appRoutes: Routes = [
  {path: 'people', component: PeopleListComponent},
  {path: 'person/add', component: PersonAddFormComponent},
  {path: 'person/:name', component: PersonViewComponent}, // here, name is dynamic, based on each person's name
  {path: '', redirectTo: '/people', pathMatch: 'full'} // if go to root, redirect to people path
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // define paths we 're going to use to define our application
    RouterModule.forRoot(appRoutes)
  ],
  // define the routing
  exports: [RouterModule]
})
export class RoutingModule { }
