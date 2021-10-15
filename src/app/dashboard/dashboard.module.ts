import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {DashBoardComponent} from "./dashboard.component";

@NgModule({
  declarations: [
    DashBoardComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  bootstrap: [DashBoardComponent]
})
export class DashBoardModule { }
