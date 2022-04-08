const mysql = require('mysql2')

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'WebDev22',
        database: 'employeetracker'
    },
    console.log('Connected to the employee-tracker database')
);

module.exports = db;