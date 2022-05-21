import { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import defaultSettings from '../config/defaultSettings';
import { getCurrentUser } from './services/user';
import { CurrentUser } from './services/typings';
import { history } from 'umi';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<CurrentUser | undefined>;
}> {
  try {
    const {code, data} = await getCurrentUser();
    if (code === 200 && data) {
        return {
          currentUser: data,
          settings: defaultSettings
        };
    }
    localStorage.removeItem('PASSPORT_TOKEN')
    throw '未登录！'
  } catch (err) {
    return {
      currentUser: undefined,
      settings: defaultSettings,
    }
  }
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout = () => {
  return {
    menuHeaderRender: undefined,
    headerRender: false,
  };
};