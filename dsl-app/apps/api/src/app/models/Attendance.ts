import { AttendanceInstance } from '@dsl-app/api-interfaces';
import sequelize from '../db/index';
import { DataTypes } from 'sequelize';

const Attendance = sequelize.define<AttendanceInstance>(
  'Attendance',
  {
    code_id: {
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