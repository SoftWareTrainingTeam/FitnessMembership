package com.fitness.dao;

import com.fitness.entity.CourseCoach;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author yao 2022/5/27
 */
@Mapper
public interface CourseCoachMapper {
    /**
     * 查询所有的课程-教练关系
     * @return
     */
    List<CourseCoach> getAllCourseCoach();

    /**
     * 根据教练（id，name）模糊查
     * @return
     */
    List<CourseCoach> selectByCoach(String coachKey);

    /**
     * 根据课程（id，name）模糊查
     * @return
     */
    List<CourseCoach> selectByCourse(String courseKey);

    CourseCoach selectOne(@Param("courseId") int courseId,@Param("coachId") int coachId);

    /**
     * 实体类属性是两个引用，所以这里参数不是对象
     * @param courseId
     * @param coachId
     */
    void insertCourseCoach(@Param("courseId") int courseId,@Param("coachId") int coachId);

    // void updateCourseCoach(CourseCoach courseCoach);
    // 这两个关系表不应该有update方法

    /**
     * 两个字段共同作为主键，两个参数才能确定一条记录
     * @param courseId
     * @param coachId
     */
    void deleteCourseCoach(@Param("courseId") int courseId,@Param("coachId") int coachId);

    /**
     * 获取教练的所授课程数量
     * @param coachId
     * @return
     */
    Integer getCoachCourseNumber(String coachId);
}
