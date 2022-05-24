import { Moment } from "moment"

// 通用返回结果
export type ResponseResult<T = undefined> = {
  code: number,
  msg: string,
  data: T
}

// 登录参数
export type LoginParams = {
  username: string,
  password: string,
  code: string,
}

// 当前登录用户
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

// 会员
export type Vip = {
  memberId: string,
  name: string,
  sex: string,
  birthday: string | Moment,
  address: string | string[],
  telNumber: string,
  registTime: number
}

// 教练
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

// 课程
export type Course = {
  courseId: string,
  courseName: string,
  description: string,
  startTime:  string | Moment,
  frequency: string,
  price: number
}

export type CourseInfo = {
  coach: Coach,
  courseInfo: Course,
  member: Vip
}

// 器材分类
export type EquipCate = {
  typeId: number,
  type: string,
  producer: string,
  productNumber: string,
  price: number
}

// 器材
export type Equip = {
  equipId:  number,
  type: number,
  label: string,
  purchaseDate: string,
  available: number,
  equipType?: EquipCate
}