import { Redirect, useAccess } from 'umi';
import { message } from 'antd';

/**
 * 权限管理包装页
 * @param props
 */
export default (props: any) => {
  const access = useAccess();
  const currentHref = encodeURI(window.location.href);
  // 已登录或已在登录页，直接展示内容
  if (access.canUser || (currentHref.indexOf('/user/login') > -1)) {
    return props.children
  } else {
    message.warning('请先登录');
    return <Redirect to={`/user/login?redirect=${encodeURIComponent(currentHref)}`} />;
  }
};