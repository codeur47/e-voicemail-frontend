import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {DialogComponent} from "./dialog.component";

@NgModule({
  declarations: [DialogComponent],
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule],
  exports: [DialogComponent ]
})
export class DialogModule{}
