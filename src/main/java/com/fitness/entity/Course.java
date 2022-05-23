package com.fitness.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;

/**
 * @author: chiatso
 * @create: 2022-05-22 17:59
 * @description: 选课信息实体类
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Course implements Serializable {
  //教练
  private Coach coach;

  //会员
  private Member member;

  //课程
  private CourseInfo courseInfo;
}
