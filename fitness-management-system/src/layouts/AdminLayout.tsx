import React from 'react';
import { Link, history, useAccess } from 'umi';
import type {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';
import { Access } from '@@/plugin-access/access';
import RightContent from '@/components/RightContent';
import { menuList } from '../../config/menuList'
import defaultSettings from '../../config/defaultSettings';

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


const AdminLayout: React.FC<BasicLayoutProps> = (props) => {
  const access = useAccess()
  const { children } = props;

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
        // onCollapse={handleMenuCollapse}
        menu={{
          defaultOpenAll: true
        }}
        onMenuHeaderClick={() => history.push('/')}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || !menuItemProps.path) {
            return defaultDom;
          }
          return <Link to={menuItemProps.path}>
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
        footerRender={false}
        rightContentRender={() => <RightContent />}
      >
        <Access
          accessible={access.canAdmin || access.canUser}
          fallback={<div>无权限</div>}
        >
          {children}
        </Access>
      </ProLayout>
    </div>
  );
};

export default AdminLayout;