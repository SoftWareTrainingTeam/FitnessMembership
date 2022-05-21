import { Divider, notification } from 'antd';
import React, { useLayoutEffect, useState } from 'react';
import { ProFormText, LoginForm, ProFormCaptcha } from '@ant-design/pro-form';
import { history, useModel } from 'umi';
import Footer from '@/components/Footer';
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';
import { getCaptcha, login } from '@/services/user';
import type { LoginParams } from '@/services/typings';
import styles from './index.less';

const Login: React.FC = () => {
  const [cpatchaUrl, setCaptchaUrl] = useState('')
  const { initialState, setInitialState } = useModel('@@initialState');
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };
  // 刷新验证码
  const refreshCaptcha = async () => {
    try {
      const { code, data } = await getCaptcha()
      if (code === 200) {
        setCaptchaUrl(data)
      } else {
        throw '验证码获取失败!'
      }
    } catch (err) {
      notification.error({ message: '验证码获取失败!', duration: 2 })
    }
  }
  // 登录
  const handleSubmit = async (values: LoginParams) => {
    try {
      // 登录
      const res = await login({ ...values })
      if (res.code === 200) {
        notification.success({ message: '登录成功!', duration: 2 })
        localStorage.setItem('PASSPORT_TOKEN', res.data)
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/');
        return;
      } else {
        notification.error({ message: res.msg, duration: 2 })
      }
    } catch (error) {
      notification.error({ message: '登录失败!请重试', duration: 2 })
    }
  };
  useLayoutEffect(() => {
    refreshCaptcha()
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.formwrapper}>
        <div className={styles.content}>
          <LoginForm
            logo={<img alt="logo" src="/logo.svg" />}
            title="健身会员管理系统"
            subTitle={<Divider />}
            onFinish={async (values) => {
              await handleSubmit(values as LoginParams);
            }}
          >
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder="请输入用户名"
                rules={[
                  {
                    required: true,
                    message: "请输入用户名!"
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder="请输入密码"
                rules={[
                  {
                    required: true,
                    message: "请输入密码！"
                  },
                ]}
              />
              <ProFormCaptcha
                // name="captcha"
                name="code"
                countDown={2}
                placeholder="请输入验证码"
                fieldProps={{
                  size: 'large',
                  prefix: <SafetyOutlined className={styles.prefixIcon} />,
                }}
                captchaProps={{
                  size: 'large',
                  style: {
                    padding: 0
                  }
                }}
                captchaTextRender={() => {
                  return (
                    <img
                      width="100%"
                      src={cpatchaUrl}
                      alt="点击重试"
                    />
                  )
                }}
                rules={[
                  {
                    required: true,
                    message: "请输入验证码!"
                  },
                ]}
                onGetCaptcha={async () => {
                  await refreshCaptcha()
                }}
              />
            </>
          </LoginForm>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
