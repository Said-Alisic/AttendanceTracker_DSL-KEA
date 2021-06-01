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
('Beck', 'Iou', '$2a$12$LxnehOJRiQ6NxA1NjVbjGeUvyEcvcBpu5X8ZplXLhO.NV/cW0aPUq', 'beckiou@KEA.dk','STUDENT'),
('Petelgeuse', 'Romanee-Conti', '$2a$12$LxnehOJRiQ6NxA1NjVbjGeUvyEcvcBpu5X8ZplXLhO.NV/cW0aPUq', 'teacheruser@KEA.dk','TEACHER'),
('Subaru', 'Natsuki', '$2a$12$LxnehOJRiQ6NxA1NjVbjGeUvyEcvcBpu5X8ZplXLhO.NV/cW0aPUq', 'natsuki@KEA.dk','TEACHER');

INSERT INTO classes (name) VALUES
('Databases - DAT109'),
('Data Science - DAT020'),
('DSL - DAT 203'),
('IT Security - DAT 384');

INSERT INTO codes (id, class_id, code_string, coord_lat, coord_lon, date, timeslot, expiry_datetime) VALUES
(1, 2, 'c3DN98c1', 56.15, 10.18, '2021-4-30 09:00:00', '09:00:00', '2021-4-13 09:10:00'),
(2, 1, '68n67TJE', 93.34, 39.78, '2021-4-30 10:00:00', '10:00:00', '2021-4-4 10:10:00'),
(3, 1, '68n67TJE', 93.34, 39.78, '2021-4-30 10:45:00', '10:45:00', '2021-4-4 10:55:00'),
(4, 1, '68Gd7TJE', 93.34, 39.78, '2021-4-30 11:30:00', '11:30:00', '2021-4-4 11:40:00'),
(5, 1, '68h0lTJE', 93.34, 39.78, '2021-4-30 12:15:00', '12:15:00', '2021-4-4 12:25:00'),
(6, 1, '6Ty8lTJE', 93.34, 39.78, '2021-4-30 13:00:00', '13:00:00', '2021-4-4 13:10:00'),
(7, 4, '234v3cEA', 76.26, 32.16, '2021-4-30 08:30:00', '08:30:00', '2021-4-1 08:40:00'),
(8, 3, 'c3D12c3v', 46.91, 68.35, '2021-4-30 13:00:00', '13:00:00', '2021-4-29 13:10:00');

INSERT INTO class_students (class_id, student_id) VALUES
(1, 3),
(2, 3),
(3, 3),
(4, 3),
(1, 4),
(2, 4),
(3, 4),
(4, 4),
(1, 5),
(2, 5),
(3, 5),
(4, 5),
(1, 6),
(2, 6),
(3, 6),
(4, 6),
(1, 7),
(2, 7),
(3, 7),
(4, 7);


INSERT INTO class_teachers (class_id, teacher_id) VALUES
(3, 2),
(1, 8),
(2, 8),
(4, 9);

INSERT INTO attendances (code_id, student_id, present) VALUES
(1, 3, 1),
(2, 3, 1),
(3, 3, 1),
(4, 3, 1),
(5, 3, 1),
(6, 3, 1),
(7, 3, 1),
(8, 3, 1),
(1, 4, 0),
(2, 4, 0),
(3, 4, 0),
(4, 4, 1),
(5, 4, 0),
(6, 4, 0),
(7, 4, 0),
(8, 4, 0),
(1, 5, 1),
(2, 5, 0),
(3, 5, 1),
(4, 5, 1),
(5, 5, 0),
(6, 5, 1),
(7, 5, 1),
(8, 5, 1),
(1, 6, 0),
(2, 6, 0),
(3, 6, 0),
(4, 6, 0),
(5, 6, 0),
(6, 6, 0),
(7, 6, 1),
(8, 6, 0),
(1, 7, 1),
(2, 7, 0),
(3, 7, 1),
(4, 7, 1),
(5, 7, 1),
(6, 7, 0),
(7, 7, 0),
(8, 7, 1);
