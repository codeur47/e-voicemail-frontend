import {SimpleUserResponse} from "./simpleuser.response";

export interface UserResponse {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  lastLoginDate: Date
  joinDate:Date
  role: string;
  authorities:[]
  supId: string;
  active: boolean;
  notLocked: boolean;
  simpleUserResponses: SimpleUserResponse[];
  themeId: number;
}
