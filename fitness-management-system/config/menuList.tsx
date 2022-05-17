import {
  AreaChartOutlined,
  TeamOutlined,
  ContactsOutlined,
  ClusterOutlined,
  FormOutlined,
  FieldTimeOutlined,
  BarChartOutlined,
  KeyOutlined,
  ProfileOutlined,
  IdcardOutlined,
  UserOutlined,
  PieChartOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  AuditOutlined,
  RedEnvelopeOutlined
} from "@ant-design/icons";

export const menuList = [
  {
    path: '/op/analysis',
    name: '数据分析',
    icon: <AreaChartOutlined />
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
    path: '/op/members',
    name: '会员签到',
    icon: <FormOutlined />,
    routes: [
      {
        path: '/op/members/sign-in',
        name: '签到',
        icon: <FieldTimeOutlined />
      },
      {
        path: '/op/members/record',
        name: '签到统计',
        icon: <BarChartOutlined />
      }
    ]
  },
  {
    path: '/op/equipment',
    name: '设备管理',
    icon: <KeyOutlined />
  },
  {
    path: '/op/management',
    name: '信息管理',
    icon: <ProfileOutlined />,
    routes: [
      {
        path: '/op/management/members',
        name: '会员管理',
        icon: <IdcardOutlined />
      },
      {
        path: '/op/management/coaches',
        name: '教练管理',
        icon: <UserOutlined />
      },
      {
        path: '/op/management/courses',
        name: '课程管理',
        icon: <PieChartOutlined />
      }
    ]
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




