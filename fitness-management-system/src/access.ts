import { CurrentUser } from "./services/typings";

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.type === '2',
    canUser: !!currentUser,
    // canSimpleAdmin: currentUser && currentUser
  };
}
