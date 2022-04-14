-- VIEW ALL EMPLOYEES
SELECT employees.id,
employees.first_name, 
employees.last_name,
roles.title,
departments.name AS department,
roles.salary
FROM employees
LEFT JOIN roles
ON employees.role_id = roles.id
LEFT JOIN departments
ON roles.department_id = departments.id;