import { registerAs } from '@nestjs/config';

export default registerAs('jwtRefresh', () => ({
  secret: process.env.JWT_REFRESH_SECRET,
  signOptions: { expiresIn: process.env.JWT_REFRESH_TIME },
  expiresIn: process.env.JWT_REFRESH_TIME,
}));
