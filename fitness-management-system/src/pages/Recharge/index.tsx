import React, { useState } from 'react'
import { Steps, Button, message } from 'antd';
import styles from './index.less'
import StepContent from './StepContent';
const { Step } = Steps;

const steps = [
  {
    title: '确认订单信息',
    content: 'First-content',
  },
  {
    title: '等待用户支付',
    content: 'Second-content',
  },
  {
    title: '充值结果',
    content: 'Last-content',
  },
];

const Recharge: React.FC = () => {
  const [current, setCurrent] = useState(0);

  return (
    <div className={styles.recharge}>
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className={styles.content}>
        {
          <StepContent current={current} setCurrent={setCurrent} />
        }
      </div>
    </div>
  );
}
export default Recharge