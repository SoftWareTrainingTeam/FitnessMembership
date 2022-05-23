package com.fitness.dao;

import com.fitness.entity.Course;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @author: chiatso
 * @create: 2022-05-22 22:52
 * @description: 选课持久层接口
 */
@Mapper
public interface CourseMapper {

  /**
   * 获取所有的选课信息
   * @return 选课信息集合
   */
  List<Course> getAllCourse();

  /**
   * 根据会员id查询选课信息
   * @param memberId 会员id
   * @return 选课集合
   */
  List<Course> getCourseByMemberId(String memberId);


  /**
   * 根据会员名字查询选课信息
   * @param memberName 会员名字
   * @return 选课信息集合
   */
  List<Course> getCourseByMemberName(String memberName);


  /**
   * 根据教练id查询选课信息
   * @param coachId 教练id
   * @return 选课信息集合
   */
  List<Course> getCourseByCoachId(String coachId);

  /**
   * 根据教练名查询选课信息
   * @param coachName 教练名
   * @return 选课信息
   */
  List<Course> getCourseByCoachName(String coachName);

  /**
   * 新增选课
   * @param course 选课信息
   */
  void insertCourse(Course course);

  /**
   * 更新选课（根据会员id更新选课）
   * @param course 可选信息
   */
  void updateCourse(Course course);

  /**
   * 根据会员id删除课选
   * @param memberId
   */
  void deleteCourse(String memberId);

  /**
   * 根据会员id获取选课数量
   * @param memberId 会员id
   * @return 选课数量
   */
  Integer getMemberCourseNumber(String memberId);

  /**
   * 根据教练id获取授课数量
   * @param coachId 教练id
   * @return 授课数量
   */
  Integer getCoachCourseNumber(String coachId);

  /**
   * 根据课程信息id获取该课程被选数量
   * @param courseId 课程信息id
   * @return 被选数量
   */
  Integer getCourseInfoNumber(String courseId);

  /**
   * 模糊查询
   * @param keyword 关键字
   * @return 备选集合
   */
  List<Course> getCourseByVague(String keyword);
}
