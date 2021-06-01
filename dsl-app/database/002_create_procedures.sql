# PROCEDURES
USE attendance_checker;

DROP PROCEDURE IF EXISTS get_attendances_by_class;
DROP PROCEDURE IF EXISTS get_possible_students;
DROP PROCEDURE IF EXISTS get_attendance_percentage_by_class;

DELIMITER $$
    CREATE PROCEDURE get_attendances_by_class(class_id INT)
        BEGIN
            SELECT class.name, student.email, student.first_name, student.last_name,
                   attendance.description, SUBSTRING(code.date, 1, 10) AS date,
                   timeslot, code_string, student_id, code_id,
                   CASE
                       WHEN attendance.present<>0 THEN 'Yes'
                       WHEN attendance.present=0 THEN 'No'
                       ELSE 'Unknown'
                   END as present
            FROM attendances AS attendance
            INNER JOIN codes AS code ON attendance.code_id = code.id
            INNER JOIN classes AS class ON code.class_id = class.id
            INNER JOIN users AS student on attendance.student_id = student.id
            WHERE class.id = code.class_id ORDER BY code.date;
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

DELIMITER $$
    CREATE PROCEDURE get_attendance_percentage_by_class(class_id INT)
        BEGIN
            SELECT class.name, student.first_name, student.last_name, student.email,
                ROUND((COUNT(CASE WHEN present = TRUE THEN 1 END) / COUNT(attendance.student_id) * 100), 2)
                    AS percentage_present,
                ROUND((COUNT(CASE WHEN present = FALSE THEN 1 END) / COUNT(attendance.student_id) * 100), 2)
                    AS percentage_not_present
            FROM attendances AS attendance
                INNER JOIN codes AS code ON attendance.code_id = code.id
                INNER JOIN classes AS class ON code.class_id = class.id
                INNER JOIN users AS student on attendance.student_id = student.id
                WHERE code.class_id = class_id GROUP BY attendance.student_id;
        END $$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE get_attendances_by_class TO 'admin'@'localhost';
GRANT EXECUTE ON PROCEDURE get_possible_students TO 'admin'@'localhost';
GRANT EXECUTE ON PROCEDURE get_attendance_percentage_by_class TO 'admin'@'localhost';
