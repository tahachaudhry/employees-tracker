const inquirer = require('inquirer'); 
const mysql = require('mysql2/promise'); 
const consoleTable = require('console.table');

async function app(){

const db =  await mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'MSUbootcamp',
        database: 'employees_db'
    },
    console.log(`Connected to the Employee Database.`)
); 

const options = { 
    async viewDepartment(){ const department = await db.query("SELECT * FROM department") 
        console.table(department[0])
    },
    async viewRole(){ const roles = await db.query("SELECT * FROM employee_role") 
        console.table(roles[0])
    }, 
    async viewEmployees(){ const viewEmployees = await db.query("SELECT * FROM employee")
        console.table(viewEmployees[0])
    },
    async addRole(){ 
        let response = await inquirer.prompt([
        {
        type: "input",
        message: "Which role would you like to add?",
        name: "newRole"
        },
        {
        type: "input",
        message: "What is the salary for this role?",
        name: "newRoleSalary"
        },
        {
        type: "input",
        message: "What is the department for this role?",
        name: "newRoleDepartment"
        },
    ]);

    await db.query(`INSERT INTO employee_role SET title = ?, salary = ?, department_id = ?`, [response.newRole, response.newRoleSalary, response.newRoleDepartment]);
    const addRole = await db.query("SELECT * FROM employee_role") 
    console.table(addRole[0])
    }, 
    async addDepartment(){
        let response = await inquirer.prompt([
        {
            type: "input",
            message: "Which department would you like to add?",
            name: "newDepartment"
        }
        ]) 
        await db.query(`INSERT INTO department SET name = ?`, response.newDepartment)
            const addDepartment = await db.query("SELECT * FROM department") 
            console.table(addDepartment[0])
    },
    async addEmployee(){ 
        let response = await inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "employeeFirstName"
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "employeeLastName"
        },
        {
            type: "input",
            message: "What is the employee's role?", 
            name: "employeeRole"
        }, 
        {
            type: "input",
            message: "What is the employee's manager's name?",
            name: "employeeManager"
        },
        ]);

        await db.query(`INSERT INTO employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ?`, [response.employeeFirstName, response.employeeLastName, response.employeeRole, response.employeeManager]);
      const employees = await db.query("SELECT * FROM employee");
        console.table(employees[0])
        },
    async updateEmployee(){ 
        let response = await inquirer.prompt([
        {
            type: "input",
            message: "What is the first name of the employee you would like to update?",
            name: "employeeFirstName"
        },
        {
            type: "input",
            message: "What is the last name of the employee you would like to update?",
            name: "employeeLastName"
        },
        {
            type: "input",
            message: "What is the employee's new role?",
            name: "employeeUpdateRole"
        },
    ]);

        await db.query(`UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?`, [response.employeeUpdateRole, response.employeeFirstName, response.employeeLastName]);
        const updateEmployee = await db.query("SELECT * FROM employee") 
        console.table(updateEmployee[0])
    }, 
    async viewEmployeeByManager() { 
        let response = await inquirer.prompt([
            {
            type: "input",
            message: "What is the manager's name?",
            name: "managerName"
            },
        ]) 
        const employeeManager = await db.query(`SELECT * FROM employee WHERE manager_id = ?`, [response.managerName]); 
        console.table(employeeManager[0]);
    }
};  

runApp()

async function runApp() {
    const {action} = await dataBaseAction();
    await options[action]();
    const answer = await promptToContinue();
    if (answer.continuePrompt) {
        runApp();
    } else {
        console.log('Goodbye');
        return '';
    }
    return '';
}

async function dataBaseAction () {
    return inquirer.prompt([
        {
        type: 'list',
        message: 'Which of the following would you like to do',
        choices: [
            'viewDepartment',
            'viewRole',
            'viewEmployees',
            'addDepartment',
            'addRole',
            'addEmployee',
            'updateEmployee',
            'viewEmployeeByManager'
        ],
        name: 'action',
        },
    ]);
};

function promptToContinue() {
    return inquirer.prompt([
        {
            type: 'confirm',
            message: 'Do you wish to continue?',
            name: 'continuePrompt',
        },
    ]);
} 
}; 

app()