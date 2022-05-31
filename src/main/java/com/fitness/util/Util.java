package com.fitness.util;

import org.springframework.util.DigestUtils;
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
    public static void get(){
        int a = 66696;
        // 解密算法
        for(int j=0;j<=31;++j){
            // 关键就是判断a&(1<<j)的值是否大于0
            int temp = a&(1<<j);
            if(temp>0){
                System.out.println("第"+(j+1)+"天签到了");
            }
        }
    }
}
