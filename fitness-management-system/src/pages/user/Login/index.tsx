import { Divider, notification } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { ProFormText, LoginForm, ProFormCaptcha } from '@ant-design/pro-form';
import { history } from 'umi';
import Footer from '@/components/Footer';
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';
import { getCaptcha, login } from '@/services/user';
import type { LoginParams } from '@/services/typings';
import styles from './index.less';
const Login: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [cpatchaUrl, setCaptchaUrl] = useState('')
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
      const res = await login({ ...values })
      if (res.code === 200) {
        notification.success({ message: '登录成功!', duration: 2 })
        localStorage.setItem('PASSPORT_TOKEN', res.data)
        /** 此方法会跳转到 redirect 参数所在的位置 */
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        if (redirect) {
          window.location.href = redirect
        } else {
          history.replace('/')
        }
      } else {
        notification.error({ message: res.msg, duration: 2 })
      }
    } catch (error) {
      notification.error({ message: '登录失败!请重试', duration: 2 })
    }
  };
  useEffect(() => {
    refreshCaptcha()
    const clientWidth = document.documentElement.clientWidth - 30
    const clientHeight = document.documentElement.clientHeight - 30
    if (canvasRef.current) {
      canvasRef.current.width = clientWidth
      canvasRef.current.height = clientHeight

      const ctx = canvasRef.current.getContext('2d')
      // 小球类
      class Ball {
        private x: number
        private y: number
        private speedX: number
        private speedY: number
        private r: number
        private color: string
        constructor() {
          this.x = Math.random() * (clientWidth - 40) + 40
          this.y = Math.random() * (clientHeight - 40) + 40
          this.speedX = (Math.random() * 3 - 1.5) || 1
          this.speedY = (Math.random() * 3 - 1.5) || 1
          this.r = Math.random() * 10 + 10
          this.color = `rgb(${Math.random() * 255}, 
                        ${Math.random() * 255},
                        ${Math.random() * 255})`
        }

        render(balls: Ball[]) {
          ctx!.beginPath()
          ctx!.fillStyle = this.color
          ctx!.globalAlpha = 0.2
          ctx!.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
          ctx!.closePath()
          ctx!.fill()
          for (let i = 0, len = balls.length; i < len; i++) {
            if (Math.abs(this.x - balls[i].x) <= 150 &&
              Math.abs(this.y - balls[i].y) <= 150
            ) {
              ctx!.beginPath()
              ctx!.strokeStyle = '#ced9e3'
              ctx!.globalAlpha = 0.3
              ctx!.moveTo(this.x, this.y)
              ctx!.lineTo(balls[i].x, balls[i].y)
              ctx!.closePath()
              ctx!.stroke()
            }
          }
        }

        update() {
          this.x += this.speedX
          this.y += this.speedY
          // 碰撞监测
          if (this.x <= this.r || this.x >= clientWidth - this.r) {
            this.speedX = -this.speedX
          }
          if (this.y <= this.r || this.y >= clientHeight - this.r) {
            this.speedY = -this.speedY
          }
        }

      }

      // 主方法
      class Main {
        private ballCache: Ball[]
        constructor() {
          this.ballCache = []
        }

        init(num: number) {
          while (num--) {
            this.ballCache.push(new Ball())
          }
        }

        render() {
          setInterval(() => {
            ctx!.clearRect(0, 0, clientWidth, clientHeight)
            for (let i = 0, len = this.ballCache.length; i < len; i++) {
              this.ballCache[i].render(this.ballCache)
              this.ballCache[i].update()
            }
          }, 20)
        }
      }

      const main = new Main()
      main.init(20)
      main.render()
    }
  }, [])
  return (
    <>
      <canvas ref={canvasRef}></canvas>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.left}>
            WELCOME
          </div>
          <div className={styles.right}>
            <LoginForm
              // logo={<img alt="logo" src="/logo.svg" />}
              title="登 录"
              isKeyPressSubmit
              subTitle={<Divider />}
              onFinish={handleSubmit}
              submitter={{
                submitButtonProps: {
                  shape: 'round',
                  size: 'large',
                  style: {
                    width: 120,
                    marginTop: 24
                  }
                }
              }}
            >
              <>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: 'large',
                    bordered: false,
                    className: styles.input,
                    // prefix: <UserOutlined className={styles.prefixIcon} />,
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
                    bordered: false,
                    className: styles.input,
                    // prefix: <LockOutlined className={styles.prefixIcon} />,
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
                    bordered: false,
                    className: styles.input,
                    // prefix: <SafetyOutlined className={styles.prefixIcon} />,
                  }}
                  captchaProps={{
                    size: 'large',
                    style: {
                      padding: 0,
                      border: 'none'
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
    </>
  );
};

export default Login;
