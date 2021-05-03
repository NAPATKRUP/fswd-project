import { AuthenticationError } from 'apollo-server-express';

export const requiredAuth = (next) => (rp) => {
  if (!rp.context.user) {
    throw new AuthenticationError('เข้าสู่ระบบก่อนใช้งาน');
  }
  return next(rp);
};
