import { ClassStudentInstance } from '@dsl-app/api-interfaces';
import sequelize from '../db/index';
import { DataTypes } from 'sequelize';

const ClassStudent = sequelize.define<ClassStudentInstance>(
  'ClassStudent',
  {
    class_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    student_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
    },
  }, {
    tableName: 'class_students',
    timestamps: false
  }
);

export default ClassStudent;