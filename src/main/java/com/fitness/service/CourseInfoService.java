package com.fitness.service;

import com.fitness.entity.CourseInfo;
import com.fitness.entity.Result;
import com.github.pagehelper.PageInfo;

/**
 * @author: chiatso
 * @create: 2022-05-22 15:55
 * @description: 课程信息业务层接口
 */
public interface CourseInfoService {

  /**
   * 分页查询课程信息
   * @param startPage 起使页码
   * @param pageSize 页面容量
   * @return 课程信息
   */
  Result<PageInfo<CourseInfo>> getCourseInfoByPage(Integer startPage, Integer pageSize);

  /**
   * 模糊分页查询
   * @param startPage 起使页码
   * @param pageSize 页面容量
   * @param keyword 关键字
   * @return 课程信息
   */
  Result<PageInfo<CourseInfo>> getCourseInfoByVague(Integer startPage, Integer pageSize, String keyword);

  /**
   * 根据id查询课程信息
   * @param id 课程id
   * @return 课程信息
   */
  Result<CourseInfo> getCourseInfoById(String id);

  /**
   * 新增课程信息
   * @param courseInfo 课程信息
   * @return 通用返回
   */
  Result insertCourseInfo(CourseInfo courseInfo);

  /**
   * 更新课程信息
   * @param courseInfo 课程i西南西
   * @return 通用返回
   */
  Result updateCourseInfo(CourseInfo courseInfo);

  /**
   * 根据id删除课程
   * @param id 课程id
   * @return 通用返回
   */
  Result deleteCourseInfo(String id);
}
