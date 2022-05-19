package com.fitness.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Timestamp;

/**
 * @author: chiatso
 * @create: 2022-05-19 15:55
 * @description: 会员实体类
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Member {
  //会员id
  private String memberId;
  //会员名字
  private String name;
  //会员性别
  private String sex;
  //会员生日
  private Timestamp birthday;
  //会员电话
  private String telNumber;
  //注册时间
  private Timestamp registTime;
  //会员地址
  private String address;
}
