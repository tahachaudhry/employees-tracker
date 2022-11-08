USE employees_db;

INSERT INTO department (department_name)
VALUES ('Insurance'),
       ('Managment'),
       ('Clinical');

INSERT INTO employee_role (title, salary, department_id)
VALUES ('Financial Service Rep', 60000, 1),
       ('Practice Manager', 80000, 2),
       ('Dentist', 200000, 3),
       ('Dental Hygienist', 90000, 3),
       ('Dental Assistant', 50000, 3),
       ('Assistant Manager', 65000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Casey', 'Novak', 1, 6408),
       ('Olivia', 'Benson', 2, 9264),
       ('John', 'Munch', 3, 3286),
       ('Elliot', 'Stabler', 4, 6403),
       ('Don', 'Cragen', 5, 0744),
       ('Fin', 'Tutuola', 6, 7303);