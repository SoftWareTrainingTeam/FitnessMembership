package com.fitness.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
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
  @NotNull(message = "姓名为空~")
  private String coachName;

  //教练性别
  @NotNull(message = "性别为空~")
  private String coachSex;

  //教练出生日期
  @NotNull(message = "出生日期为空~")
  private Timestamp coachBirth;

  //教练电话
  @NotNull(message = "电话号码为空~")
  @Length(min = 11, max = 11, message = "电话号码长度为11位有效数字~")
  @Pattern(regexp = "^1[34578]\\d{9}$", message = "不符合规格的手机号码~")
  private String coachTel;

  //教练入职时间
  @NotNull(message = "入职时间为空~")
  private Timestamp entryTime;

  //教练类型 1.巡场 2.团操 3.私人
  @NotNull(message = "教练类型为空~[123]")
  @Pattern(regexp = "%^[123]$", message = "必须规定123中的一种类型~")
  private Character coachType;

  //教练等级 1.初级 2.中级 3.高级
  @NotNull(message = "教练等级为空~[123]")
  @Pattern(regexp = "%^[123]$", message = "必须规定123中的一种等级~")
  private Character coachLevel;
}
