/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';

const codeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功',
  400: '请求出错',
  401: '无权限',
  403: '禁止访问',
  404: '服务器没有针对该请求的响应',
  406: '请求的格式不可得',
  410: '请求的资源被永久删除',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求出错 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      message: '您的网络发生异常，无法连接服务器',
    });
  }
  return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  prefix: process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'http://47.108.228.86',
  timeout: 20 * 1000,
});
request.interceptors.request.use((url, options) => {
  // 自动携带token
  const token = localStorage.getItem('PASSPORT_TOKEN') || ''
  const headers = token 
  ? options.headers 
  : {...options.headers,'Authorization': token}
  return (
    {
      url,
      options: {
        ...options,
        headers
      },
    }
  )
})

export default request;