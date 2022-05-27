package com.fitness.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.io.Serializable;
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
public class Member implements Serializable {
  //会员id
  private String memberId;

  //会员名字
  @NotNull(message = "会员名字为空~")
  private String name;

  //会员性别
  @NotNull(message = "会员性别为空~")
  private String sex;

  //会员生日
  @NotNull(message = "会员生日为空~")
  private Timestamp birthday;

  //会员电话
  @NotNull(message = "电话号码为空~")
  @Length(min = 11, max = 11, message = "电话号码长度为11位有效数字~")
  @Pattern(regexp = "^1[34578]\\d{9}$", message = "不符合规格的手机号码~")
  private String telNumber;

  //注册时间
  @NotNull(message = "注册时间为空~")
  private Timestamp registTime;

  //会员地址
  private String address;

  // 账户余额，可以为空
  private double balance;
}
