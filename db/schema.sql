DROP DATABASE IF EXISTS employeetracker;
CREATE DATABASE employeetracker;
USE employeetracker;

DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL  NOT NULL,
    department_id INTEGER,
        FOREIGN KEY (department_id) 
        REFERENCES departments(id) 
        ON DELETE SET NULL
);

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
        FOREIGN KEY (role_id)
        REFERENCES roles(id)
        ON DELETE SET NULL,
    manager_id INTEGER,
        FOREIGN KEY (manager_id)
        REFERENCES employees(id)
        ON DELETE SET NULL
);