import inquirer from 'inquirer';
import {pool, connectToDb} from './db/connection.js';


async function viewDepartment() {
  try {
    const res = await pool.query('SELECT * FROM department');
    console.table(res.rows);
  } catch (err) {
    console.error('Error fetching department:', err);
  }
}

async function viewRole() {
  try {
    const result = await pool.query('SELECT * FROM role');
    console.table(result.rows);
  } catch (error) {
    console.error('Error viewing role:', error);
  }
}


export async function viewEmployee() {
  try {
    const res = await pool.query(`
      SELECT 
        e.id AS employee_id, 
        e.first_name, 
        e.last_name,
        r.title AS role, 
        d.name AS department, 
        r.salary,
        e.manager_id,
        CONCAT(m.first_name, ' ', m.last_name) AS manager_name
      FROM employee e
      JOIN role r ON e.role_id = r.id
      JOIN department d ON r.department_id = d.id
      LEFT JOIN employee m ON e.manager_id = m.id;
    `);
    console.table(res.rows);
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
}

// Add a new department
async function addDepartment() {
  const {departmentName} = await inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'Enter the name of the department you would like to add:',
      validate: (input) => input.trim() !== '' || 'Department name cannot be empty.',
    },
  ]);
  
  try {
    const existingDepartmentResult = await pool.query('SELECT * FROM department WHERE name = $1', [departmentName]);
    if (existingDepartmentResult.rows.length > 0) {
      console.log(`Department ${departmentName} already exists.`);
      return;
    }

    // Insert department data into the departments table
    await pool.query('INSERT INTO department (name) VALUES ($1)', [departmentName]);
    console.log(`Department ${departmentName} added successfully.`);
  } catch (error) {
    console.error('Error adding department:', error);
  }
}

// Add a new role
export async function addRole() {
  try {
    const department = await pool.query('SELECT * FROM department;');
    const { title, salary, department_id } = await inquirer.prompt([
      { type: 'input', name: 'title', message: 'Enter role title:' },
      { type: 'input', name: 'salary', message: 'Enter salary:', validate: input => !isNaN(input) || 'Please enter a valid number' },
      { type: 'list', name: 'department_id', message: 'Select department:', choices: department.rows.map((d) => ({ name: d.name, value: d.id })) }
    ]);

    await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3);', [title, parseFloat(salary), department_id]);
    console.log(`Role "${title}" added!`);
  } catch (err) {
    console.error('Error adding role:', err);
  }
}

// Add a new employee
export async function addEmployee() {
  try {
    const role = await pool.query('SELECT * FROM role;');
    const employee = await pool.query('SELECT * FROM employee;');
    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
      { type: 'input', name: 'first_name', message: 'Enter first name:' },
      { type: 'input', name: 'last_name', message: 'Enter last name:' },
      { type: 'list', name: 'role_id', message: 'Select role:', choices: role.rows.map((r) => ({ name: r.title, value: r.id })) },
      { type: 'list', name: 'manager_id', message: 'Select manager:', choices: [...employee.rows.map((e) => ({ name: `${e.first_name} ${e.last_name}`, value: e.id })), { name: 'None', value: null }] }
    ]);
    await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4);', [first_name, last_name, role_id, manager_id]);
    console.log(`Employee "${first_name} ${last_name}" added!`);
  } catch (err) {
    console.error('Error adding employee:', err);
  }
}

// Update an employee role
export async function updateEmployeeRole() {
  try {
    const employee = await pool.query('SELECT * FROM employee;');
    const role = await pool.query('SELECT * FROM role;');
    const { employee_id, role_id } = await inquirer.prompt([
      { type: 'list', name: 'employee_id', message: 'Select employee:', choices: employee.rows.map((e) => ({ name: `${e.first_name} ${e.last_name}`, value: e.id })) },
      { type: 'list', name: 'role_id', message: 'Select new role:', choices: role.rows.map((r) => ({ name: r.title, value: r.id })) }
    ]);
    await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2;', [role_id, employee_id]);
    console.log('Employee role updated successfully!');
  } catch (err) {
    console.error('Error updating employee role:', err);
  }
}

// Main menu
async function mainMenu() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: ['View Department', 'View Role', 'View Employee', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Exit']
    }
  ]);

  switch (action) {
    case 'View Department':
      await viewDepartment();
      break;
    case 'View Role':
      await viewRole();
      break;
    case 'View Employee':
      await viewEmployee();
      break;
    case 'Add Department':
      await addDepartment();
      break;
    case 'Add Role':
      await addRole();
      break;
    case 'Add Employee':
      await addEmployee();
      break;
    case 'Update Employee Role':
      await updateEmployeeRole();
      break;
    case 'Exit':
      process.exit();
  }

  await mainMenu();
}

(async () => {
  await connectToDb();
  await mainMenu();
})();