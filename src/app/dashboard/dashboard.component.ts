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
import {SimpleUserResponse} from "../model/simpleuser.response";

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

  userForm: FormGroup;
  userRequest: UserRequest = {
    firstName: '',
    lastName: '',
    username: '',
    active: false,
    notLocked: false,
    role: '',
    supId: ''
  };

  dialogType = "";
  private subscriptions: Subscription[] = [];
  public users: User[];
  public supervisors: UserResponse[];
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
  }

  ngOnInit(): void {
    this.theme = this.generateCircleThemes();
    this.user = this.authenticationService.getUserFromLocalCache();
    this.getUsers();
    this.initUserForm();
  }

  openDialog(dialogType: string, selectedUser?: UserResponse) {
    this.dialogType = dialogType;
    if (selectedUser != undefined)
      this.selectedUser = selectedUser;
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
      if (result) {
        this.addUser();
      }
    })
  }


  addUser() {
    this.userRequest.firstName = this.userForm.get('firstName')?.value;
    this.userRequest.lastName = this.userForm.get('lastName')?.value;
    this.userRequest.username = this.userForm.get('username')?.value;
    this.userRequest.active = this.userForm.get('active')?.value;
    this.userRequest.notLocked = this.userForm.get('notLocked')?.value;
    this.userRequest.role = this.userForm.get('role')?.value;
    this.userRequest.supId = this.userForm.get('supId')?.value;

    this.subscriptions.push(
      this.userService.addUser(this.userRequest).subscribe(
        (response: User) => {
          this.getUsers();
          this.userForm.reset();
        }
      )
    )
  }

  getUsers(){
    this.refreshing = true;
    this.subscriptions.push(
      this.userService.getUsers().subscribe(
        (response: UserResponse[]) => {
          this.userService.addUsersToLocalCache(response);
          this.userResponses = response;
          this.supervisors = this.userResponses.filter(user => user.role === Role.SUPERVISOR);
          this.refreshing = false;
        }
      )
    );
  }

  initUserForm(): void {
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      active: new FormControl(false, Validators.required),
      notLocked: new FormControl(false, Validators.required),
      role: new FormControl('', Validators.required),
      supId: new FormControl('')
    });
  }

  generateCircleThemes(): string{
    const randomIndex = Math.floor(Math.random() * 5);
    return this.circleTheme[randomIndex];
  }

}
