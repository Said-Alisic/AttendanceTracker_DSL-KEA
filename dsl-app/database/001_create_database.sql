DROP DATABASE IF EXISTS attendance_checker;
CREATE DATABASE IF NOT EXISTS attendance_checker;

USE attendance_checker;

CREATE TABLE classes (
  id INT(11) AUTO_INCREMENT NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL UNIQUE,

  PRIMARY KEY (id)
);

CREATE TABLE users (
  id INT(11) AUTO_INCREMENT NOT NULL UNIQUE,
  first_name VARCHAR(120) NOT NULL,
  last_name VARCHAR(120) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  password VARCHAR(120) NOT NULL,
  role VARCHAR(120) NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE codes (
  id INT(11) AUTO_INCREMENT NOT NULL UNIQUE,
  class_id INT(11) NOT NULL,
  code_string VARCHAR(50) NOT NULL,
  coord_lat DOUBLE NOT NULL,
  coord_lon DOUBLE NOT NULL,
  date DATETIME DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
  timeslot TIME NOT NULL,
  expiry_datetime DATETIME DEFAULT (CURRENT_TIMESTAMP + INTERVAL 10 MINUTE) NOT NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (class_id) REFERENCES classes(id)
       ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE attendances (
  code_id INT(11) NOT NULL,
  student_id INT(11) NOT NULL,
  description VARCHAR(120),
  present TINYINT(1) NOT NULL DEFAULT 0,

  PRIMARY KEY (code_id, student_id),
  FOREIGN KEY (code_id) REFERENCES codes(id)
       ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES users(id)
       ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE class_students (
  class_id INT(11) NOT NULL,
  student_id INT(11) NOT NULL,

  PRIMARY KEY (class_id, student_id),
  FOREIGN KEY (class_id) REFERENCES classes(id)
       ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES users(id)
       ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE class_teachers (
  class_id INT(11) NOT NULL ,
  teacher_id INT(11) NOT NULL,

  PRIMARY KEY (class_id, teacher_id),
  FOREIGN KEY (class_id) REFERENCES classes(id)
       ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (teacher_id) REFERENCES users(id)
       ON UPDATE CASCADE ON DELETE CASCADE
);

# Create new 'admin' user and grant CRUD privileges on all of our clothes_store tables
CREATE USER IF NOT EXISTS 'admin'@'localhost' IDENTIFIED BY '11223344';
GRANT SELECT, INSERT, UPDATE, DELETE
ON attendance_checker.*
TO admin@localhost;

SELECT user FROM mysql.user;
