import { LessonInstance } from '@dsl-app/api-interfaces';
import sequelize from '../db/index';
import { DataTypes } from 'sequelize';
// import { DataTypes, Model, Optional } from 'sequelize';
// import Lesson from './Lesson';

// interface LessonCreationAttributes
//   extends Optional<Lesson, 'id'> {}

const Lesson = sequelize.define<LessonInstance>(
  'User',
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
    date: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    timeslot: {
        allowNull: true,
        type: DataTypes.DATE,
    }
  }, {
    tableName: 'lessons',
    timestamps: false
  }
);

export default Lesson;