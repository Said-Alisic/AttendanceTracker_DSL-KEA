import { ClassInstance } from '@dsl-app/api-interfaces';
import sequelize from '../db/index';
import { DataTypes } from 'sequelize';

const Class = sequelize.define<ClassInstance>(
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
      unique: true,
      type: DataTypes.TEXT,
    },
  }, {
    tableName: 'classes',
    timestamps: false
  }
);

export default Class;