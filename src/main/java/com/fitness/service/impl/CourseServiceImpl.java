package com.fitness.service.impl;

import com.fitness.dao.CourseMapper;
import com.fitness.entity.Course;
import com.fitness.entity.Result;
import com.fitness.exception.PageNumberException;
import com.fitness.service.CourseService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author: chiatso
 * @create: 2022-05-23 0:05
 * @description: 选课信息业务层实现
 */
@Service
@Transactional
public class CourseServiceImpl implements CourseService {

  private CourseMapper courseMapper;

  @Autowired
  public CourseServiceImpl(CourseMapper courseMapper) {
    this.courseMapper = courseMapper;
  }

  @Override
  public Result<List<Course>> getAllCourse() {
    return new Result<>(Result.OK, "获取成功~", courseMapper.getAllCourse());
  }

  @Override
  public Result<PageInfo<Course>> getAllCourseByPage(Integer startPage, Integer pageSize) {
    if(startPage < 1)
      throw new PageNumberException("起使页码无效~");
    Page<Course> pageHelper = PageHelper.startPage(startPage, pageSize);
    List<Course> allCourse = courseMapper.getAllCourse();
    PageInfo<Course> pageInfo = new PageInfo<>(allCourse);
    return new Result<PageInfo<Course>>(Result.OK, "获取成功~", pageInfo);
  }

  @Override
  public Result<PageInfo<Course>> getCourseByMemberId(Integer startPage, Integer pageSize, String memberId) {
    if(startPage < 1)
      throw new PageNumberException("起使页码无效~");
    Page<Course> pageHelper = PageHelper.startPage(startPage, pageSize);
    List<Course> allCourse = courseMapper.getCourseByMemberId(memberId);
    PageInfo<Course> pageInfo = new PageInfo<>(allCourse);
    return new Result<PageInfo<Course>>(Result.OK, "获取成功~", pageInfo);
  }

  @Override
  public Result<PageInfo<Course>> getCourseByMemberName(Integer startPage, Integer pageSize, String memberName) {
    if(startPage < 1)
      throw new PageNumberException("起使页码无效~");
    Page<Course> pageHelper = PageHelper.startPage(startPage, pageSize);
    List<Course> allCourse = courseMapper.getCourseByMemberName(memberName);
    PageInfo<Course> pageInfo = new PageInfo<>(allCourse);
    return new Result<PageInfo<Course>>(Result.OK, "获取成功~", pageInfo);
  }

  @Override
  public Result<PageInfo<Course>> getCourseByCoachId(Integer startPage, Integer pageSize, String coachId) {
    if(startPage < 1)
      throw new PageNumberException("起使页码无效~");
    Page<Course> pageHelper = PageHelper.startPage(startPage, pageSize);
    List<Course> allCourse = courseMapper.getCourseByCoachId(coachId);
    PageInfo<Course> pageInfo = new PageInfo<>(allCourse);
    return new Result<PageInfo<Course>>(Result.OK, "获取成功~", pageInfo);
  }

  @Override
  public Result<PageInfo<Course>> getCourseByCoachName(Integer startPage, Integer pageSize, String coachName) {
    if(startPage < 1)
      throw new PageNumberException("起使页码无效~");
    Page<Course> pageHelper = PageHelper.startPage(startPage, pageSize);
    List<Course> allCourse = courseMapper.getCourseByCoachName(coachName);
    PageInfo<Course> pageInfo = new PageInfo<>(allCourse);
    return new Result<PageInfo<Course>>(Result.OK, "获取成功~", pageInfo);
  }

  @Override
  public Result insertCourse(Course course) {
    courseMapper.insertCourse(course);
    return new Result(Result.OK, "选课成功~");
  }

  @Override
  public Result updateCourse(Course course) {
    courseMapper.updateCourse(course);
    return new Result(Result.OK, "修改成功~~");
  }

  @Override
  public Result deleteCourse(String memberId) {
    courseMapper.deleteCourse(memberId);
    return new Result(Result.OK, "删除成功~");
  }
}
