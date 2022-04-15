# Employee Tracker

## Table of contents
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [Technologies](#technologies)
* [References](#references)
* [Process](#process)
* [Results](#results)
* [Credit](#credit)

## Description
Create an application for a business owner to view and manage the departments, roles, and employees within their company and keep their business organized.

## Installation
Open the terminal and type the following to install the MySQL2, Inquirer, and console.table packages:
```
npm install mysql2 inquirer console_table
``` 
Open the mysql shell in the terminal. After starting mysql, type the following:
```
source db/schema.sql;
source db/seeds.sql;
``` 
Exit the mysql shell.

## Usage
To run this application, type the following into the command line:

```
node index.js
``` 

## Technologies
* VS Code
* JavaScript
* Node.js
* Inquirer
* Terminal
* Git/GitHub
* MySQL

## References
* [console.table package](https://www.npmjs.com/package/console.table)
* [MySQL2 package](https://www.npmjs.com/package/mysql2)
* [Inquirer package](https://www.npmjs.com/package/inquirer)

## Process
### STEP 1. - SETUP PROJECT
* Created GitHub Repository with a unique name.
* Pushed first commit of files into the new Repo using Git.
* Organized folder and file directory structure.

### STEP 2. - SETUP DATABASE
* Established a new database in schema.sql
* Installed MySQL2 and connected to the new database
* Exported connection for other files to access
* Created tables in schema.sql
* Created seeds for the tables in seeds.sql
* Ran files to ensure proper connection

### STEP 3. - CREATE FUNCTIONALITY
* Installed Inquirer, console.table, and required  database connection in index.js
* Created a start menu which used Inquirer to prompt user actions
* Created JavaScript functions for each action
* Within each function, used Inquirer to prompt user answers (if needed)
* Within each function, used mySQL to write queries and return appropriate tables based on user actions or answers to inquirer prompts

### STEP 4. - FINALIZE
* Added verification to Inquirer prompts
* Made various commits throughout process to save progress
* Recorded video to show how to run the application
* Made tweaks and finished README.md

## Results
* [Video Link]()
* [GitHub Repository](https://github.com/etrenholm/employee-tracker)

### Output Example
![mockup]()

## Credit
Erica Trenholm: https://github.com/etrenholm

### ©️ April 2022