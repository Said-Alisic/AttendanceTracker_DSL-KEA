import { ClassTeacherInstance } from '@dsl-app/api-interfaces';
import sequelize from '../db/index';
import { DataTypes } from 'sequelize';

const ClassTeacher = sequelize.define<ClassTeacherInstance>(
  'ClassTeacher',
  {
    class_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    teacher_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
    },
  }, {
    tableName: 'class_teachers',
    timestamps: false
  }
);

export default ClassTeacher;