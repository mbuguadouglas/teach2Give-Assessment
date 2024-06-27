import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HotelsComponent } from './hotels/hotels.component';
import { ToursComponent } from './tours/tours.component';
import { TourDetailsComponent } from './tour-details/tour-details.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';

export const routes: Routes = [
    // {path: '', component:HomepageComponent,FooterComponent}
    {path: '', component:HomepageComponent},
    {path: 'login', component:LoginComponent},
    {path: 'signup', component:SignupComponent},
    {path: 'hotels', component:HotelsComponent},
    {path: 'tours', component:ToursComponent},
    {path: 'tours/:id', component:TourDetailsComponent},
    {path: 'hotels/:id', component:HotelDetailsComponent}
];
