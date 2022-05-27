package com.fitness.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author yao 2022/5/27
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CourseMember {

    /**
     * 会员引用
     */
    private Member member;

    /**
     * 课程引用
     */
    private CourseInfo courseInfo;
}
