export default () => ({
  env: process.env.NODE_ENV,
  port: process.env.PORT,

  name: process.env.APP_NAME,
  url: process.env.APP_URL,

  keyHeader: process.env.APP_KEY_HEADER,
  key: process.env.APP_KEY,

  docsPwd: process.env.DOCS_PWD,

  isProd: isProd(process.env.NODE_ENV),
  isDev: isDev(process.env.NODE_ENV),
});

const isProd = (env: string) => {
  if (env == 'prod') {
    return true;
  } else {
    return false;
  }
};

const isDev = (env: string) => {
  if (env == 'dev') {
    return true;
  } else {
    return false;
  }
};
