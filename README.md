#PREREQUISITES:
    1.Install the latest LTS(Long Term Support) version of Node.js(https://nodejs.org/en/), by any available means (.exe, nvm, brew, etc.).

    2.Check in the console (terminal) that the Node.js installation was done properly by running the following commands node -vor node -version.

    3.Create a repo for your homework tasks on Github (https://github.com/)or git.epam.com.

    4.Provide your mentor with the link to the repo and add read access permissions.

    5.Create package.json by running the following commands npm initor npm init -y.

    6.Install globally or locally npmpackage nodemon(https://github.com/remy/nodemon), configure babel(https://babeljs.io/) and eslint(https://eslint.org/).
    Use the following eslintconfig file: https://epa.ms/nodejs19-hw2-ex1.As an alternative you can use TypeScript, this will be a big plus. Please inform your mentor if you decide to move on with TypeScript.

    7.Get ready to watch the lectures and do the homework tasks to study the basic principles and approaches of development server-side applications with Node.js.

#TASK 2.1

Write a simple REST service withCRUD operations for User entity.

•To create REST service,use ExpressJS (https://expressjs.com/).The User should have the following properties(you can use UUIDas a user identifier (id)):
    - id (String)
    - login (String)
    - password (String)
    - age (Number)
    - isDeleted (Boolean)

•Service should have the following CRUD operations for User:
    −get user by id;
    −create and update user;
    −get auto-suggest list from limit users, sorted by login property and filtered by loginSubstring
    in the login property: getAutoSuggestUsers(loginSubstring, limit)
    −remove user (soft delete–user gets marked with isDeleted flag, but not removed from the collection).

•Store user’scollection in the service memory (while the service is running).
To test the service CRUDmethods,you can use Postman (https://www.getpostman.com/).

#TASK 2.2

Add server-side validation for create/update operations of Userentity:
    •all fields are required;
    •login validationis required;
    •password must contain letters and numbers;
    •user’s age must be between 4 and 130.
In case of any property does not meet the validation requirements or the field is absent, return 400 (Bad Request) and detailed error message.
For requests validation use special packages like joi (https://github.com/hapijs/joi,https://www.npmjs.com/package/express-joi-validation).

--- --- --- ---

#TASK 3.1
•Install DB PostgreSQL on your machine or use a free web hosting services for PostgreSQL (https://www.heroku.com/postgresor https://www.elephantsql.com/plans.html).
•Write SQL script which will create Users table in the DB and fillit in with predefined users’collection.•Configure your REST service to work with PostgreSQL.
−Use the sequelize package(http://docs.sequelizejs.com/)as ORM to work with PostgreSQL.As an alternative to sequelizeyou can use more low-level query-builderlibrary(http://knexjs.org/).

#TASK 3.2
The service should adhere to 3-layer architecture principles (https://softwareontheroad.com/ideal-nodejs-project-structure/) and contain the following set of directories:|-routers / controllers|-services|-data-access|-models


#How to run tasks 3.1-3.2

Run the following commands
1) npm run init-database
2) npm run task

First command will create database
To create table Users and fill it with data, use data-access/script.sql