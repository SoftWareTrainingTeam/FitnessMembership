package com.fitness.controller;

import com.fitness.entity.Coach;
import com.fitness.entity.Result;
import com.fitness.service.CoachService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


/**
 * @author: chiatso
 * @create: 2022-05-22 0:08
 * @description: 教练控制层
 */
@Controller
@RequestMapping("/api")
@ResponseBody
public class CoachController {
  private CoachService coachServiceImpl;

  @Autowired
  public CoachController(CoachService coachServiceImpl) {
    this.coachServiceImpl = coachServiceImpl;
  }

  /**
   * 分页查询教练信息
   * @param startPage 起使页码
   * @param pageSize 页码容量
   * @return 数据集合
   */
  @GetMapping("/coach/{startPage}/{pageSize}")
  public Result<PageInfo<Coach>> getCoachByPage(@PathVariable("startPage") Integer startPage,
                                                @PathVariable("pageSize") Integer pageSize) {
    return coachServiceImpl.getCoachByPage(startPage, pageSize);
  }

  /**
   * 模糊分页查询
   * @param startPage 起使页码
   * @param pageSize 页码容量
   * @param keyword 关键字
   * @return 数据集合
   */
  @GetMapping("/coach/{startPage}/{pageSize}/{keyword}")
  public Result<PageInfo<Coach>> getCoachByVague(@PathVariable("startPage") Integer startPage,
                                                @PathVariable("pageSize") Integer pageSize,
                                                @PathVariable("keyword") String keyword) {
    return coachServiceImpl.getCoachByVague(startPage, pageSize, keyword);
  }

  /**
   * 根据id查询教练信息
   * @param id 教练id
   * @return 教练信息
   */
  @GetMapping("/coach/{id}")
  public Result<Coach> getCoachById(@PathVariable("id") String id) {
    return coachServiceImpl.getCoachById(id);
  }

  /**
   * 注册教练，教练认证
   * @param coach 教练信息
   * @return 通用返回实体
   */
  @PostMapping("/coach")
  public Result registerCoach(@RequestBody Coach coach) {
    return coachServiceImpl.insertCoach(coach);
  }


  /**
   * 更新教练信息
   * @param coach 教练信息
   * @return 通用返回实体
   */
  @PutMapping("/coach")
  public Result updateCoach(@RequestBody Coach coach) {
    return coachServiceImpl.modifyCoach(coach);
  }

  @DeleteMapping("/coach/{id}")
  public Result deleteCoach(@PathVariable("id") String id) {
    return coachServiceImpl.deleteCoach(id);
  }

}
