import { ClassStudentInstance } from '@dsl-app/api-interfaces';
import sequelize from '../db/index';
import { DataTypes } from 'sequelize';
// import { DataTypes, Model, Optional } from 'sequelize';
// import ClassStudent from './ClassStudent';

// interface ClassStudentCreationAttributes
//   extends Optional<ClassStudent, 'id'> {}


const ClassStudent = sequelize.define<ClassStudentInstance>(
  'ClassTeacher',
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