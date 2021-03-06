const inquirer = require('inquirer');
const db = require('./db/connection')
require('console.table')

function startMenu() {
    inquirer
        .prompt({
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
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
                db.end();
            }
        })
}

// VIEW ALL DEPARTMENTS
function viewDepartments() {
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        startMenu();
      });
}

// VIEW ALL ROLES
function viewRoles() {
    const sql = `SELECT roles.id,
                    roles.title,
                    roles.salary,
                    departments.name AS department
                FROM roles
                LEFT JOIN departments
                    ON roles.department_id = departments.id`;

    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        startMenu();
      });
}

// VIEW ALL EMPLOYEES
function viewEmployees() {
    const sql = `SELECT employees.id,
                    employees.first_name, 
                    employees.last_name,
                    roles.title,
                    departments.name AS department,
                    roles.salary,
                    CONCAT(employee.first_name,' ',employee.last_name) AS manager
                FROM employees
                LEFT JOIN roles
                    ON employees.role_id = roles.id
                LEFT JOIN departments
                    ON roles.department_id = departments.id
                LEFT JOIN employees AS employee
                    ON employees.manager_id = employee.id`;

    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        startMenu();
      });
}

// ADD A DEPARTMENT
function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'department',
                message: 'Please type the department you would like to add?',
                validate: departmentInput => {
                    if (departmentInput) {
                        return true
                    } else {
                        console.log("Please enter a department.")
                        return false
                    }
                }
            }
        ])
        .then ((answer) => {
            const param = [answer.department]
            const sql = `INSERT INTO departments (name) VALUES (?)`;

            db.query(sql, param, (err, res) => {
                if (err) throw err;
                console.log('You have added ' + answer.department + ' to the database.');
                startMenu();
            });
        })
}

// ADD A ROLE
function addRole() {

    let departments = []

    const sql = `SELECT * FROM departments`
    db.query(sql, (err, res) => {
        if (err) throw err;
        res.map(({ id, name }) => {
            departments.push({ name: name, value: id })
        })
    })

    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What role would you like to add?',
                validate: roleInput => {
                    if (roleInput) {
                        return true
                    } else {
                        console.log("Please enter a role.")
                        return false
                    }
                }
                
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of this role?',
                validate: salaryInput => {
                    if (salaryInput) {
                        return true
                    } else {
                        console.log("Please enter a valid salary.")
                        return false
                    }
                }
            },
            {
                type: 'list',
                name: 'department',
                message: 'What department does this role belong to?',
                choices: departments
            }
        ])
        .then ((answers) => {
            const params = [answers.title, answers.salary, answers.department]
            const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;

            db.query(sql, params, (err, res) => {
                if (err) throw err;
                console.log('You have added ' + answers.title + ' to the database');
                startMenu();
                });
        })
}

// ADD AN EMPLOYEE
function addEmployee() {

    let roles = []
    let employees = []

    const sqlEmployee = `SELECT * FROM employees`
    db.promise().query(sqlEmployee)
        .then(([rows]) => {
            rows.map(({ id, first_name, last_name }) => {
            employees.push({ name: first_name + " " + last_name, value: id })
            })
        })
        .catch(err => console.log(err))
        .then(() => {

            const sqlRoles = `SELECT * FROM roles`
            db.promise().query(sqlRoles)
                .then(([rows]) => {
                    rows.map(({ id, title }) => {
                    roles.push({ name: title, value: id })
                    })
                })
                .catch(err => console.log(err))
                .then(() => {

        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: "What is the employee's first name?",
                    validate: firstNameInput => {
                        if (firstNameInput) {
                            return true
                        } else {
                            console.log("Please enter a first name.")
                            return false
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: "What is the employee's last name?",
                    validate: lastNameInput => {
                        if (lastNameInput) {
                            return true
                        } else {
                            console.log("Please enter a last name.")
                            return false
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'title',
                    message: "What is the employee's role?",
                    choices: roles
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: "Who is the employee's manager?",
                    choices: employees
                }
            ])
            .then ((answers) => {
                const params = [answers.firstName, answers.lastName, answers.title, answers.manager]
                const sql = `INSERT INTO employees 
                            (first_name, last_name, role_id, manager_id) 
                            VALUES (?,?,?,?)`;

                db.query(sql, params, (err, res) => {
                    if (err) throw err;
                    console.log('You have added ' + answers.firstName + ' ' + answers.lastName + ' to the database');
                    startMenu();
                    });
            })
        })
    })
}

// UPDATE EMPLOYEE ROLES
function updateEmployeeRole() {

    let employees = []
    let roles = []

    const sqlEmployee = `SELECT * FROM employees`
    db.promise().query(sqlEmployee)
        .then(([rows]) => {
            rows.map(({ id, first_name, last_name }) => {
            employees.push({ name: first_name + " " + last_name, value: id })
            })
        })
        .catch(err => console.log(err))
        .then(() => {

            const sqlRoles = `SELECT * FROM roles`
            db.promise().query(sqlRoles)
                .then(([rows]) => {
                    rows.map(({ id, title }) => {
                    roles.push({ name: title, value: id })
                    })
                })
                .catch(err => console.log(err))
                .then(() => {

            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'employee',
                        message: "Select an employee to update:",
                        choices: employees
                    },
                    {
                        type: 'list',
                        name: 'title',
                        message: "What is the employee's new role?",
                        choices: roles
                    }
                ])
            .then ((answers) => {

                const params = [answers.title, answers.employee]
                const sql = `UPDATE employees
                            SET role_id = ? 
                            WHERE id = ?`

                db.query(sql, params, (err, res) => {
                    if (err) throw err;
                    console.log('You have updated ' + answers.firstName + ' ' + answers.lastName);
                    startMenu();
                    });
            })
        })

    })
}



startMenu()