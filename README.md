# Hirewire - Employee Management System

## Description
Hirewire is a command-line application designed to help manage employee records using a PostgreSQL database. This tool allows users to view, add, and update departments, roles, and employees. It provides a structured way to keep track of an organization's workforce and their respective roles.

## Features
- View all departments, roles, and employees
- Add new departments, roles, and employees
- Update employee roles and managers
- View employees by department or manager
- Delete departments, roles, or employees
- Calculate total budget for a department

## Installation
1. Clone the repository:
   ```sh
   git clone git@github.com:jgmaxen/hirewire.git
   cd hirewire
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up the PostgreSQL database:
   - Create a new database in PostgreSQL
   - Configure the database connection in `.env` file
   
4. Run database migrations and seed data:
   ```sh
   npm run db:init
   ```

## Usage
To start the application, run:
```sh
npm run start
```
Follow the prompts in the command-line interface to interact with the database.

## Technologies Used
- Node.js
- PostgreSQL
- Inquirer.js
- Console.table

## Future Enhancements
- Implement a graphical user interface (GUI)
- Add authentication and role-based access control
- Generate reports and analytics for employee data

## License
This project is licensed under the MIT License.

## Contributing
Contributions are welcome! Feel free to fork the repo and submit a pull request.

## Questions?
For any questions, contact [Your Name] via GitHub: [jgmaxen](https://github.com/jgmaxen).


