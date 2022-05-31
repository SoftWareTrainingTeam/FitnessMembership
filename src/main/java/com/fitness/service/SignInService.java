package com.fitness.service;

import com.fitness.dao.MemberCardMapper;
import com.fitness.dao.MemberMapper;
import com.fitness.dao.SignInMapper;
import com.fitness.entity.MemberCard;
import com.fitness.entity.Result;
import com.fitness.entity.SignIn;
import com.fitness.util.Constant;
import com.fitness.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;

/**
 * @author yao 2022/5/29
 */
@Service
public class SignInService implements Constant {

    @Autowired
    MemberMapper memberMapper;

    @Autowired
    MemberCardMapper memberCardMapper;

    @Autowired
    SignInMapper signInMapper;

    public Result<?> signIn(String identityCode) {
        Result<?> result = new Result<>();
        // 解密MD5字符串
        // 匹配电话号码/会员卡号

        // 传入字符以1打头，那么假设它是手机号码
        if (BEGIN_OF_TEL.equals(identityCode.substring(0, 1))) {
            // 检查手机号码长度
            if (identityCode.length() != LENGTH_OF_TEL) {
                result.setCode(Result.ERROR);
                result.setMsg("手机号码格式错误 应为1开头的11位数字");
                return result;
            }
            // 按照手机号码去查用户id，检查是不是会员
            int id = memberMapper.selectIdByTel(identityCode);
            if (id == 0) {
                result.setCode(Result.ERROR);
                result.setMsg("未查询到该会员 请注册");
                return result;
            }
        } else if (BEGIN_OF_MEMBER_CARD.equals(identityCode.substring(0, 1))) {
            // 传入字符以5打头，那么假设它是会员卡号
            // 检查健身卡号长度
            if (identityCode.length() != LENGTH_OF_MEMBER_CARD_ID) {
                result.setCode(Result.ERROR);
                result.setMsg("健身卡号格式错误 应为5开头的10位数字");
                return result;
            }
        } else {
            result.setCode(Result.ERROR);
            result.setMsg("请检查输入 应为 会员电话号码/会员卡号");
            return result;
        }
        // 检查健身卡是否有效
        MemberCard memberCard = memberCardMapper.selectOne(identityCode);
        if (new Date().compareTo(memberCard.getExpireTime()) > 0) {
            // 当前日期在过期日期之后，说明卡片已过期
            result.setCode(Result.ERROR);
            result.setMsg("健身卡已过期 请提示会员续费");
            return result;
        }

        // 获取当前月份并转成字符串
        Calendar calendar = Calendar.getInstance();
        String yearMonth = calendar.get(Calendar.YEAR)+"-"+calendar.get(Calendar.MONTH);
        // 先检查签到表里有没有该会员这个月的记录
        int mask = 0;
        SignIn signIn = signInMapper.selectOne(memberCard.getId(),yearMonth);
        if (signIn == null){
            // 表中没有该用户当月的记录，先初始化一个
            signInMapper.initNewMonth(memberCard.getId(),yearMonth);
        }else {
            mask = signIn.getMask();
        }
        // 将此次的登录记录写入签到表

        // 更新mask，这里去写一个工具类
        int newMask = Util.updateMask(calendar.get(Calendar.DATE),mask);
        signInMapper.updateMask(memberCard.getId(),yearMonth,newMask);

        result.setCode(Result.OK);
        result.setMsg("签到成功！");

        return result;
    }

    public Result<?> getCalender(String identityCode) {
        Result<?> result = new Result<>();
        return result;
    }

    // 写一个MD5解密的工具方法
}
