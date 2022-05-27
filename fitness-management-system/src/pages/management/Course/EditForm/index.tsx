import React, { useEffect } from 'react'
import {
  DatePicker,
  Form,
  Input,
  message,
  Modal
} from 'antd'
import moment from 'moment';
import 'moment/locale/zh-cn';
import { ActionType } from '@ant-design/pro-table';
import { Course } from '@/services/typings';
import { addCourse, updateCourse } from '@/services/course';
moment.locale('zh-cn');

type IProps = {
  type: 0 | 1,
  visible: boolean,
  defaultValues: Course | null
  actionRef: React.MutableRefObject<ActionType | undefined>,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const EditForm: React.FC<IProps> = (
  {
    visible = false,
    setVisible,
    actionRef,
    defaultValues,
    type
  }
) => {
  const [form] = Form.useForm()

  // 表单提交
  const handleSubmit = async (values: any) => {
    try {
      values.startTime = moment(values.coachBirth).valueOf()
      let res
      if (type) {
        res = await updateCourse({
          ...values,
          courseId: defaultValues?.courseId
        })
      } else {
        res = await addCourse({ ...values })
      }
      if (res.code === 200) {
        message.success(res.msg)
        setVisible(false)
        actionRef.current?.reload()
      } else {
        message.error(res.msg)
      }
    } catch (err) {
      message.error('操作失败!请重试')
    }
  }
  // 设置表单初始值
  useEffect(() => {
    if (defaultValues) {
      defaultValues.startTime = moment(defaultValues.startTime)
      form.setFieldsValue(defaultValues)
    } else {
      form.resetFields()
    }
  }, [defaultValues])
  return (
    <Modal
      getContainer={false}
      visible={visible}
      title={type ? '编辑课程' : '添加课程'}
      maskClosable={false}
      onCancel={() => setVisible(false)}
      okText={type ? '确认修改' : '确认添加'}
      destroyOnClose
      okButtonProps={{
        htmlType: 'submit',
        form: 'register'
      }}
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        name="register"
        onFinish={handleSubmit}
        scrollToFirstError
      >
        {/* 课程名称 */}
        <Form.Item
          name="courseName"
          label="课程名称"
          rules={[
            {
              required: true,
              message: '请输入课程名称!',
            },
          ]}
        >
          <Input type="text" placeholder="请输入课程名称" />
        </Form.Item>
        {/* 课程描述 */}
        <Form.Item
          name="description"
          label="课程描述"
          rules={[
            {
              required: true,
              message: '请输入课程描述!',
            },
          ]}
        >
          <Input.TextArea placeholder="请输入课程描述" maxLength={100} showCount />
        </Form.Item>
        {/* 课时 */}
        <Form.Item
          name="frequency"
          label="课时"
          rules={[{ required: true, message: '请输入课时!' }]}
        >
          <Input type="number" placeholder="课时" />
        </Form.Item>
        {/* 价格 */}
        <Form.Item
          name="price"
          label="课程价格"
          rules={[{ required: true, message: '请输入价格!' }]}
        >
          <Input type="number" addonAfter="￥" placeholder="价格" />
        </Form.Item>
        {/* 课程容量 */}
         {/* 价格 */}
         <Form.Item
          name="capacity"
          label="课程容量"
          rules={[{ required: true, message: '请输入课程容量!' }]}
        >
          <Input type="number" maxLength={100} placeholder="课程容量" />
        </Form.Item>
        {/* 开课日期 */}
        <Form.Item
          name="startTime"
          label="开课时间"
          rules={[{ required: true, message: '请选择开课时间!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditForm