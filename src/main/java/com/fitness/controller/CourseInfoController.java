package com.fitness.controller;

import com.fitness.entity.CourseInfo;
import com.fitness.entity.Result;
import com.fitness.service.CourseInfoService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * @author: chiatso
 * @create: 2022-05-22 16:16
 * @description: TODO
 */
@Controller
@RequestMapping("/api")
@ResponseBody
public class CourseInfoController {

  private CourseInfoService courseInfoServiceImpl;

  @Autowired
  public CourseInfoController(CourseInfoService courseInfoServiceImpl) {
    this.courseInfoServiceImpl = courseInfoServiceImpl;
  }

  @GetMapping("/courseinfo/{startPage}/{pageSize}")
  public Result<PageInfo<CourseInfo>> getCourseInfoByPage(@PathVariable("startPage") Integer startPage,
                                                          @PathVariable("pageSize") Integer pageSize) {
    return courseInfoServiceImpl.getCourseInfoByPage(startPage, pageSize);
  }

  @GetMapping("/courseinfo/{startPage}/{pageSize}/{courseName}")
  public Result<PageInfo<CourseInfo>> getCourseInfoByName(@PathVariable("startPage") Integer startPage,
                                                          @PathVariable("pageSize") Integer pageSize,
                                                          @PathVariable("courseName") String courseName) {
    return courseInfoServiceImpl.getCourseInfoByVague(startPage, pageSize, courseName);
  }

  @GetMapping("/courseinfo/{id}")
  public Result<CourseInfo> getCourseInfoById(@PathVariable("id") String id) {
    return courseInfoServiceImpl.getCourseInfoById(id);
  }

  @PostMapping("/courseinfo")
  public Result addCourseInfo(@RequestBody CourseInfo courseInfo) {
    return courseInfoServiceImpl.insertCourseInfo(courseInfo);
  }

  @PutMapping("/courseinfo")
  public Result modifyCourseInfo(@RequestBody CourseInfo courseInfo) {
    return courseInfoServiceImpl.updateCourseInfo(courseInfo);
  }

  @DeleteMapping("/courseinfo/{id}")
  public Result deleteCourseInfo(@PathVariable("id") String id) {
    return courseInfoServiceImpl.deleteCourseInfo(id);
  }
}
