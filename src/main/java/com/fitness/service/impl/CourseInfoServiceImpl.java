package com.fitness.service.impl;

import com.fitness.dao.CourseInfoMapper;
import com.fitness.dao.CourseMapper;
import com.fitness.entity.CourseInfo;
import com.fitness.entity.Result;
import com.fitness.exception.PageNumberException;
import com.fitness.service.CourseInfoService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author: chiatso
 * @create: 2022-05-22 16:20
 * @description: TODO
 */
@Service
@Transactional
public class CourseInfoServiceImpl implements CourseInfoService {

  private CourseInfoMapper courseInfoMapper;

  private CourseMapper courseMapper;

  @Autowired
  public CourseInfoServiceImpl(CourseInfoMapper courseInfoMapper, CourseMapper courseMapper) {
    this.courseInfoMapper = courseInfoMapper;
    this.courseMapper = courseMapper;
  }
  @Override
  public Result<PageInfo<CourseInfo>> getCourseInfoByPage(Integer startPage, Integer pageSize) {
    if (startPage < 1)
      throw new PageNumberException("起使页码无效~");
    Page<CourseInfo> pageHelper = PageHelper.startPage(startPage, pageSize);
    List<CourseInfo> allCourseInfo = courseInfoMapper.getAllCourseInfo();
    PageInfo<CourseInfo> pageInfo = new PageInfo<>(allCourseInfo);
    return new Result<>(Result.OK, "查询成功~", pageInfo);
  }

  @Override
  public Result<PageInfo<CourseInfo>> getCourseInfoByVague(Integer startPage, Integer pageSize, String keyword) {
    if (startPage < 1)
      throw new PageNumberException("起使页码无效~");
    Page<CourseInfo> pageHelper = PageHelper.startPage(startPage, pageSize);
    List<CourseInfo> allCourseInfo = courseInfoMapper.getAllCourseInfoByName(keyword);
    PageInfo<CourseInfo> pageInfo = new PageInfo<>(allCourseInfo);
    return new Result<>(Result.OK, "查询成功~", pageInfo);
  }

  @Override
  public Result<CourseInfo> getCourseInfoById(String id) {
    CourseInfo courseInfo = courseInfoMapper.getCourseInfoById(id);
    return new Result<CourseInfo>(Result.OK, "查询成功~", courseInfo);
  }

  @Override
  public Result insertCourseInfo(CourseInfo courseInfo) {
    courseInfoMapper.insertCourseInfo(courseInfo);
    return new Result(Result.OK, "添加成功~");
  }

  @Override
  public Result updateCourseInfo(CourseInfo courseInfo) {
    courseInfoMapper.updateCourseInfo(courseInfo);
    return new Result(Result.OK, "修改成功~");
  }

  @Override
  public Result deleteCourseInfo(String id) {
    if(courseMapper.getCourseInfoNumber(id) > 0) {
      return new Result(Result.OK, "该课程被选修中，暂不能删除~");
    }
    courseInfoMapper.deleteCourseInfo(id);
    return new Result(Result.OK, "删除成功~");
  }
}
