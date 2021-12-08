export default () => ({
  env: process.env.NODE_ENV,
  port: process.env.PORT,

  name: process.env.APP_NAME,
  url: process.env.APP_URL,

  keyHeader: process.env.APP_KEY_HEADER,
  key: process.env.APP_KEY,

  isProd: isProd(process.env.NODE_ENV),
});

const isProd = (env: string) => {
  if (env == 'prod') {
    return true;
  } else {
    return false;
  }
};
