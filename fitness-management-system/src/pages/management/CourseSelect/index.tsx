import React, { useMemo, useRef, useState } from 'react'
import ProTable, { ActionType, ProColumnType } from '@ant-design/pro-table'
import { Button, Modal, message } from 'antd'
import type { Coach, Course, CourseInfo, Vip } from '@/services/typings'
import dayjs from '@/utils/dayjs'
import { deleteCourse, getCourseList } from '@/services/course'
import { dropCourse, getCourseInfoList } from '@/services/courseSelection'
import AddModal from './AddModal'

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
  const actionRef = useRef<ActionType>()
  const [visible, setVisible] = useState(false)
  const [courseId, setCourseId] = useState<string>('')
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
        title: '报名人数 / 容量',
        key: 'members',
        dataIndex: 'members',
        render: (_, course: CourseDetail) => {
          return `${course.members.length} / ${course.capacity}`
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
        render: (_, course: CourseDetail) => {
          return [
            <Button
              key="add"
              type="link"
              onClick={() => {
                setCourseId(course.courseId)
                setVisible(true)
              }}
            >
              添加学员
            </Button>,
            <Button
              key="delete"
              type="link"
              danger
              onClick={() => handleDelete(course.courseId)}
            >
              下架
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
            return <ExpandedRow
              actionRef={actionRef}
              dataSourse={record.members}
              courseId={record.courseId}
            />
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
          defaultPageSize: 50,
          showTotal: (total, range) => {
            return `总共${total}条`
          },
        }}
      />
      <AddModal
        actionRef={actionRef}
        courseId={courseId}
        visible={visible}
        setVisible={setVisible}
      />
    </>
  )
}
// 报名会员列表
const ExpandedRow: React.FC<{
  actionRef: React.MutableRefObject<ActionType | undefined>,
  dataSourse: Vip[],
  courseId: string
}> = ({
  actionRef,
  dataSourse,
  courseId
}) => {
    // 退选课程
    const handelDropCourse = async (memberId: string) => {
      try {
        const { code } = await dropCourse(courseId, memberId)
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