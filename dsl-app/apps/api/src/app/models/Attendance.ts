import { AttendanceInstance } from '@dsl-app/api-interfaces';
import sequelize from '../db/index';
import { DataTypes } from 'sequelize';
// import { DataTypes, Model, Optional } from 'sequelize';
// import Attendance from './Attendance';

// interface AttendanceCreationAttributes
//   extends Optional<Attendance, 'id'> {}

const Attendance = sequelize.define<AttendanceInstance>(
  'User',
  {
    lesson_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    student_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    present: {
      defaultValue: 0,
      type: DataTypes.TINYINT,
    },
    description: {
      allowNull: true,
      type: DataTypes.TEXT,
    }
  }, {
    tableName: 'attendances',
    timestamps: false
  }
);

export default Attendance;