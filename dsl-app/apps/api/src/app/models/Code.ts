import { CodeInstance } from '@dsl-app/api-interfaces';
import sequelize from '../db/index';
import { DataTypes } from 'sequelize';
// import { DataTypes, Model, Optional } from 'sequelize';
// import Code from './Code';

// interface CodeCreationAttributes
//   extends Optional<Code, 'id'> {}

const Code = sequelize.define<CodeInstance>(
  'Code',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
    },
    class_id: {
      allowNull: false,
      primaryKey: false,
      type: DataTypes.UUID,
    },
    code_string: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    coord_lat: {
      allowNull: false,
      type: DataTypes.NUMBER,
    },
    coord_lon: {
      allowNull: false,
      type: DataTypes.NUMBER,
    },
    date: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    timeslot: {
      allowNull: true,
      type: DataTypes.TIME,
    },
    expiry_datetime: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'codes',
    timestamps: false
  }
);

export default Code;