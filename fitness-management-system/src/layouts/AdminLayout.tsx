import React, { useEffect, useState } from 'react';
import { Link, history, useAccess } from 'umi';
import {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
  PageContainer,
  ProBreadcrumb,
  WaterMark
} from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';
import { Access } from '@@/plugin-access/access';
import RightContent from '@/components/RightContent';
import { menuList, Menu } from '../../config/menuList'
import defaultSettings from '../../config/defaultSettings';
import './index.less'
import Footer from '@/components/Footer';

export type BasicLayoutProps = {
  breadcrumbNameMap: Record<string, MenuDataItem>;
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
} & ProLayoutProps;

export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: Record<string, MenuDataItem>;
};


type TabProp = { key: string, tab: React.ReactNode, closable?: boolean}

const matchMenu = (menuList: Menu[], key: string): TabProp | null => {
  let res : TabProp | null= null
  const rec = (list: Menu[]) => {
    for (let menu of list) {
      if (menu.routes) {
        rec(menu.routes)
      }
      if (menu.path === key) {
        res = { key: menu.path, tab: menu.name }
        break
      }
    }
  }
  rec(menuList)
  return res
}
const AdminLayout: React.FC<BasicLayoutProps> = (props) => {
  const access = useAccess()
  const { children, location } = props;
  const [tabList, setTabList] = useState<TabProp[]>([{
    key: '/op/analysis',
    tab: '仪表盘',
    closable: false
  }])
  // 点击菜单
  const handelClick = (menuItem: MenuDataItem & {
    isUrl: boolean;
    onClick: () => void;
  }) => {
    const flag = tabList.some(tab => tab.key === menuItem.key)
    if (flag) {
      return
    }
    setTabList([...tabList, { key: menuItem.key!, tab: menuItem.name!}])
  }

  useEffect(() => {
    if (location?.pathname) {
      const initTab = matchMenu(menuList, location.pathname)
      if (initTab && initTab.key !== '/op/analysis') {
        setTabList([...tabList, initTab])
      }
    }
  }, [])
  return (
    <div style={{ height: '100vh' }}>
      <ProLayout
        {...props}
        {...defaultSettings}
        layout="mix"
        fixSiderbar
        route={{
          routes: menuList
        }}
        menu={{
          defaultOpenAll: true
        }}
        headerContentRender={() => <ProBreadcrumb />}
        breadcrumbRender={(routers = []) => [
          {
            path: '/op',
            breadcrumbName: '仪表盘',
          },
          ...routers,
        ]}
        onMenuHeaderClick={() => history.push('/')}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || !menuItemProps.path) {
            return defaultDom;
          }
          return <Link onClick={() => handelClick(menuItemProps)} to={menuItemProps.path}>
            <>
              {
                menuItemProps.pro_layout_parentKeys &&
                menuItemProps.pro_layout_parentKeys.length > 0 &&
                menuItemProps.icon
              }
              {
                defaultDom
              }
            </>
          </Link>;
        }}
        footerRender={() => <Footer />}
        rightContentRender={() => <RightContent />}
      >
        <Access
          accessible={access.canAdmin || access.canUser}
          fallback={<div>无权限</div>}
        >
          <WaterMark content="实训课一组" zIndex={1}>
          <PageContainer
            title={false}
            fixedHeader
            tabList={tabList}
            tabActiveKey={location?.pathname}
            tabProps={{
              type: 'editable-card',
              size: 'small',
              hideAdd: true,
              onEdit: (key) => {
                const newList = tabList.filter(tab => tab.key !== key)
                setTabList(newList)
                if (location?.pathname === key) {
                  history.push(newList[newList.length - 1]!.key)
                }
                return
              }
            }}
            onTabChange={(key) => {
              console.log(key);
              history.push(key)
            }}
          >
            {children}
          </PageContainer>
          </WaterMark>
        </Access>
      </ProLayout>
    </div>
  );
};

export default AdminLayout;