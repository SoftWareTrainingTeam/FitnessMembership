package com.fitness.service.impl;

import com.fitness.dao.CoachMapper;
import com.fitness.dao.CourseMapper;
import com.fitness.entity.Coach;
import com.fitness.entity.Result;
import com.fitness.exception.PageNumberException;
import com.fitness.service.CoachService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author: chiatso
 * @create: 2022-05-22 0:50
 * @description: 教练业务实现类
 */
@Service
@Transactional
public class CoachServiceImpl implements CoachService {

  private CoachMapper coachMapper;

  private CourseMapper courseMapper;

  @Autowired
  public CoachServiceImpl(CoachMapper coachMapper, CourseMapper courseMapper) {
    this.coachMapper = coachMapper;
    this.courseMapper = courseMapper;
  }

  @Override
  public Result<PageInfo<Coach>> getCoachByPage(Integer startPage, Integer pageSize) {
    if(startPage < 1) {
      throw new PageNumberException("起使页码必须大于等于1~");
    }
    Page<Coach> coaches = PageHelper.startPage(startPage, pageSize);
    List<Coach> allCoaches = coachMapper.getAllCoaches();
    PageInfo<Coach> pageInfo = new PageInfo<>(allCoaches);
    return new Result<PageInfo<Coach>>(Result.OK, "查询成功~", pageInfo);
  }

  @Override
  public Result<PageInfo<Coach>> getCoachByVague(Integer startPage, Integer pageSize, String keyword) {
    if(startPage < 1) {
      throw new PageNumberException("起使页码必须大于等于1~");
    }
    Page<Coach> coaches = PageHelper.startPage(startPage, pageSize);
    List<Coach> allCoaches = coachMapper.getCoachByVague(keyword);
    PageInfo<Coach> pageInfo = new PageInfo<>(allCoaches);
    return new Result<PageInfo<Coach>>(Result.OK, "查询成功~", pageInfo);
  }

  @Override
  public Result<Coach> getCoachById(String id) {
    Coach coach = coachMapper.getCoachById(id);
    return new Result<Coach>(Result.OK, "查询成功~", coach);
  }

  @Override
  public Result insertCoach(Coach coach) {
    coachMapper.insertCoach(coach);
    return new Result(Result.OK, "认证成功~");
  }

  @Override
  public Result modifyCoach(Coach coach) {
    coachMapper.updateCoach(coach);
    return new Result(Result.OK, "修改成功~");
  }

  @Override
  public Result deleteCoach(String id) {
    if(courseMapper.getCoachCourseNumber(id) > 0) {
      return new Result(Result.PARAMETER_ERROR, "该教练有未完成的课程，暂不能注销~");
    }
    coachMapper.deleteCoach(id);
    return new Result(Result.OK, "注销成功~");
  }
}
