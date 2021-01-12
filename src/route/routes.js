import User from '../pages/user';
import Users from '../pages/users';
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
  userChangePassword: {
    path: '/admin/users/:id/change-password',
    component: UserChangePassword
  },
};
