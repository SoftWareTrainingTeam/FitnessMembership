import React, { useMemo, useRef, useState } from 'react'
import ProTable, { ActionType, ProColumnType } from '@ant-design/pro-table'
import { Button, Modal, message } from 'antd'
import type { Coach } from '@/services/typings'
import dayjs from '@/utils/dayjs'
import { PlusOutlined } from '@ant-design/icons'
import EditForm from './EditForm'
import { deleteCoach, getCoachList } from '@/services/coach'
const CoachManage: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState<0 | 1>(0)   //0添加， 1修改
  const [defaultValues, setDefaultValues] = useState<Coach | null>(null)
  const actionRef = useRef<ActionType>()
  const columns: ProColumnType<Coach>[] = useMemo(() => {
    return [
      {
        title: '教练编号',
        key: 'coachId',
        dataIndex: 'coachId'
      },
      {
        title: '教练姓名',
        key: 'coachName',
        dataIndex: 'coachName'
      },
      {
        title: '性别',
        key: 'coachSex',
        dataIndex: 'coachSex'
      }, {
        title: '联系电话',
        key: 'coachTel',
        dataIndex: 'coachTel',
      }, {
        title: '教练类型',
        key: 'coachType',
        dataIndex: 'coachType',
        render: (_, coach: Coach) => {
          return (
            <span>
              {
                coach.coachType === 1
                ? '巡场'
                : coach.coachType === 2
                ? '团操'
                : '私人'
              }
            </span>
          )
        }
      }, {
        title: '教练等级',
        key: 'coachLevel',
        dataIndex: 'coachLevel',
        render: (_, coach: Coach) => {
          return (
            <span>
              {
                coach.coachLevel === 1
                ? '初级'
                : coach.coachType === 2
                ? '中级'
                : '高级'
              }
            </span>
          )
        }
      }, {
        title: '入职时间',
        key: 'entryTime',
        dataIndex: 'entryTime',
        render: (_, coach: Coach) => {
          return dayjs(coach.entryTime).format('YYYY-MM-DD HH:ss')
        }
      }, {
        title: '操作',
        key: 'memberId',
        width: '20%',
        align: 'center',
        render: (_, coach: Coach) => {
          return [
            <Button
              key="edit"
              type="link"
              onClick={() => {
                setType(1)
                setDefaultValues({ ...coach })
                setVisible(true)
              }}
            >
              编辑
            </Button>,
            <Button
              key="delete"
              type="link"
              danger
              onClick={() => {
                handleDelete(coach.coachId)
              }}
            >
              删除
            </Button>
          ]
        }
      }
    ]
  }, [actionRef])

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除改教练吗?',
      cancelText: '取消',
      okText: '确认',
      maskClosable: false,
      onCancel: () => { },
      onOk: async () => {
        try {
          const res = await deleteCoach(id)
          if (res.code === 200) {
            message.success('删除成功!')
            actionRef.current?.reload()
            return
          }
          throw Error('删除失败!请重试')
        } catch (err) {
          message.error('删除失败!请重试')
          return
        }
      }
    })
  }
  return (
    <>
      <ProTable<Coach>
        rowKey="coachId"
        cardBordered
        dateFormatter="string"
        headerTitle={<h2>教练管理</h2>}
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
          } = await getCoachList(param)
          return {
            data: list,
            total,
            success: code === 200
          }
        }}
        pagination={{
          showQuickJumper: true,
          pageSize: 6,
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
            添加教练
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
    </>
  )
}

export default CoachManage