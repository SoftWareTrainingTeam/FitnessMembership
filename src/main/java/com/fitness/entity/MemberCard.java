package com.fitness.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

/**
 * @author yao 2022/6/1
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MemberCard {

    private String id;

    private int type;

    private int times;

    private Date expireTime;

    // private Member member;
    private int memberId;
}
