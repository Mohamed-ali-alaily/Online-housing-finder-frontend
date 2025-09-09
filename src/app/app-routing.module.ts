// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { FeaturesComponent } from './components/features/features.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { AddPropertyComponent } from './components/Add-property/add-property.component'; // خليها lowercase
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  // 🟢 Dashboard (Admin/User Panel)
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  // 🏠 Public Pages
  { path: 'about', component: AboutComponent },
  { path: 'features', component: FeaturesComponent },

  // 🏠 Properties
  { path: 'properties', component: PropertyListComponent, canActivate: [AuthGuard] },
  { path: 'add-property', component: AddPropertyComponent, canActivate: [AuthGuard] },
  { path: 'add/:id', component: AddPropertyComponent, canActivate: [AuthGuard] }, // للتعديل

  // 🔐 Auth Pages
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // 🟢 Redirects
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
