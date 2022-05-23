package com.fitness.service;

import com.fitness.entity.Course;
import com.fitness.entity.Result;
import com.github.pagehelper.PageInfo;

import java.util.List;

/**
 * @author: chiatso
 * @create: 2022-05-23 0:04
 * @description: 选课业务层接口
 */
public interface CourseService {

  /**
   * 获取所有选课信息
   * @return 课选信息集合
   */
  Result<List<Course>> getAllCourse();

  /**
   * 分页获取所有信息
   * @param startPage 起使页码
   * @param pageSize 页码容量
   * @return 课选信息集合
   */
  Result<PageInfo<Course>> getAllCourseByPage(Integer startPage, Integer pageSize);

  /**
   * 根据会员id分页获取选课信息
   * @param startPage 起使页码
   * @param pageSize 页码容量
   * @param memberId 会员id
   * @return 选课集合
   */
  Result<PageInfo<Course>> getCourseByMemberId(Integer startPage, Integer pageSize, String memberId);

  /**
   * 根据会员名称分页获取选课信息
   * @param startPage 起使页码
   * @param pageSize 页码容量
   * @param memberName 会员名称
   * @return 选课集合
   */
  Result<PageInfo<Course>> getCourseByMemberName(Integer startPage, Integer pageSize, String memberName);

  /**
   * 根据教练id分页获取教练教授课程
   * @param startPage 起使页码
   * @param pageSize 页码容量
   * @param coachId 课教集合
   * @return
   */
  Result<PageInfo<Course>> getCourseByCoachId(Integer startPage, Integer pageSize, String coachId);

  /**
   * 根据教练姓名获取所教授课程集合
   * @param startPage 起使页码
   * @param pageSize 页码容量
   * @param coachName 教练姓名
   * @return 课教集合
   */
  Result<PageInfo<Course>> getCourseByCoachName(Integer startPage, Integer pageSize, String coachName);

  /**
   * 新增课选
   * @param course 课选信息
   * @return 通用返回
   */
  Result insertCourse(Course course);

  /**
   * 更新课选
   * @param course 课选信息
   * @return 通用返回
   */
  Result updateCourse(Course course);

  /**
   * 根据会员id删除课选
   * @param memberId 会员id
   * @return 通用返回
   */
  Result deleteCourse(String memberId);

  /**
   * 模糊查询
   * @param startPage 起始页码
   * @param pageSize 页面容量
   * @param keyword 关键字
   * @return 数据集合
   */
  Result<PageInfo<Course>> getCourseByVague(Integer startPage, Integer pageSize, String keyword);
}
