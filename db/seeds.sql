INSERT INTO departments (name)
    VALUES
        ('Finance'),
        ('Legal'),
        ('Sales'),
        ('Engineering'),
        ('Marketing');

INSERT INTO roles (title, salary, department_id)
    VALUES
        ('Accountant', 100000, 1),
        ('Auditor', 150000, 1),
        ('Finance Manager', 90000, 1),
        ('Lawyer', 200000, 2),
        ('Secretary', 50000, 2),
        ('Sales Manager', 60000, 3),
        ('Salesperson', 70000, 3),
        ('Lead Engineer', 120000, 4),
        ('Account Manager', 90000, 5),
        ('Graphic Designer', 90000, 5),
        ('Developer', 100000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES
        ('Joe', 'Smith', 1, NULL),
        ('Erica', 'Trenholm', 2, 1),
        ('Sam', 'Sample', 3, 2),
        ('John', 'Jacob', 4, NULL),
        ('Mary', 'Johnson', 5, 4),
        ('Linda', 'Lo', 6, NULL),
        ('Chris', 'Anderson', 7, 6)