package com.fitness.service;

import com.fitness.entity.Coach;
import com.fitness.entity.Result;
import com.github.pagehelper.PageInfo;

/**
 * @author: chiatso
 * @create: 2022-05-22 0:47
 * @description: 教练业务层
 */
public interface CoachService {

  /**
   * 教练分页查询信息
   * @param startPage 起使页码
   * @param pageSize 页码大小
   * @return 教练集合
   */
  Result<PageInfo<Coach>> getCoachByPage(Integer startPage, Integer pageSize);


  /**
   * 关键字模糊分页查询
   * @param startPage 起使页码
   * @param pageSize 页码容量
   * @param keyword 关键字
   * @return 教练集合
   */
  Result<PageInfo<Coach>> getCoachByVague(Integer startPage, Integer pageSize, String keyword);

  /**
   * 根据id查询教练信息
   * @param id 教练id
   * @return 教练信息
   */
  Result<Coach> getCoachById(String id);

  /**
   * 教练认证
   * @param coach 教练信息
   * @return 通用返回
   */
  Result insertCoach(Coach coach);

  /**
   * 更新教练信息
   * @param coach 教练信息
   * @return 通用返回
   */
  Result modifyCoach(Coach coach);

  /**
   * 教练取消认证
   * @param id 教练id
   * @return 通用返回
   */
  Result deleteCoach(String id);
}
