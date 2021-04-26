import { ClassInstance } from '@dsl-app/api-interfaces';
import sequelize from '../db/index';
import { DataTypes } from 'sequelize';
// import { DataTypes, Model, Optional } from 'sequelize';
// import Attendance from './Attendance';

// interface ClassCreationAttributes
//   extends Optional<Class, 'id'> {}


export const Class = sequelize.define<ClassInstance>(
  'Class',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
    },
    name: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  }
);