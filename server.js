const express = require('express');
const { Pool } = require('pg');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// PostgreSQL client setup
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'employees_db',
    password: 'Ilovemydogs',
    port: 5432,  // Default PostgreSQL port
});

// Map user choices to functions
const actionMap = {
    'view all employees': viewAllEmployees,
    'Add employee': addEmployee,
    'Update Employee Role': updateEmployeeRole,
    'View All Roles': viewAllRoles,
    'Add Role': addRole,
    'View All Departments': viewAllDepartments,
    'Add Department': addDepartment,
    'Quit': quitProgram // Add quit option
};

async function promptUser() {
    try {
        const { userInput } = await inquirer.prompt([
            {
                type: 'list',
                name: 'userInput',
                message: 'What would you like to do?',
                choices: Object.keys(actionMap)
            }
        ]);

        const action = actionMap[userInput];
        if (action) {
            await action();
        } else {
            console.log('Invalid choice.');
            promptUser();
        }
    } catch (error) {
        console.error('Error prompting user:', error);
    }
}

function quitProgram() {
    console.log('Exiting the program.');
    process.exit(0); // Exit the process with a success code
}

// View all employees
async function viewAllEmployees() {
    const sql = `
    SELECT e.id, e.first_name, e.last_name, r.title AS role, d.department_name AS department
    FROM employees e
    JOIN role r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id`;
    try {
        const { rows } = await pool.query(sql);
        console.table(rows);
    } catch (err) {
        console.error('Error executing query', err.stack);
    }
    promptUser();
}

// Add employee
async function addEmployee() {
    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        { type: 'input', name: 'first_name', message: 'Enter the first name of the employee:' },
        { type: 'input', name: 'last_name', message: 'Enter the last name of the employee:' },
        { type: 'input', name: 'role_id', message: 'Enter the role ID for the employee:' },
        { type: 'input', name: 'manager_id', message: 'Enter the manager ID for the employee (optional):', default: null }
    ]); 
    const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING id';
    try {
        const { rows } = await pool.query(sql, [first_name, last_name, role_id, manager_id]);
        console.log('Employee added with ID:', rows[0].id);
        console.log(rows);
    } catch (err) {
        console.error('Error adding employee:', err.stack);
    }
    promptUser();
}

// Update employee role
async function updateEmployeeRole() {
    const { id, role_id } = await inquirer.prompt([
        { type: 'input', name: 'id', message: 'Enter the ID of the employee to update:' },
        { type: 'input', name: 'role_id', message: 'Enter the new role ID:' }
    ]);
    const sql = 'UPDATE employees SET role_id = $1 WHERE id = $2';
    try {
        await pool.query(sql, [role_id, id]);
        console.log('Employee role updated.');
    } catch (err) {
        console.error('Error updating employee role:', err.stack);
    }
    promptUser();
}

// View all roles
async function viewAllRoles() {
    const sql = `
        SELECT r.id, r.title, r.salary, d.department_name
        FROM role r
        JOIN department d ON r.department_id = d.id;
    `;
    try {
        const { rows } = await pool.query(sql);
        console.table(rows);
    } catch (err) {
        console.error('Error executing query', err.stack);
    }
    promptUser();
}

