require('dotenv').config()
module.exports = {
  development: {
    database: "balloon_dev",
    host: "127.0.0.1",
    dialect: "postgres",
    define: {
      "underscored": true
    }
  },
  test: {
    database: "balloon_test",
    host: "127.0.0.1",
    dialect: "postgres",
    define: {
        "underscored": true
      }
  },
  production: {
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME,
    host: process.env.RDS_HOSTNAME,
    dialect: 'postgres',
    define: {
        "underscored": true
      }
  }
}
