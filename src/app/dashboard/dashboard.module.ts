import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {DashBoardComponent} from "./dashboard.component";
import {FooterComponent} from "../footer/footer.component";
import {LeftSidebarComponent} from "../left-sidebar/left-sidebar.component";
import {RightSidebarComponent} from "../right-sidebar/right-sidebar.component";
import {NavBarComponent} from "../navbar/navbar.component";
import {DialogModule} from "../dialog/dialog.module";
import {RoleformatPipe} from "../roleformat.pipe";

@NgModule({
  declarations: [
    NavBarComponent,
    RightSidebarComponent,
    LeftSidebarComponent,
    FooterComponent,
    DashBoardComponent,
    RoleformatPipe
  ],
  imports: [
    DialogModule,
    FormsModule,
    CommonModule
  ],
  bootstrap: [NavBarComponent,RightSidebarComponent,LeftSidebarComponent,FooterComponent,DashBoardComponent]
})
export class DashBoardModule { }
