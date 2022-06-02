import { getVipSignInRecord, signIn } from "@/services/record";
import { Vip } from "@/services/typings";
import { getVipList } from "@/services/vip";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Input, List, message } from "antd";
import React, { useEffect, useState } from "react";
import styles from './index.less'


const WeekDays = ['一', '二', '三', '四', '五', '六', '日']
const Record: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [curVip, setCurVip] = useState<Vip | null>(null)
  const [vipList, setVipList] = useState<Vip[]>([])
  const [curDate, setCurDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  })
  const [dayNum, setDayNum] = useState(new Date(curDate.year, curDate.month - 1 || 12, 0).getDate())
  const [record, setRecord] = useState<string[]>(new Array(dayNum).fill(0))
  
  async function getRecordList(memberId: string, date: string) {
    try {
      const { code, data } = await getVipSignInRecord(memberId, date)
      if (code === 200) {
        const list = new Array(dayNum).fill(0)
        for (let j = 0; j <= dayNum; ++j) {
          let temp = data.calender & (1 << j);
          if (temp > 0) {
            list[j] = 1
          }
        }
        setRecord(list)
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSignIn(identitity: string) {
    try {
      const {code, msg} = await signIn(identitity)
      if (code === 200) {
        message.success(msg)
        return
      }
      message.error(msg)
    } catch(err) {
      message.error('签到失败!请稍后重试')
    }
  }
  // 搜索会员
  async function searchVip(keyword: string) {
    if (!keyword || keyword.trim() === '') {
      setVipList([])
      return
    }
    const res = await getVipList({ startPage: 1, pageSize: 2, keyword })
    res.code === 200 && setVipList(res.data?.list || [])
  }

  useEffect(() => {
    const nums = new Date(curDate.year, curDate.month, 0).getDate()
    setDayNum(nums)
    setRecord(new Array(nums).fill(0))
    curVip && getRecordList(curVip.telNumber, `${curDate.year}-${curDate.month}`)
  }, [curDate, curVip])
  return (
    <div className={styles.recordpage}>
      <div className={styles.head}>
        <h1>签到日历</h1>
        <span>{`${curDate.year}-${curDate.month}月 ${curVip?.name || ''}`}</span>
        <div 
        className={styles.search}
        onMouseEnter={() => {
          setVisible(true)
        }}
        onMouseLeave={() => {
          setVisible(false)
        }}
        >
          <Input
            placeholder="搜索学员"
            onChange={e => {
              searchVip(e.target.value)
            }}
          />
          <List
            itemLayout="horizontal"
            locale={{ emptyText: false }}
            dataSource={vipList}
            bordered
            style={{
              zIndex: 100,
              display: visible ? 'block' : 'none'
            }}
            renderItem={item => {
              return (
                <List.Item
                  actions={[
                    <Button onClick={() => {
                      setCurVip(item)
                      setVisible(false)
                    }} type="link">选择</Button>
                  ]}
                >
                  <span>{item.name}</span>
                  <span>{item.telNumber}</span>
                </List.Item>
              )
            }}
          >
          </List>
        </div>
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
          new Array(new Date(curDate.year, curDate.month - 1 || 12, 0).getDay()).fill(0)
            .map(() => {
              return (
                <li></li>)
            })
        }
        {
          record.map((flag, index) => {
            return (
              <li
                key={index}
                className={ flag && styles.active }
              >
                {index + 1}
              </li>
            )
          })
        }
      </ul>
      <Button
        className={styles.leftbtn}
        shape="circle"
        size="large"
        onClick={() => {
          if (curDate.month === 1) {
            setCurDate({ year: curDate.year - 1, month: 12 })
            return
          }
          setCurDate({ ...curDate, month: curDate.month - 1 })
        }}
      >
        <LeftOutlined />
      </Button>
      <Button
        className={styles.rightbtn}
        shape="circle"
        size="large"
        onClick={() => {
          if (curDate.month === 12) {
            setCurDate({ year: curDate.year + 1, month: 1 })
            return
          }
          setCurDate({ ...curDate, month: curDate.month + 1 })
        }}
      >
        <RightOutlined />
      </Button>
      <div className={styles.sign}>
        <Button
          type="primary"
          shape="round"
          size="large"
          disabled={!curVip}
          style={{
            width: 300
          }}
          onClick={() => {
            handleSignIn(curVip?.telNumber!)
          }}
        >
          签到
        </Button>
      </div>
    </div>
  )
}

export default Record