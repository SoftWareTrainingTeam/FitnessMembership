import React, { useMemo, useRef, useState } from 'react'
import ProTable, { ActionType, ProColumnType } from '@ant-design/pro-table'
import { Button, Modal, message } from 'antd'
import type { Coach, Course, CourseInfo, Vip } from '@/services/typings'
import dayjs from '@/utils/dayjs'
import { PlusOutlined } from '@ant-design/icons'
import { deleteCourse, getCourseList } from '@/services/course'
import { dropCourse, getCourseInfoList } from '@/services/courseSelection'
// import EditForm from './EditForm'

export type CourseDetail = { members: Vip[], coach: Coach } & Course
// 处理后端数据
const arrayToTree = (arrs: CourseInfo[]): CourseDetail[] => {
  const result = [];   // 存放结果集
  const itemMap = {};  // 
  for (const item of arrs) {
    const id = item.courseInfo.courseId;
    // const pid = item.pid;
    if (!itemMap[id]) {
      itemMap[id] = {
        ...item.courseInfo,
        coach: item.coach,
        members: [item.member]
      }
      result.push(itemMap[id])
    } else {
      itemMap[id].members.push(item.member)
    }
  }
  return result;
}
const CourseManage: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState<0 | 1>(0)   //0添加， 1修改
  const [defaultValues, setDefaultValues] = useState<CourseDetail | null>(null)
  const actionRef = useRef<ActionType>()
  const columns: ProColumnType<CourseDetail>[] = useMemo(() => {
    return [
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
        title: '报名人数',
        key: 'members',
        dataIndex: 'members',
        render: (_, course: CourseDetail) => {
          return course.members.length
        }
      }, {
        title: '教练',
        key: 'coach',
        dataIndex: 'coach',
        render: (_, course: CourseDetail) => {
          return course.coach.coachName
        }
      }, {
        title: '开课时间',
        key: 'startTime',
        dataIndex: 'startTime',
        render: (_, course: CourseDetail) => {
          return dayjs(course.startTime as string).format('YYYY-MM-DD HH:ss')
        }
      },
      {
        title: '操作',
        key: 'memberId',
        width: '20%',
        align: 'center',
        render: (_,) => {
          return [
            <Button
              key="edit"
              type="link"
              onClick={() => {
                setType(1)
                // setDefaultValues({ ...course })
                setVisible(true)
              }}
            >
              编辑
            </Button>,
            <Button
              key="delete"
              type="link"
              danger
            // onClick={() => {
            //   handleDelete(course.courseId)
            // }}
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
      <ProTable<CourseDetail>
        rowKey="courseId"
        cardBordered
        dateFormatter="string"
        headerTitle={<h2>选课信息</h2>}
        actionRef={actionRef}
        columns={columns}
        search={false}
        expandable={{
          expandedRowRender: (record: CourseDetail) => {
            return <ExpandedRow actionRef={actionRef} dataSourse={record.members}/>
          },
        }}
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
          } = await getCourseInfoList(param)
          const res = arrayToTree(list)
          return {
            data: res,
            total: res.length,
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
            选课
          </Button>,
        ]}
      />
      {/* <EditForm
        type={type}
        visible={visible}
        actionRef={actionRef}
        setVisible={setVisible}
        defaultValues={defaultValues}
      /> */}
    </>
  )
}
// 报名会员列表
const ExpandedRow: React.FC<{
  actionRef: React.MutableRefObject<ActionType | undefined>,
  dataSourse: Vip[]
}> = ({
  actionRef,
  dataSourse
}) =>{
  // 退选课程
  const handelDropCourse = async (memberId: string) => {
    try {
      const { code } = await dropCourse(memberId)
      if (code === 200) {
        message.success('退选成功!')
        actionRef.current?.reload()
        return
      }
    } catch {
      message.error('退选失败!请重试')
    }
  }
  return (
    <ProTable<Vip>
      rowKey="memberId"
      columns={[
        {
          title: '会员账号',
          key: 'memberId',
          dataIndex: 'memberId'
        },
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
          title: '操做',
          key: 'memberId',
          dataIndex: 'memberId',
          render: (_, vip: Vip) => {
            return [
              <Button
                key="drop"
                type="primary"
                size="small"
                danger
                onClick={() => handelDropCourse(vip.memberId)}
              >
                退选
              </Button>
            ]
          }
        }
      ]}
      headerTitle={false}
      search={false}
      options={false}
      dataSource={dataSourse}
      pagination={false}
    />
  );
};
export default CourseManage