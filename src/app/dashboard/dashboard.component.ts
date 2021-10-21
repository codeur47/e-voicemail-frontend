import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../model/user";
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {NotificationService} from "../service/notification.service";
import {AuthenticationService} from "../service/authentication.service";
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogType} from "../enum/dialog.type";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserRequest} from "../model/user.request";
import {Subscription} from "rxjs";
import {Role} from "../enum/role.enum";
import {UserResponse} from "../model/user.response";
import { CustomHttpResponse } from '../model/custom-http-response';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashBoardComponent implements OnInit, OnDestroy {

  public user: User;
  minWidth: string = '500px';

  user_deletion = DialogType.USER_DELETION;
  user_creation = DialogType.USER_CREATION;
  user_information = DialogType.USER_INFORMATION;
  user_update = DialogType.USER_UPDATE;
  user_alert = DialogType.USER_ALERT;

  userForm: FormGroup;
  userRequest: UserRequest = {
    firstName: '',
    lastName: '',
    username: '',
    active: false,
    notLocked: false,
    role: '',
    supId: '',
    themeId: 0,
    oldUsername: ''
  };

  dialogType = "";
  private subscriptions: Subscription[] = [];
  public users: User[];
  public supervisors: UserResponse[];
  public simpleUsers: UserResponse[];
  public refreshing: boolean;
  public selectedUser: UserResponse;
  userResponses: UserResponse[];
  circleTheme= ['dark','danger','info', 'primary','success', 'warning'];
  theme: string;


  constructor(private router: Router, private authenticationService: AuthenticationService,
              private userService: UserService, private notificationService: NotificationService,
              public dialog: MatDialog,fb: FormBuilder) {
    this.userForm = fb.group(this.userRequest);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
    this.getUsers();
    this.initUserForm();
  }

  openDialog(dialogType: string, selectedUser?: UserResponse) {
    this.dialogType = dialogType;
    if (selectedUser != undefined){
      this.selectedUser = selectedUser;
      if (this.selectedUser.simpleUserResponses != undefined){
        if (this.selectedUser.role == Role.SUPERVISOR)
        if (this.selectedUser.simpleUserResponses.length > 0){
          this.dialogType = this.user_alert;
        }
      }
    }
    if (this.dialogType == this.user_update) {
      this.initUserForm(this.selectedUser);
    }
    if (this.dialogType == this.user_creation) {
      this.initUserForm();
    }
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        userForm: this.userForm,
        dialogType: this.dialogType,
        selectedUser: this.selectedUser,
        users: this.users,
        supervisors: this.supervisors,
        simpleUserResponses: selectedUser?.simpleUserResponses
      },
      minWidth: this.minWidth
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && this.dialogType == this.user_creation) {
        this.addUser();
      }
      if (result && this.dialogType == this.user_update) {
        this.addUser();
      }
      if (result && this.dialogType == this.user_deletion) {
        this.deleteUser();
      }
    })
  }


  public deleteUser(): void {
    this.subscriptions.push(
      this.userService.deleteUser(this.selectedUser.username).subscribe(
        (response: CustomHttpResponse) => {
          this.getUsers();
        }
      )
    );
  }


  addUser() {
    this.userRequest.firstName = this.userForm.get('firstName')?.value;
    this.userRequest.lastName = this.userForm.get('lastName')?.value;
    this.userRequest.username = this.userForm.get('username')?.value;
    this.userRequest.active = this.userForm.get('active')?.value;
    this.userRequest.notLocked = this.userForm.get('notLocked')?.value;
    this.userRequest.role = this.userForm.get('role')?.value;
    this.userRequest.supId = this.userForm.get('supId')?.value;
    if(this.user_creation == this.dialogType)
      this.userRequest.themeId = this.generateCircleThemesIndex();
    if(this.user_update == this.dialogType)
      this.userRequest.oldUsername = this.selectedUser.username;

    if(this.user_creation == this.dialogType){
      this.subscriptions.push(
        this.userService.addUser(this.userRequest).subscribe(
          (response: UserResponse) => {
            this.getUsers();
            this.userForm.reset();
          }
        )
      )
    }
    if(this.user_update == this.dialogType) {
      this.subscriptions.push(
        this.userService.updateUser(this.userRequest).subscribe(
          (response: UserResponse) => {
            this.getUsers();
            this.userForm.reset();
          }
        )
      )
    }
  }

  getUsers(){
    this.refreshing = true;
    this.subscriptions.push(
      this.userService.getUsers().subscribe(
        (response: UserResponse[]) => {
          this.userService.addUsersToLocalCache(response);
          this.userResponses = response;
          this.supervisors = this.userResponses.filter(user => user.role === Role.SUPERVISOR);
          this.simpleUsers = this.userResponses.filter(user => user.role === Role.USER);
          this.refreshing = false;
        }
      )
    );
  }

  initUserForm(selectedUser?: UserResponse): void {
    if (selectedUser == undefined){
      this.userForm = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        username: new FormControl('', Validators.required),
        active: new FormControl(false, Validators.required),
        notLocked: new FormControl(false, Validators.required),
        role: new FormControl('', Validators.required),
        supId: new FormControl('')
      });
    }else {
      this.userForm = new FormGroup({
        firstName: new FormControl(selectedUser.firstName, Validators.required),
        lastName: new FormControl(selectedUser.lastName, Validators.required),
        username: new FormControl(selectedUser.username, Validators.required),
        active: new FormControl(selectedUser.active, Validators.required),
        notLocked: new FormControl(selectedUser.notLocked, Validators.required),
        role: new FormControl(selectedUser.role, Validators.required),
        supId: new FormControl(selectedUser.supId)
      });
    }

  }

  generateCircleThemes(randomIndex: number): string{
    return this.circleTheme[randomIndex];
  }

  generateCircleThemesIndex(): number {
    return Math.floor(Math.random() * 5);
  }

}
