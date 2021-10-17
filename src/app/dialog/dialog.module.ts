import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {DialogComponent} from "./dialog.component";
import {InitialformatPipe} from "../initialformat.pipe";
import {Roleformat1Pipe} from "../roleformat1.pipe";

@NgModule({
  declarations: [DialogComponent,InitialformatPipe,Roleformat1Pipe],
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule],
  exports: [DialogComponent, InitialformatPipe]
})
export class DialogModule{}
