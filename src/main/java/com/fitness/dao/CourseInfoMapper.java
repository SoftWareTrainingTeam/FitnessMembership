package com.fitness.dao;

import com.fitness.entity.CourseInfo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @author: chiatso
 * @create: 2022-05-22 15:37
 * @description: 课程信息持久层接口
 */
@Mapper
public interface CourseInfoMapper {

  /**
   * 根据id查询课程信息
   * @param id 课程id
   * @return 课程信息
   */
  CourseInfo getCourseInfoById(String id);

  /**
   * 查询所有课程信息
   * @return 课程信息
   */
  List<CourseInfo> getAllCourseInfo();

  /**
   * 根据课程名字模糊查询课程信息
   * @param keyword 关键字
   * @return 课程信息
   */
  List<CourseInfo> getAllCourseInfoByName(String keyword);


  /**
   * 新增课程信息
   * @param courseInfo 课程信息
   */
  void insertCourseInfo(CourseInfo courseInfo);

  /**
   * 更新课程信息
   * @param courseInfo 课程信息
   */
  void updateCourseInfo(CourseInfo courseInfo);

  /**
   * 根据id删除课程信息
   * @param id 课程id
   */
  void deleteCourseInfo(String id);

  /**
   * 查询所有课程信息数量
   * @return 课程信息数量
   */
  Integer getAllCourseInfoNumber();
}
