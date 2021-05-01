import { Model } from 'sequelize';

export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
}
export interface UserInstance extends Model<User>, User {}
export interface Users {
  items: User[];
}

export interface Class {
  id?: number;
  name: string;
} 
export interface ClassInstance extends Model<Class>, Class {}
export interface Classes {
  items: Class[];
}

// May delete
export interface Lesson {
  id?: number;
  class_id: number;
  date: Date;
  timeslot: Date;
}
export interface LessonInstance extends Model<Lesson>, Lesson {}
export interface Lessons {
  items: Lesson[];
}

export interface Code {
  id?: number;
  class_id: number;
  code_string: string;
  coord_lat: string;
  coord_lon: string;
  date?: string;
  timeslot: string;
  expiry_datetime: string;
  validity?: boolean;
}
export interface CodeInstance extends Model<Code>, Code {}
export interface Codes {
  items: Code[];
}

export interface Attendance {
  code_id: number;
  student_id: number;
  present?: boolean;
  description?: string;
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
  teacher_id: number;
}
export interface ClassTeacherInstance extends Model<ClassTeacher>, ClassTeacher {}
export interface ClassTeachers {
  items: ClassTeacher[];
}



