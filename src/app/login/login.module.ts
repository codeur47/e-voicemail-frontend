import { NgModule } from '@angular/core';
import {LoginComponent} from "./login.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  bootstrap: [LoginComponent]
})
export class LoginModule { }
