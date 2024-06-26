import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { ProfileComponent } from "./profile/profile.component";
import { HomepageComponent } from "./homepage/homepage.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NavbarComponent, ProfileComponent, HomepageComponent]
})
export class AppComponent {
  title = '4.twitter-clone';

  // declare the variables for component communication
  userId:string = ''
  commentIdParent:string = '5' 

  //get userId from navbar. It worked
  userIdToUse(eventData:string){
    this.userId = eventData
  }
}
