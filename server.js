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


promptUser();