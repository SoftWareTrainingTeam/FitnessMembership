package com.fitness.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.sql.Timestamp;

/**
 * @author: chiatso
 * @create: 2022-05-19 15:50
 * @description: 课程信息实体类
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CourseInfo implements Serializable {
  //课程id号 自增
  private String courseId;

  //课程名称
  @NotNull(message = "课程名为空~")
  private String courseName;

  //课程描述
  private String description;

  //课程开始时间
  @NotNull(message = "课程开始时间为空~")
  private Timestamp startTime;

  //授课次数
  @NotNull(message = "周授课次数为空~")
  private Integer frequency;

  //课程价格
  @NotNull(message = "课程价格为空~")
  @Digits(integer = 0, fraction = 9999, message = "价格必须在0-9999的数字~")
  private Integer price;

  // 课程容量
  @NotNull(message = "课程容量为空")
  @Digits(integer = 1,fraction = 100,message = "课程容量限于1~100")
  private Integer capacity;

  private CourseCoach courseCoach;
}
