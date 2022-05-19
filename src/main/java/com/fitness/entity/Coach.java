package com.fitness.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Timestamp;

/**
 * @author: chiatso
 * @create: 2022-05-19 15:38
 * @description: 教练实体类
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Coach {
  //教练id
  private String coachId;
  //教练姓名
  private String coachName;
  //教练性别
  private String coachSex;
  //教练出生日期
  private Timestamp coachBirth;
  //教练电话
  private String coachTel;
  //教练入职时间
  private Timestamp entryTime;
  //教练类型 1.巡场 2.团操 3.私人
  private Character coachType;
  //教练等级 1.初级 2.中级 3.高级
  private Character coachLevel;
}
