import React, { useMemo, useRef, useState } from 'react'
import ProTable, { ActionType, ProColumnType } from '@ant-design/pro-table'
import { Button, Modal, message } from 'antd'
import type { Course } from '@/services/typings'
import dayjs from '@/utils/dayjs'
import { PlusOutlined } from '@ant-design/icons'
import { deleteCourse, getCourseList } from '@/services/course'
import EditForm from './EditForm'
const CourseManage: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState<0 | 1>(0)   //0添加， 1修改
  const [defaultValues, setDefaultValues] = useState<Course | null>(null)
  const actionRef = useRef<ActionType>()
  const columns: ProColumnType<Course>[] = useMemo(() => {
    return [
      {
        title: '序号',
        dataIndex: 'index',
        valueType: 'indexBorder',
      },
      {
        title: '课程编号',
        key: 'courseId',
        dataIndex: 'courseId'
      },
      {
        title: '课程名称',
        key: 'courseName',
        dataIndex: 'courseName'
      },
      {
        title: '课程信息',
        key: 'description',
        dataIndex: 'description'
      }, {
        title: '课时',
        key: 'frequency',
        dataIndex: 'frequency',
      }, {
        title: '价格￥',
        key: 'price',
        dataIndex: 'price',
      }, {
        title: '课程容量',
        key: 'capacity',
        dataIndex: 'capacity',
      }, {
        title: '教练',
        key: 'courseCoach',
        dataIndex: 'courseCoach',
        render: (_, course: Course) => {
          return course?.courseCoach?.coach?.coachName || '暂未添加教练'
        }
      }, {
        title: '开课时间',
        key: 'startTime',
        dataIndex: 'startTime',
        render: (_, course: Course) => {
          return dayjs(course.startTime as string).format('YYYY-MM-DD HH:ss')
        }
      }, {
        title: '操作',
        key: 'memberId',
        width: '20%',
        align: 'center',
        render: (_, course: Course) => {
          return [
            <Button
              key="edit"
              type="link"
              onClick={() => {
                setType(1)
                setDefaultValues({ ...course })
                setVisible(true)
              }}
            >
              编辑
            </Button>,
            <Button
              key="add"
              type="link"
              disabled={!!course.courseCoach?.coach}
              onClick={() => {
                setType(1)
                setDefaultValues({ ...course })
                setVisible(true)
              }}
            >
              添加教练
            </Button>
            ,
            <Button
              key="delete"
              type="link"
              danger
              onClick={() => {
                handleDelete(course.courseId)
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
      title: '确认删除该课程吗?',
      cancelText: '取消',
      okText: '确认',
      maskClosable: false,
      onCancel: () => { },
      onOk: async () => {
        try {
          const res = await deleteCourse(id)
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
      <ProTable<Course>
        rowKey="courseId"
        cardBordered
        dateFormatter="string"
        headerTitle={<h2>课程管理</h2>}
        actionRef={actionRef}
        columns={columns}
        search={false}
        options={{
          search: {
            allowClear: true,
            style: { width: 300 },
            placeholder: '课程名',
            enterButton: <Button type="primary">查询</Button>
          },
          fullScreen: true
        }}
        request={async (param) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          const {
            code,
            data: { list, total }
          } = await getCourseList(param)
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
            添加课程
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

export default CourseManage