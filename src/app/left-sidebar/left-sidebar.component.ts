import {Component, Input} from '@angular/core';
import {User} from "../model/user";

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html'
})
export class LeftSidebarComponent {
  @Input() user: User;
}
