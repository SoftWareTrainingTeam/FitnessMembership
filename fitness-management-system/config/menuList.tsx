import {
  TeamOutlined,
  ContactsOutlined,
  ClusterOutlined,
  FieldTimeOutlined,
  KeyOutlined,
  ProfileOutlined,
  IdcardOutlined,
  UserOutlined,
  PieChartOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  AuditOutlined,
  RedEnvelopeOutlined,
  DashboardOutlined,
  UnorderedListOutlined,
  ProjectOutlined
} from "@ant-design/icons";

export type Menu = {
  path: string,
  name: string,
  icon: JSX.Element,
  routes?: Menu[]
}
export const menuList: Menu[] = [
  {
    path: '/op/analysis',
    name: '仪表盘',
    icon: <DashboardOutlined />
  },
  {
    path: '/op/usermanage',
    name: '用户管理',
    icon: <TeamOutlined />,
    routes: [
      {
        path: '/op/usermanage/empolyees',
        name: '员工管理',
        icon: <ContactsOutlined />
      },
      {
        path: '/op/usermanage/roles',
        name: '权限管理',
        icon: <ClusterOutlined />
      }
    ]
  },
  {
    path: '/op/management',
    name: '信息管理',
    icon: <ProfileOutlined />,
    routes: [
      {
        path: '/op/management/member',
        name: '会员管理',
        icon: <IdcardOutlined />
      },
      {
        path: '/op/management/coache',
        name: '教练管理',
        icon: <UserOutlined />
      },
      {
        path: '/op/management/course',
        name: '课程管理',
        icon: <PieChartOutlined />
      },
      {
        path: '/op/management/course-select',
        name: '选课信息',
        icon: <ProjectOutlined />
      }
    ]
  },
  {
    path: '/op/members/sign-in',
    name: '会员签到',
    icon: <FieldTimeOutlined />
  },
  {
    path: '/op/category',
    name: '器材分类',
    icon: <UnorderedListOutlined />
  },
  {
    path: '/op/equipment',
    name: '器材管理',
    icon: <KeyOutlined />
  },
  {
    path: '/op/member-card',
    name: '会员卡',
    icon: <SafetyCertificateOutlined />
  },
  {
    path: '/op/promotion',
    name: '促销活动',
    icon: <RedEnvelopeOutlined />
  },
  {
    path: '/op/account',
    name: '个人中心',
    icon: <AuditOutlined />
  },
  {
    path: '/op/settings',
    name: '系统设置',
    icon: <SettingOutlined />
  }
]




