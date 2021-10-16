import {Component, Input} from '@angular/core';
import {User} from "../model/user";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavBarComponent {

  @Input() user: User;
}
