DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

\c employees_db;

CREATE TABLE department (
  id SERIAL PRIMARY KEY,
   VARCHAR(100) NOT NULL
 
);

CREATE TABLE role (
  id SERIAL PRIMARY KEY,

);

CREATE TABLE employee (
  id SERIAL PRIMARY KEY,

);