import { Moment } from "moment"

export type ResponseResult<T = undefined> = {
  code: number,
  msg: string,
  data: T
}

export type LoginParams = {
  username: string,
  password: string,
  code: string,
}

export type CurrentUser = {
  username: string,
  type: '1' | '2',
  // avatar?: string;
  // userid?: string;
  // email?: string;
  // signature?: string;
  // title?: string;
  // group?: string;
  // tags?: { key?: string; label?: string }[];
  // notifyCount?: number;
  // unreadCount?: number;
  // country?: string;
  // access?: string;
  // geographic?: {
  //   province?: { label?: string; key?: string };
  //   city?: { label?: string; key?: string };
  // };
  // address?: string;
  // phone?: string;
}

export type Vip = {
  memberId: string,
  name: string,
  sex: string,
  birthday: string | Moment,
  address: string | string[],
  telNumber: string,
  registTime: number
}

export type Coach = {
  coachId: string,
  coachName: string,
  coachSex: string,
  coachBirth:  string | Moment,
  coachTel: string,
  entryTime: string,
  coachType: '1' | '2' | '3',
  coachLevel: '1' | '2' | '3'
}