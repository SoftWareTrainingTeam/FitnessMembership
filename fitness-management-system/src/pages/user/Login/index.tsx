import { Alert, Divider, message } from 'antd';
import React, { useState } from 'react';
import { ProFormText, LoginForm, ProFormCaptcha } from '@ant-design/pro-form';
import { history, useModel } from 'umi';
import Footer from '@/components/Footer';
import { login } from '@/services/ant-design-pro/api';
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';
import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
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

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const msg = await login({ ...values });
      if (msg.status === 'ok') {
        message.success('登录成功!');
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/');
        return;
      }
      console.log(msg);
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      message.error('登录失败!请重试');
    }
  };
  const { status, type: loginType } = userLoginState;

  return (
    <div className={styles.container}>
      <div className={styles.formwrapper}>
        <div className={styles.content}>
          <LoginForm
            logo={<img alt="logo" src="/logo.svg" />}
            title="健身会员管理系统"
            subTitle={<Divider />}
            // initialValues={{
            //   autoLogin: true,
            // }}
            onFinish={async (values) => {
              await handleSubmit(values as API.LoginParams);
            }}
          >
            {status === 'error' && loginType === 'account' && (
              <LoginMessage
                content="账号或者密码错误!"
              />
            )}
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
                fieldProps={{
                  size: 'large',
                  prefix: <SafetyOutlined className={styles.prefixIcon}/>,
                }}
                captchaProps={{
                  size: 'large',
                  style: {
                    padding: 0
                  }
                }}
                placeholder="请输入验证码"
                captchaTextRender={() => {
                  return (
                    <img
                      width="100%"
                      src="https://oschina.net/action/user/captcha"
                      alt="图形验证码"
                    />
                  )
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: "请输入验证码!"
                  },
                ]}
                onGetCaptcha={async () => {
                  // const result = await getFakeCaptcha({
                  //   phone,
                  // });
                  // if (result === false) {
                  //   return;
                  // }
                  message.success('获取验证码成功！验证码为：1234');
                }}
              />
            </>
            {/* <div
            style={{
              marginBottom: 24,
            }}
          >
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码?
            </a>
          </div> */}
          </LoginForm>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
