DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;


\c employee_db;

SELECT current_database();


CREATE TABLE Department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);


CREATE TABLE Role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES Department(id) 
    ON DELETE CASCADE
);


CREATE TABLE Employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (role_id) 
    REFERENCES Role(id) 
    FOREIGN KEY (manager_id) 
    REFERENCES Employee(id) 
    ON DELETE SET NULL
);
