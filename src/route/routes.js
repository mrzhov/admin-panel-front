import User from '../pages/user';
import Users from '../pages/users';
import UserInfo from '../pages/userInfo';
import UserChangePassword from '../pages/userChangePassword';

export default {
  userPage: {
    path: '/admin/users/:id/edit',
    component: User
  },
  usersPage: {
    path: '/admin/users',
    component: Users
  },
  userInfo: {
    path: '/admin/users/:id',
    component: UserInfo
  },
  userChangePassword: {
    path: '/admin/users/:id/change-password',
    component: UserChangePassword
  },
};
