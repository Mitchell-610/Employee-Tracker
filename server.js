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

