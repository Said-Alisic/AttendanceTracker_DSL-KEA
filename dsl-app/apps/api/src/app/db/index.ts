import { Sequelize } from 'sequelize-typescript'
import { Dialect } from 'sequelize/types'


// db connection config
const DB_HOST  = process.env.DB_HOST
const DB  = process.env.DB
const DB_USER  = process.env.DB_USER
const DB_PASS  = process.env.DB_PASS
const DB_DIALECT = process.env.DB_PASS as Dialect // Which type of db to connect to; in our case, a 'mysql' database

// Sequelize database connection
const sequelize = new Sequelize(DB, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    models: [__dirname + '../models'],
    logging: false,
});

export default sequelize;