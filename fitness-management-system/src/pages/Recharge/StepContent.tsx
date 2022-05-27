import { Button, Card, Result } from 'antd'
import React, { useEffect } from 'react'
import styles from './index.less'
const StepContent: React.FC<{
  current: number,
  setCurrent: React.Dispatch<React.SetStateAction<number>>
}> = ({
  current,
  setCurrent
}) => {
    useEffect(() => {
      if (current === 1) {
        setTimeout(() => {
          setCurrent(2)
        }, 3000)
      }
    }, [current])
    return (
      <>
        {
          current === 0 && (
            <div className={styles.info}>
              <Card
                title="支付订单"
                bordered={false}
                extra={<Button
                  size="large"
                  type="primary"
                  shape="round"
                  onClick={() => setCurrent(1)}
                >
                  确认订单
                </Button>}
              >
                <div className={styles.pay}>
                  <span>订单编号:</span>
                  <span>#ljfslj5879644564</span>
                </div>
                <div className={styles.pay}>
                  <span>会员卡号:</span>
                  <span>46464644</span>
                </div>
                <div className={styles.pay}>
                  <span>会员姓名:</span>
                  <span>张三</span>
                </div>
                <div className={styles.pay}>
                  <span>充值金额</span>
                  <span>500 元</span>
                </div>
              </Card>
            </div>
          )
        }
        {
          current === 1 && (
            <div className={styles.wait}>
              <strong
                style={{
                  letterSpacing: 2,
                  fontSize: 16
                }}
              >
                用户支付中
              </strong>
              <i></i>
              <i></i>
              <i></i>
            </div>
          )
        }
        {
          current === 2 && (
            <div className={styles.result}>
              <Result
                status="success"
                title="充值成功!"
              />
            </div>
          )
        }
      </>
    )
  }
export default StepContent