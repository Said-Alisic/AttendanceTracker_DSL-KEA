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

# PROCEDURES
USE attendance_checker;
DROP PROCEDURE IF EXISTS get_attendances_by_class;
DROP PROCEDURE IF EXISTS get_possible_students;

DELIMITER $$
    CREATE PROCEDURE get_attendances_by_class(class_id INT)
        BEGIN
            SELECT class.name,student.email,student.first_name,student.last_name,
                   attendance.description,SUBSTRING(code.date, 1, 10) AS date,
                   SUBSTRING(code.timeslot, 12, 5) AS timeslot,
                   code_string,student_id,code_id,
                   CASE
                       WHEN attendance.present<>0 THEN 'Yes'
                       WHEN attendance.present=0 THEN 'No'
                       ELSE 'Unknown'
                   END,
                   present
            FROM attendances AS attendance
            INNER JOIN codes AS code ON attendance.code_id = code.id
            INNER JOIN classes AS class ON code.class_id = class.id
            INNER JOIN users AS student on attendance.student_id = student.id
            WHERE class.id = class_id ORDER BY timeslot;
        END $$
DELIMITER ;

DELIMITER $$
    CREATE PROCEDURE get_possible_students(class_id INT)
        BEGIN
            SELECT DISTINCT users.id, users.first_name, users.last_name, users.email
            FROM users
            INNER JOIN class_students on users.id = class_students.student_id
            WHERE class_students.class_id != class_id AND users.role = 'STUDENT'
            AND users.id NOT IN (
                SELECT users.id
                FROM users
                INNER JOIN class_students on users.id = class_students.student_id
                WHERE class_students.class_id = class_id
                );
        END $$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE get_attendances_by_class TO 'admin'@'localhost';
GRANT EXECUTE ON PROCEDURE get_possible_students TO 'admin'@'localhost';


# POPULATING THE DATABASE
USE attendance_checker;
# All passwords: $2a$12$LxnehOJRiQ6NxA1NjVbjGeUvyEcvcBpu5X8ZplXLhO.NV/cW0aPUq -> 1234
INSERT INTO users (first_name, last_name, password, email, role) VALUES
('admin', 'user', '$2a$12$LxnehOJRiQ6NxA1NjVbjGeUvyEcvcBpu5X8ZplXLhO.NV/cW0aPUq', 'adminuser@KEA.dk', 'ADMIN'),
('Andrea', 'Corradini', '$2a$12$LxnehOJRiQ6NxA1NjVbjGeUvyEcvcBpu5X8ZplXLhO.NV/cW0aPUq', 'corradinimail@KEA.dk','TEACHER'),
('Bob', 'Bayes', '$2a$12$LxnehOJRiQ6NxA1NjVbjGeUvyEcvcBpu5X8ZplXLhO.NV/cW0aPUq', 'bobbayes@KEA.dk','STUDENT'),
('Jamie', 'Boe', '$2a$12$LxnehOJRiQ6NxA1NjVbjGeUvyEcvcBpu5X8ZplXLhO.NV/cW0aPUq', 'jamieboe@KEA.dk','STUDENT'),
('Jiji', 'Jayce', '$2a$12$LxnehOJRiQ6NxA1NjVbjGeUvyEcvcBpu5X8ZplXLhO.NV/cW0aPUq', 'jijijayce@KEA.dk','STUDENT'),
('Doe', 'Dudu', '$2a$12$LxnehOJRiQ6NxA1NjVbjGeUvyEcvcBpu5X8ZplXLhO.NV/cW0aPUq', 'doedudu@KEA.dk','STUDENT'),
('Beck', 'Iou', '$2a$12$LxnehOJRiQ6NxA1NjVbjGeUvyEcvcBpu5X8ZplXLhO.NV/cW0aPUq', 'beckiou@KEA.dk','STUDENT');

INSERT INTO classes (id, name) VALUES
(1, 'Databases - DAT109'),
(2, 'Data Science - DAT020'),
(3, 'DSL - DAT 203'),
(4, 'IT Security - DAT 384');

INSERT INTO codes (id, class_id, code_string, coord_lat, coord_lon, date, timeslot, expiry_datetime) VALUES
(1, 2, 'c3DN98c1', 56.15, 10.18, '2021-4-30 09:00:00', '09:00:00', '2021-4-13 09:10:00'),
(2, 1, '68n67TJE', 93.34, 39.78, '2021-4-30 10:00:00', '10:00:00', '2021-4-4 10:10:00'),
(3, 1, '68n67TJE', 93.34, 39.78, '2021-4-30 10:45:00', '10:45:00', '2021-4-4 10:10:00'),
(4, 4, '234v3cEA', 76.26, 32.16, '2021-4-30 08:30:00', '08:30:00', '2021-4-1 08:40:00'),
(5, 3, 'c3D12c3v', 46.91, 68.35, '2021-4-30 13:00:00', '13:00:00', '2021-4-29 13:10:00');

INSERT INTO class_students (class_id, student_id) VALUES
(1, 7),
(1, 4),
(2, 3),
(2, 4),
(3, 3),
(3, 5),
(4, 7),
(4, 6);

INSERT INTO class_teachers (class_id, teacher_id) VALUES
(3, 2);

INSERT INTO attendances (code_id, student_id, present) VALUES
(1, 7, 0),
(1, 4, 1),
(2, 5, 1),
(2, 6, 1),
(2, 4, 1),
(3, 5, 1),
(3, 6, 0),
(3, 3, 0),
(3, 7, 0),
(4, 7, 1),
(4, 3, 1),
(4, 4, 1);




# TESTING THE DATA
SELECT * FROM users;

SELECT * FROM classes;

SELECT * FROM codes;

SELECT * FROM class_students;
SELECT * FROM class_students INNER JOIN users ON id = student_id WHERE class_id = 4;
SELECT class_id, student_id, id, first_name, last_name FROM class_students INNER JOIN users ON id = student_id WHERE class_id = 2;

SELECT * FROM attendances;
SELECT * FROM attendances WHERE code_id = 8;
SELECT * FROM attendances INNER JOIN codes ON id = code_id WHERE code_string = 'ojRdmKBn';

CALL get_attendances_by_class(1);
CALL get_attendances_by_class(2);
CALL get_attendances_by_class(3);
CALL get_attendances_by_class(4);

call get_possible_students(1);
call get_possible_students(2);
call get_possible_students(3);
call get_possible_students(4);
