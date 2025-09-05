import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { PropertyFormComponent } from './components/property-form/property-form.component';

const routes: Routes = [
  { path: '', component: PropertyListComponent }, 
  { path: 'add-property', component: PropertyFormComponent },
  { path: 'edit/:id', component: PropertyFormComponent },
  { path: 'property', component: PropertyListComponent },
  { path: 'delete/:id', component: PropertyListComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
