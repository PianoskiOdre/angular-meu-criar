import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";

export const appRoutes : Routes = [
    {path : 'dashboard', component : DashboardComponent},
    {path : 'signup', component : HomeComponent, children : [{path : '', component : SignupComponent}]},
    {path : 'login', component : HomeComponent, children : [{path : '', component : LoginComponent}]},
    {path : '', redirectTo : '/login', pathMatch : 'full'}
]