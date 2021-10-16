import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {DialogType} from "../enum/dialog.type";

@Component({
  templateUrl: './dialog.component.html'
})
export class DialogComponent {

  user_deletion = DialogType.USER_DELETION;
  user_creation = DialogType.USER_CREATION;
  user_information = DialogType.USER_INFORMATION;
  user_update = DialogType.USER_UPDATE;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
