import React, { useMemo, useRef, useState } from 'react'
import { deleteVip, getVipList } from '@/services/vip'
import ProTable, { ActionType, ProColumnType } from '@ant-design/pro-table'
import { Button, Modal, message } from 'antd'
import type { Vip } from '@/services/typings'
import dayjs from '@/utils/dayjs'
import { PlusOutlined } from '@ant-design/icons'
import EditForm from './EditForm'
import RechargeForm from './RechargeForm'
const VipMember: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [isRecharge, setIsRecharge] = useState(false)
  const [type, setType] = useState<0 | 1>(0)   //0添加， 1修改
  const [defaultValues, setDefaultValues] = useState<Vip | null>(null)
  const actionRef = useRef<ActionType>()
  const columns: ProColumnType<Vip>[] = useMemo(() => {
    return [
      {
        title: '会员姓名',
        key: 'name',
        dataIndex: 'name'
      }, {
        title: '性别',
        key: 'sex',
        dataIndex: 'sex',
      }, {
        title: '住址',
        key: 'address',
        dataIndex: 'address',
      }, {
        title: '联系电话',
        key: 'telNumber',
        dataIndex: 'telNumber',
      }, {
        title: '账户余额',
        key: 'balance',
        dataIndex: 'balance'
      }, {
        title: '注册时间',
        key: 'registTime',
        dataIndex: 'registTime',
        render: (_, vip: Vip) => {
          return dayjs(vip.registTime).format('YYYY-MM-DD HH:ss')
        }
      }, {
        title: '操作',
        key: 'memberId',
        width: '20%',
        align: 'center',
        render: (_, vip: Vip) => {
          return [
            <Button
              key="edit"
              type="link"
              onClick={() => {
                setType(1)
                setDefaultValues({ ...vip })
                setVisible(true)
              }}
            >
              编辑
            </Button>,
            <Button
              key="recharge"
              type="link"
              onClick={() => {
                setIsRecharge(true)
              }}
            >
              充值
            </Button>,
            <Button
              key="delete"
              type="link"
              danger
              onClick={() => {
                handleDelete(vip.memberId)
              }}
            >
              注销
            </Button>
          ]
        }
      }
    ]
  }, [actionRef])

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认注销吗',
      cancelText: '取消',
      okText: '确认',
      maskClosable: false,
      onCancel: () => { },
      onOk: async () => {
        try {
          const { code, msg = '注销失败!请重试' } = await deleteVip(id)
          if (code === 200) {
            message.success(msg)
            actionRef.current?.reload()
            return
          }
          message.warn(msg)
        } catch (err) {
          message.error('注销失败!请重试')
          return
        }
      }
    })
  }
  return (
    <>
      <ProTable<Vip>
        rowKey="memberId"
        cardBordered
        dateFormatter="string"
        headerTitle={<h2>会员管理</h2>}
        actionRef={actionRef}
        columns={columns}
        search={false}
        options={{
          search: {
            allowClear: true,
            style: { width: 300 },
            placeholder: '支持姓名，电话号码模糊查询',
            enterButton: <Button type="primary">查询</Button>
          },
          fullScreen: true
        }}
        request={async (param) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          const {
            code,
            data: { list, total }
          } = await getVipList(param)
          return {
            data: list,
            total,
            success: code === 200
          }
        }}
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 15, 20],
          defaultPageSize: 5,
          // pageSize: 10,
          showTotal: (total, range) => {
            return `总共${total}条`
          },
        }}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              setType(0)
              setDefaultValues(null)
              setVisible(true)
            }}
          >
            注册会员
          </Button>,
        ]}
      />
      <EditForm
        type={type}
        visible={visible}
        actionRef={actionRef}
        setVisible={setVisible}
        defaultValues={defaultValues}
      />
      <RechargeForm 
      visible={isRecharge} 
      setVisible={setIsRecharge}
      />
    </>
  )
}

export default VipMember