package com.fitness.dao;

import com.fitness.entity.CourseMember;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author yao 2022/5/27
 */
@Mapper
public interface CourseMemberMapper {
    /**
     * 查询所有的课程-教练关系
     * @return
     */
    List<CourseMember> getAllCourseMember();

    /**
     * 根据会员（id，name）模糊查
     * @return
     */
    List<CourseMember> selectByMember(String memberKey);

    /**
     * 根据课程（id，name）模糊查
     * @return
     */
    List<CourseMember> selectByCourse(String courseKey);

    /**
     * 新增 课程-会员关系
     * @param courseId
     * @param memberId
     */
    void insertCourseMember(@Param("courseId") String courseId,@Param("memberIId") String memberId);

    // void updateCourseMember(CourseMember courseMember);

    /**
     * 删除 课程-会员关系
     * @param courseId
     * @param memberId
     */
    void deleteCourseMember(@Param("courseId") String courseId,@Param("memberIId") String memberId);
}
