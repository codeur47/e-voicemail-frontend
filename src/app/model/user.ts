export class User {
  public userId: string;
  public firstName: string;
  public lastName: string;
  public username: string;
  public lastLoginDate: Date;
  public lastLoginDateDisplay: Date;
  public joinDate: Date;
  public active: boolean;
  public notLocked: boolean;
  public role: string;
  public authorities: [];

  constructor() {
    this.userId = '';
    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.lastLoginDate = new Date();
    this.lastLoginDateDisplay = new Date();
    this.joinDate = new Date();
    this.active = false;
    this.notLocked = false;
    this.role = '';
    this.authorities = [];
  }

}
