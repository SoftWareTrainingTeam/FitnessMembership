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

  // 分页获取所有课选信息
  @GetMapping("/course/{startPage}/{pageSize}")
  public Result<PageInfo<Course>> getAllCourseByPage(@PathVariable("startPage") Integer startPage,
                                                     @PathVariable("pageSize") Integer pageSize) {
    return courseService.getAllCourseByPage(startPage, pageSize);
  }

  // 根据会员id或者name或者教练id或者name模糊查询
  @GetMapping("/course/{startPage}/{pageSize}/{keyword}")
  public Result<PageInfo<Course>> getCourseByVague(@PathVariable("startPage") Integer startPage,
                                                   @PathVariable("pageSize") Integer pageSize,
                                                   @PathVariable("keyword") String keyword) {
    return courseService.getCourseByVague(startPage, pageSize, keyword);
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
