import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PersonComponent } from './person/person.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { ColorsDirective } from './colors.directive';
import { CountPeoplePipe } from './count-people.pipe';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from './search.pipe';
import { PersonAddFormComponent } from './person-add-form/person-add-form.component';
import { RoutingModule } from './routing.module';
import { PersonViewComponent } from './person-view/person-view.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    PeopleListComponent,
    ColorsDirective,
    CountPeoplePipe,
    SearchPipe,
    PersonAddFormComponent,
    PersonViewComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,   // allow to create a form dynamically from ts file
    RoutingModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
