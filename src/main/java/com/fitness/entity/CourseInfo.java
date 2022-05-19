package com.fitness.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

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
public class CourseInfo {
  //课程id号
  private String courseId;
  //课程名称
  private String courseName;
  //课程描述
  private String description;
  //课程开始时间
  private Timestamp startTime;
  //授课次数
  private Integer frequency;
  //课程价格
  private Integer price;
}
