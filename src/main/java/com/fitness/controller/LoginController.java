package com.fitness.controller;

import com.fitness.entity.Result;
import com.fitness.service.UserService;
import com.google.code.kaptcha.Producer;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

import static com.fitness.entity.Result.ERROR;
import static com.fitness.entity.Result.OK;

/**
 * @author yao 2022/5/18
 */
@Controller
public class LoginController {

    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    private Producer producer;

    @Autowired
    private UserService userService;

    /**
     * 用来请求验证码的API
     * @param session
     */
    @RequestMapping(path = "/api/captcha", method = RequestMethod.GET)
    @ResponseBody
    public Result<String> getCaptcha(HttpSession session) {
        Result<String> result = new Result<>();
        // 获取四位字符串
        String text = producer.createText();
        // 生成图片
        BufferedImage image = producer.createImage(text);
        // 验证码存入session
        session.setAttribute("captcha", text);
        String base64Image;
        try {
            ByteArrayOutputStream stream = new ByteArrayOutputStream();
            ImageIO.write(image, "png", stream);
            base64Image = "data:image/png;base64,"+Base64Utils.encodeToString(stream.toByteArray());
        } catch (IOException e) {
            logger.error("响应验证码失败"+e.getMessage());
            result.setCode(ERROR);
            result.setMsg("验证码生成失败");
            return result;
        }
        result.setCode(OK);
        result.setMsg("验证码生成成功");
        result.setData(base64Image);
        return result;
    }

    /**
     * 登录方法
     * @return 返回Result类的data属性类型为String，是保存了用户信息的token
     */
    @RequestMapping(path = "/api/login", method = RequestMethod.POST)
    @ResponseBody
    public Result<String> login(String username, String password, String code, HttpSession session) {
        Result<String> result = new Result<>();
        // 取得生成的验证码
        String captcha = (String) session.getAttribute("captcha");

        if(StringUtils.isBlank(captcha)||StringUtils.isBlank(code)||!captcha.equalsIgnoreCase(code)){
            result.setCode(ERROR);
            result.setMsg("验证码错误");
            return result;
        }

        result = userService.login(username, password);

        return result;
    }
}
