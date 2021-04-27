import { CodeInstance } from '@dsl-app/api-interfaces';
import sequelize from '../db/index';
import { DataTypes } from 'sequelize';
// import { DataTypes, Model, Optional } from 'sequelize';
// import Code from './Code';

// interface CodeCreationAttributes
//   extends Optional<Code, 'id'> {}


export const Code = sequelize.define<CodeInstance>(
  'User',
  {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.UUID,
        unique: true,
      },
    lesson_id: {
      allowNull: false,
      primaryKey: false,
      type: DataTypes.UUID,
    },
    code_string: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    expiry_datetime: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    validity: {
      defaultValue: 1,
      type: DataTypes.TINYINT,
    }
  }, {
    tableName: 'codes',
    timestamps: false
  }
);