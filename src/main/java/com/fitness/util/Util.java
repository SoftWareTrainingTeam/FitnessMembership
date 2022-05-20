package com.fitness.util;

import org.springframework.util.DigestUtils;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
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
}
