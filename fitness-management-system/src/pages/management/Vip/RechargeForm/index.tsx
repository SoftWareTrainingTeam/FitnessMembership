import React, { useState } from "react"
import { Divider, Input, message, Modal } from "antd"
import styles from './index.less'
import { history } from "umi"
type IProps = {
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const AmountList = [20, 100, 200, 300, 500, 1000]
const RechargeForm: React.FC<IProps> = ({
  visible,
  setVisible
}) => {
  const [amount, setAmount] = useState<number | string>('')
  return (
    <Modal
      title={<strong>充值</strong>}
      visible={visible}
      maskClosable={false}
      destroyOnClose
      onCancel={() => setVisible(false)}
      onOk={() => {
        if (!amount) {
          message.warn('您还未选择充值金额!')
        } else if (amount < 20) {
          message.warn('充值金额最低为20元')
        } else {
          history.push('/op/recharge')
        }
      }}
    >
      <Input
        type="number"
        placeholder="充值金额"
        size="large"
        bordered={false}
        value={amount}
        onChange={e => setAmount(e.target.value)}
        style={{
          fontSize: 24,
          fontWeight: 600
        }}
      />
      <Divider />
      <span className={styles.other}>快捷输入</span>
      <ul className={styles.amountlist}>
        {
          AmountList.map(item => {
            return (
              <li
                key={item}
                onClick={() => {
                  setAmount(item)
                }}
              >
                {item}元
              </li>
            )
          })
        }
      </ul>
    </Modal>
  )
}

export default RechargeForm