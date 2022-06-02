export default [
  {
    path: '/',
    layout: false,
    routes: [
      {
        path: '/user',
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
        component: '../layouts/AdminLayout',
        access: "['canAdmin', 'canUser']",
        wrappers: [
          '@/wrappers/auth',
        ],
        routes: [
          {
            path: '/op',
            redirect: '/op/management'
          },
          {
            path: '/op/analysis',
            component: './Test'
          },
          {
            path: '/op/recharge',
            component: './Recharge'
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
              path: './members',
              redirect: './members/sign-in',
          },
          {
            path: './members/sign-in',
            component: './Record'
          },
          // 会员，教练，课程管理，选课
          {
            path: '/op/management',
            routes: [
              {
                path: './',
                redirect: './member'
              },
              {
                path: './member',
                component: './management/Vip',
              },
              {
                path: './coache',
                component: './management/Coach'
              },
              {
                path: './course',
                component: './management/Course'
              },
              {
                path: './course-select',
                component: './management/CourseSelect'
              },
              {
                component: './404'
              }
            ]
          },
          {
            path: '/op/category',
            component: './management/Category'
          },
          {
            path: '/op/equipment',
            component: './management/Equipment'
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
          },
          {
            component: './404'
          }
        ]
      },
      {
        path: '/',
        redirect: '/op'
      },
      {
        component: './404'
      }
    ]
  },
  {
    layout: false,
    component: './404',
  },
];