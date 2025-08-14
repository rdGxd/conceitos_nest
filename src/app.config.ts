export default () => ({
  jwt: {},
  database: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASS,
    synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
    autoLoadEntities: Boolean(process.env.DATABASE_AUTOLOADENTITIES),
  },
  environment: process.env.NODE_ENV || 'development',
});
