import { Sequelize } from 'sequelize-typescript'
import { Dialect } from 'sequelize/types'

// db connection config
const DB_HOST: string = process.env.DB_HOST
const DB: string  = process.env.DB
const DB_USER: string  = process.env.DB_USER
const DB_PASS: string  = process.env.DB_PASS
const DB_DIALECT: Dialect = 'mysql' // Which type of db to connect to; in our case, a 'mysql' database

// Sequelize database connection
const sequelize: Sequelize = new Sequelize(DB, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  timezone: '+02:00', // for writing to database
  models: [__dirname + '../models'],
  logging: false,
});

export default sequelize;