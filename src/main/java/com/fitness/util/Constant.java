package com.fitness.util;

/**
 * @author yao 2022/5/19
 */

/**
 * 字段定义，避免魔法值
 * @author yaosu
 */
public interface Constant {

    /**
     * 管理员类型
     */
    int MANAGER_TYPE=1;

    /**
     * 超级管理员类型
     */
    int SUPER_MANAGER_TYPE=2;

    /**
     * 密码MD5加密的额外字段
     */
    String PASSWORD_APPEND = "Asd!123e";

    String BEGIN_OF_TEL ="1";

    String BEGIN_OF_MEMBER_CARD ="5";

    int LENGTH_OF_TEL=11;

    int LENGTH_OF_MEMBER_CARD_ID = 10;
}
