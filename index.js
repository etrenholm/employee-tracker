const inquirer = require('inquirer');
const db = require('./db/connection')
const consoleTable = require('console.table')

startMenu = function() {
    inquirer
        .prompt({
            type: 'list',
            name: 'action',
            message: 'Would you like to do?',
            choices: 
            [
                'View All Departments', 
                'View All Roles',
                'View All Employees', 
                'Add Department',
                'Add Role', 
                'Add Employee',
                'Update Employee Role',
                'Exit'
            ]
        })
        .then(({ action }) => {
            if (action === 'View All Departments') {
                viewDepartments()
            } else if (action === 'View All Roles') {
                viewRoles()
            } else if (action === 'View All Employees') {
                viewEmployees()
            } else if (action === 'Add Department') {
                addDepartment()
            } else if (action === 'Add Role') {
                addRole()
            } else if (action === 'Add Employee') {
                addEmployee()
            } else if (action === 'Update Employee Role') {
                updateEmployeeRole()
            } else if (action === 'Exit') {
                return;
            }
        })
}

// VIEW ALL DEPARTMENTS, ROLES, OR EMPLOYEES
viewDepartments = function() {
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
        startMenu();
      });
}

viewRoles = function() {
    const sql = `SELECT * FROM roles`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
        startMenu();
      });
}

viewEmployees = function() {
    const sql = `SELECT 
                employees.id,
                employees.first_name, 
                employees.last_name,
                roles.title
                FROM employees
                JOIN roles ON employees.role_id = roles.id`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
        startMenu();
      });
}

// ADD DEPARTMENTS, ROLES, OR EMPLOYEES
addDepartment = function() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'department',
                message: 'What department would you like to add?',
            }
        ])
        .then ((answer) => {
            const param = [answer.department]
            const sql = `INSERT INTO departments (name) VALUES (?)`;

            db.query(sql, param, (err, res) => {
                if (err) throw err;
                console.log('You have added ' + answer.department + 'to the database.');
                viewDepartments();
            });
        })
}

addRole = function() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What role would you like to add?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of this role?',
            },
            {
                type: 'list',
                name: 'department',
                message: 'What department does this role belong to?',
                choices: 
                // add choices based on current table
                [
                    'Finance',
                    'Legal',
                    'Sales',
                    'Engineering',
                    'Marketing'
                ]
            }
        ])
        .then ((answers) => {
            const params = [answers.title, answers.salary, answers.department]
            // convert department id into number???
            const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;

            db.query(sql, params, (err, res) => {
                if (err) throw err;
                console.log('You have added ' + answers.title + 'to the database');
                viewDepartments();
                });
        })
}

addEmployee = function() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: "What is the employee's first name?",
            },
            {
                type: 'input',
                name: 'lastName',
                message: "What is the employee's last name?",
            },
            {
                type: 'input',
                name: 'role',
                message: "What is the employee's role?",
            },
            {
                type: 'input',
                name: 'manager',
                message: "Who employee's manager?",
            }
        ])
            .then ((answers) => {
                // convert role and manager id into number???
                const params = [answers.firstName, answers.lastName, answers.role, answers.manager]
                const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?)`;

                // ADD DB.QUERY
            })
}

updateEmployeeRole = function() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'employee',
                message: "Select an employee to update:",
                choices: 
                // input choices from 
                [
                    'employee name'
                ]
            },
            // then what???
        ])
            .then ((answers) => {
                // convert role into number???

                const sql = `UPDATE roles
                SET title = ? WHERE id = ?
                `

                // ADD DB.QUERY
            })
    }
    


startMenu()