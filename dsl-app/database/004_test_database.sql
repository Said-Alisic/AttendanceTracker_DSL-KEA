# TESTS
USE attendance_checker;

SELECT * FROM classes;
SELECT * FROM users;
SELECT * FROM codes;
SELECT * FROM class_teachers;

SELECT * FROM class_students;
SELECT * FROM class_students INNER JOIN users ON id = student_id WHERE class_id = 1;
SELECT class_id, student_id, id, first_name, last_name FROM class_students INNER JOIN users ON id = student_id WHERE class_id = 2;
SELECT class_id, student_id, id, first_name, last_name FROM class_students INNER JOIN users ON id = student_id;

SELECT * FROM attendances;
SELECT * FROM attendances
    inner join  users u on attendances.student_id = u.id
    inner join codes c on attendances.code_id = c.id WHERE class_id = 1
    ORDER BY u.first_name;
SELECT * FROM attendances ORDER BY present;
SELECT * FROM attendances WHERE code_id = 9;
SELECT * FROM attendances INNER JOIN codes ON id = code_id WHERE code_string = 'ojRdmKBn';

CALL get_attendances_by_class(1);
CALL get_attendances_by_class(2);
CALL get_attendances_by_class(3);
CALL get_attendances_by_class(4);

call get_possible_students(1);
call get_possible_students(2);
call get_possible_students(3);
call get_possible_students(4);

call get_attendance_percentage_by_class(1);
call get_attendance_percentage_by_class(2);
call get_attendance_percentage_by_class(3);
call get_attendance_percentage_by_class(4);
