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
  coord_lat VARCHAR(120) NOT NULL,
  coord_lon VARCHAR(120) NOT NULL,
  date DATETIME DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
  timeslot TIME NOT NULL,
  expiry_datetime DATETIME DEFAULT (CURRENT_TIMESTAMP + INTERVAL 10 MINUTE) NOT NULL,
  validity TINYINT(1) NOT NULL,

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
  class_id INT(11) NOT NULL ,
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

CREATE USER IF NOT EXISTS 'admin'@'localhost' IDENTIFIED BY '11223344';
GRANT SELECT, INSERT, UPDATE, DELETE
ON attendance_checker.*
TO admin@localhost;

SELECT user FROM mysql.user;


INSERT INTO users (first_name, last_name, password, email, role) VALUES
('admin', 'user', '1234', 'adminuser@KEA.dk', 'ADMIN'),
('Andrea', 'Corradini', 'andreapass', 'corradinimail@KEA.dk','TEACHER'),
('Bob', 'Bayes', 'BoBaPass', 'bobbayes@KEA.dk','STUDENT'),
('Jamie', 'Boe', 'JoeBoe', 'jamiejoe@KEA.dk','STUDENT'),
('Jiji', 'Jayce', 'lalalala', 'lalalalala@KEA.dk','STUDENT'),
('Doe', 'Dudu', 'dodododo', 'dododododo@KEA.dk','STUDENT'),
('Beck', 'Iou', 'yiyiyiyi', 'yiyiyiyiyi@KEA.dk','STUDENT');

SELECT * FROM users;

INSERT INTO classes (name) VALUES
('Databases - DAT109'),
('Data Science - DAT020'),
('DSL - DAT 203'),
('IT Security - DAT 384');
SELECT * FROM classes;

INSERT INTO codes (class_id, code_string, coord_lat, coord_lon, date, timeslot, expiry_datetime, validity) VALUES
(2, 'c3DN98c1', '56.15', '10.18', '2021-4-30 09:00:00', '09:00:00', '2021-4-13 09:10:00', 1),
(1, '68n67TJE', '93.34', '39.78', '2021-4-30 10:00:00', '10:00:00', '2021-4-4 10:10:00', 1),
(4, '234v3cEA', '76.26', '32.16', '2021-4-30 08:30:00', '08:30:00', '2021-4-1 08:40:00', 1),
(3, 'c3D12c3v', '46.91', '68.35', '2021-4-30 13:00:00', '13:00:00', '2021-4-29 13:10:00', 1);
SELECT * FROM codes;

INSERT INTO class_students (class_id, student_id) VALUES
(1, 7),
(1, 4),
(2, 3),
(2, 4),
(3, 3),
(3, 5),
(4, 7),
(4, 6);
SELECT * FROM class_students;

INSERT INTO attendances (code_id, student_id, present) VALUES
(1, 3, 0),
(1, 2, 1),
(2, 3, 1),
(2, 2, 1),
(3, 3, 0),
(3, 2, 0),
(4, 3, 1),
(4, 2, 1);
SELECT * FROM attendances;


