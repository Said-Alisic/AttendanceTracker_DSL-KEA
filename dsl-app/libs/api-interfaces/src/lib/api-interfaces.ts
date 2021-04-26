export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export interface Users {
  items: User[];
}

export interface Class {
  id: number;
  name: string;
} 

export interface Classes {
  items: Class[];
}

export interface Attendance {
  id: number;
  teacher_id: number;
  student_id: number;
  code_id: number;
  date: Date;
  timeslot: Date;
  description: string;
}

export interface Attendances {
  items: Attendance[];
}

export interface Code {
  id: number;
  class_id: number;
  code_string: string;
  expiry_datetime: Date;
  validity: boolean;
}

export interface Codes {
  items: Code[];
}


