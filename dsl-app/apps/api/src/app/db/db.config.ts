import sequelize from './index'
import User from '../models/User'
import Class from '../models/Class'
import Code from '../models/Code'
import Attendance from '../models/Attendance'
import ClassStudent from '../models/ClassStudent'
import ClassTeacher from '../models/ClassTeacher'

Class.hasMany(Code, {foreignKey: 'class_id'})
Class.hasOne(ClassTeacher, {foreignKey: 'class_id'})
Class.hasMany(ClassStudent, {foreignKey: 'class_id'})
Code.belongsTo(Class, {foreignKey: 'class_id'}); 
Code.hasMany(Attendance, {foreignKey: 'code_id'}); 
User.hasMany(Attendance, {foreignKey: 'student_id'})
Attendance.belongsTo(User,  {foreignKey: 'student_id'})
Attendance.belongsTo(Code,  {foreignKey: 'code_id'})
ClassTeacher.belongsTo(Class, {foreignKey: 'class_id'}); 
ClassStudent.belongsTo(Class, {foreignKey: 'class_id'}); 
// Class.hasMany(Code)
// Class.hasOne(ClassTeacher)
// Class.hasMany(ClassStudent)
// Code.belongsTo(Class); 
// Code.hasMany(Attendance); 
// User.hasMany(Attendance)
// Attendance.belongsTo(User,)
// Attendance.belongsTo(Code,)
// ClassTeacher.belongsTo(Class); 
// ClassStudent.belongsTo(Class); 

const dbConfig = {
    Sequelize: sequelize,
    User: User,
    Class: Class,
    Code: Code,
    Attendance: Attendance,
    ClassStudent: ClassStudent,
    ClassTeacher: ClassTeacher,
  };

export default dbConfig;
