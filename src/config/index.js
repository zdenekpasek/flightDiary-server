const config = {
  dbUrl:
    process.env.DBURL ||
    'mongodb+srv://admin:774146480admin@cluster0.2altz.mongodb.net/<dbname>?retryWrites=true&w=majority',
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  logDir: process.env.LOGDIR || 'logs',
  viewEngine: process.env.VIEW_ENGINE || 'html',
};

module.exports = config;
