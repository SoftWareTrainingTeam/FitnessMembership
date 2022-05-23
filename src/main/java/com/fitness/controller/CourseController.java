package com.fitness.controller;

import com.fitness.entity.Course;
import com.fitness.entity.Result;
import com.fitness.service.CourseService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author: chiatso
 * @create: 2022-05-23 0:02
 * @description: 选课信息控制器
 */
@Controller
@ResponseBody
@RequestMapping("/api")
public class CourseController {

  private CourseService courseService;

  @Autowired
  public CourseController(CourseService courseService) {
    this.courseService = courseService;
  }

  // 获取所有课选信息
  @GetMapping("/course")
  public Result<List<Course>> getAllCourse() {
    return courseService.getAllCourse();
  }

  // 分页获取所有课选信息
  @GetMapping("/course/{startPage}/{pageSize}")
  public Result<PageInfo<Course>> getAllCourseByPage(@PathVariable("startPage") Integer startPage,
                                                     @PathVariable("pageSize") Integer pageSize) {
    return courseService.getAllCourseByPage(startPage, pageSize);
  }

  // 根据会员id获取课选信息
  @GetMapping("/course/{startPage}/{pageSize}/member/id/{memberId}")
  public Result<PageInfo<Course>> getCourseByMemberId(@PathVariable("startPage") Integer startPage,
                                                      @PathVariable("pageSize") Integer pageSize,
                                                      @PathVariable("memberId") String memberId) {
    return courseService.getCourseByMemberId(startPage, pageSize, memberId);
  }

  // 根据会员名称分页获取选课
  @GetMapping("/course/{startPage}/{pageSize}/member/name/{memberName}")
  public Result<PageInfo<Course>> getCourseByMemberName(@PathVariable("startPage") Integer startPage,
                                                      @PathVariable("pageSize") Integer pageSize,
                                                      @PathVariable("memberName") String memberName) {
    return courseService.getCourseByMemberName(startPage, pageSize, memberName);
  }

  // 根据教练id分页获取教练所教课程
  @GetMapping("/course/{startPage}/{pageSize}/coach/id/{coachId}")
  public Result<PageInfo<Course>> getCourseByCoachId(@PathVariable("startPage") Integer startPage,
                                                        @PathVariable("pageSize") Integer pageSize,
                                                        @PathVariable("coachId") String coachId) {
    return courseService.getCourseByCoachId(startPage, pageSize, coachId);
  }

  // 根据会员名称分页获取选课
  @GetMapping("/course/{startPage}/{pageSize}/coach/name/{coachName}")
  public Result<PageInfo<Course>> getCourseByCoachName(@PathVariable("startPage") Integer startPage,
                                                        @PathVariable("pageSize") Integer pageSize,
                                                        @PathVariable("coachName") String coachName) {
    return courseService.getCourseByCoachName(startPage, pageSize, coachName);
  }

  // 新增课选
  @PostMapping("/course")
  public Result addCourse(@RequestBody Course course) {
    return courseService.insertCourse(course);
  }

  // 更新课选
  @PutMapping("/course")
  public Result modifyCourse(@RequestBody Course course) {
    return courseService.updateCourse(course);
  }

  // 删除课选
  @DeleteMapping("/course/{memberId}")
  public Result removeCourse(@PathVariable("memberId") String memberId) {
    return courseService.deleteCourse(memberId);
  }
}
