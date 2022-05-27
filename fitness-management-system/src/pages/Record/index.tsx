import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import styles from './index.less'
const WeekDays = ['一', '二', '三', '四', '五', '六', '日']
const Record: React.FC = () => {
  const [curMonth, setCurMonth] = useState(new Date().getMonth() + 1)
  const [dayNum, setDatNum] = useState(30)
  useEffect(() => {
    setDatNum(new Date(new Date().getFullYear(), curMonth, 0).getDate())
  }, [curMonth])
  return (
    <div className={styles.recordpage}>
      <div className={styles.head}>
        <h1>签到日历</h1>
        <span>{curMonth + '月'}</span>
      </div>
      <ul className={styles.weeklist}>
        {
          WeekDays.map((day, index) => {
            return (
              <li key={index}>{'星期' + day}</li>
            )
          })
        }
      </ul>
      <ul className={styles.daylist}>
        {
          new Array(new Date(new Date().getFullYear(), curMonth - 1 || 12, 0).getDay()).fill(0)
            .map(() => {
              return (
                <li></li>)
            })
        }
        {
          new Array(dayNum).fill(0).map((_, index) => {
            return (
              <li
                key={index}
                className={Math.random() > 0.5 ? styles.active : ''
                }>
                {index + 1}
              </li>
            )
          })
        }
      </ul>
      <Button
        className={styles.leftbtn}
        shape="circle"
        onClick={() => {
          if (curMonth === 1) {
            setCurMonth(12)
            return
          }
          setCurMonth(curMonth - 1)
        }}
      >
        <LeftOutlined />
      </Button>
      <Button
        className={styles.rightbtn}
        shape="circle"
        onClick={() => {
          if (curMonth === 12) {
            setCurMonth(1)
            return
          }
          setCurMonth(curMonth + 1)
        }}
      >
        <RightOutlined />
      </Button>
      <div className={styles.sign}>
        <Button
          type="primary"
          shape="round"
          size="large"
          style={{
            width: 300
          }}
        >
          签到
        </Button>
      </div>
    </div>
  )
}

export default Record