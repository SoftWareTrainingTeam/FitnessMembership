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
            component: './Test'
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
  // {
  //   path: '/Test',
  //   name: 'Test',
  //   icon: 'smile',
  //   component: './Test',
  // },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Test',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },
  // {
  //   path: '/',
  //   redirect: '/Test',
  // },
  {
    path: '/',
    redirect: '/op'
  },
  {
    component: './404',
  },
];