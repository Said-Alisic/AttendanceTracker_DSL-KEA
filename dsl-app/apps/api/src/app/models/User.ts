import { UserInstance } from '@dsl-app/api-interfaces';
import sequelize from '../db/index';
import { DataTypes } from 'sequelize';

const User = sequelize.define<UserInstance>(
  'User',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
    },
    first_name: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    last_name: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.TEXT,
    },
    password: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    role: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  }, {
    tableName: 'users',
    timestamps: false
  }
);

export default User;