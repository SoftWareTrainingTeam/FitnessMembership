package com.fitness.dao;

import com.fitness.entity.Coach;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @author: chiatso
 * @create: 2022-05-20 16:59
 * @description: 教练接口层
 */
@Mapper
public interface CoachMapper {

  /**
   * 根据id查询教练
   * @param id 教练id
   * @return  教练信息
   */
  Coach getCoachById(String id);

  /**
   * 查询所有教练
   * @return
   */
  List<Coach> getAllCoaches();

  /**
   * 根据关键字模拟查询教练信息
   * @param keyword
   * @return
   */
  List<Coach> getCoachByVague(String keyword);

  /**
   * 查询所有教练数量
   * @return 教练数量
   */
  Integer getAllCoachesNumber();

  /**
   * 注册新教练
   * @param coach 教练信息
   */
  void insertCoach(Coach coach);

  /**
   * 注销教练信息
   * @param id 教练id
   */
  void deleteCoach(String id);

  /**
   * 更新教练消息
   * @param coach 教练消息
?   */
  void updateCoach(Coach coach);
}
