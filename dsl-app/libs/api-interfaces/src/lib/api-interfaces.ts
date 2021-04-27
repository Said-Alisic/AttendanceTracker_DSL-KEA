import { Model } from 'sequelize';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}
export interface UserInstance extends Model<User>, User {}
export interface Users {
  items: User[];
}

export interface Class {
  id: number;
  name: string;
} 
export interface ClassInstance extends Model<Class>, Class {}
export interface Classes {
  items: Class[];
}

export interface Lesson {
  id: number;
  class_id: number;
  date: Date;
  timeslot: Date;
}
export interface LessonInstance extends Model<Lesson>, Lesson {}
export interface Lessons {
  items: Lesson[];
}

export interface Code {
  id: number;
  lesson_id: number;
  code_string: string;
  expiry_datetime: Date;
  validity: boolean;
}
export interface CodeInstance extends Model<Code>, Code {}
export interface Codes {
  items: Code[];
}

export interface Attendance {
  lesson_id: number;
  student_id: number;
  present: boolean;
  description: string;
}
export interface AttendanceInstance extends Model<Attendance>, Attendance {}
export interface Attendances {
  items: Attendance[];
}


export interface ClassStudent {
  class_id: number;
  student_id: number;
}
export interface ClassStudentInstance extends Model<ClassStudent>, ClassStudent {}
export interface ClassStudents {
  items: ClassStudent[];
}

export interface ClassTeacher {
  class_id: number;
  student_id: number;
}
export interface ClassTeacherInstance extends Model<ClassTeacher>, ClassTeacher {}
export interface ClassTeachers {
  items: ClassTeacher[];
}



