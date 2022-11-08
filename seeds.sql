USE employees_db;

INSERT INTO department (department_name)
VALUES ('Sales'),
       ('Engineering'),
       ('Legal');

INSERT INTO employee_role (title, salary, department_id)
VALUES ('Financial Service Rep', 60000, 1),
       ('Practice Manager', 80000, 2),
       ('Legal Manager', 200000, 3),
       ('Assoc Engineer', 90000, 3),
       ('Sr Engineer', 50000, 3),
       ('Sales Manager', 65000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, 6408),
       ('Mike', 'Chan', 2, 9264),
       ('Kevin', 'Tupik', 3, 3286),
       ('Elliot', 'Tommy', 4, 6403),
       ('Don', 'Craig', 5, 0744),
       ('Kim', 'kar', 6, 7303);