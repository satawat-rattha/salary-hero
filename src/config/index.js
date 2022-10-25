require('dotenv').config()

module.exports = {
    Port: process.env.PORT,
    db: {
        postgres: {
            server: process.env.DB_SERVER,
            user: process.env.DB_USER,
            pass: process.env.DB_PASS,
            dbname: process.env.DB_NAME,
            port: process.env.DB_PORT,
        }
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        accessExpire: process.env.JWT_ACCESS_EXPIRE,
        refreshExpire: process.env.JWT_REFRESH_EXPIRE,
    }
}