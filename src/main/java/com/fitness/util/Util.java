package com.fitness.util;

import org.springframework.util.DigestUtils;

import java.util.Calendar;
import java.util.UUID;

/**
 * @author yao 2022/5/18
 */
public class Util {

    /**
     * 生成随机字符串
     *
     * @return
     */
    public static String generateUUID() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }

    /**
     * 获取MD5算法加密后的字符
     * @param key
     * @return
     */
    public static String getMd5(String key) {
        if (key == null) {
            return null;
        }
        return DigestUtils.md5DigestAsHex(key.getBytes());
    }

    /**
     * 这个方法用来更新mask
     * @param date 这个月的第几天
     * @param mask 原本的mask
     * @return
     */
    public static int updateMask(int date,int mask){
        mask = mask | (1<<date-1);
        return mask;
    }
    public static boolean signInOrNot(int mask){
        Calendar calendar = Calendar.getInstance();
        int temp = calendar.get(Calendar.DATE)-1;

        temp = mask&(1<<temp);
        if (temp>0){
            return true;
        }
        return  false;
    }
}
