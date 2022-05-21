export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/op',
    // layout: false,
    component: '../layouts/AdminLayout',
    access: "['canAdmin', 'canUser']",
    wrappers: [
      '@/wrappers/auth',
    ],
    routes: [
      {
        path: '/op',
        redirect: '/op/analysis'
      },
      {
        path: '/op/analysis',
        component: './Test'
      },
      // 用户管理
      {
        path: '/op/usermanage',
        routes: [
          {
            path: '/op/usermanage',
            redirect: './employees'
          },
          {
            path: './employees',
            component: './Test'
          },
          {
            path: './roles',
            component: './Test'
          }
        ]
      },
      // 会员签到
      {
        path: 'members',
        routes: [
          {
            path: './',
            redirect: './sign-in',
          },
          {
            path: './sign-in',
            component: './Test'
          },
          {
            path: './record',
            component: './Test'
          }
        ]
      },
      {
        path: '/op/equipment',
        component: './Test'
      },
      // 会员，教练，课程管理
      {
        path: '/op/management',
        routes: [
          {
            path: './',
            redirect: './members'
          },
          {
            path: './members',
            component: './management/VipMember',
          },
          {
            path: './coaches',
            component: './Test'
          },
          {
            path: './courses',
            component: './Test'
          },
          {
            component: './404'
          }
        ]
      },
      {
        path: '/op/member-card',
        component: './Test'
      },
      {
        path: '/op/promotion',
        component: './Test'
      },
      {
        path: '/op/account',
        component: './Test'
      },
      {
        path: '/op/settings',
        component: './Test'
      }
    ]
  },
  {
    path: '/',
    redirect: '/op'
  },
  {
    component: './404',
  },
];