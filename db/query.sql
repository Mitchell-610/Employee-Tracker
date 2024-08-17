-- View all employees
SELECT e.id, e.first_name, e.last_name, r.title AS role, d.department_name AS department
FROM employees e
JOIN role r ON e.role_id = r.id
JOIN department d ON r.department_id = d.id;

-- View all roles
SELECT r.id, r.title, r.salary, d.department_name
FROM role r
JOIN department d ON r.department_id = d.id;

-- View all departments
SELECT id, department_name FROM department;

-- Add a new employee
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ($1, $2, $3, $4)
RETURNING id;

-- Update an employee's role
UPDATE employees
SET role_id = $1
WHERE id = $2;

-- Add a new role
INSERT INTO role (title, salary, department_id)
VALUES ($1, $2, $3)
RETURNING id;

-- Add a new department
INSERT INTO department (department_name)
VALUES ($1)
RETURNING id;
