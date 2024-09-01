# Fullstack Code Challenge

This is a code challenge for a fullstack position. The project includes a backend API and a frontend application and docker configurations.

## Backend API

The backend API is built with **Node.js** and **Next.js**, It provides graphql api using apollo server and it connected to postgress database.
* Graphql server is built using code-fist strategy.
* The graphql api provides queries and mutations to perform Create, Read, Update and Delete of Result Scan.
* The application leverages class-validator to validate queries and mutations.
* It uses typeorm, which is an orm which bridges entities & tables and provides easy to use api to perform database operations.


## Frontend Application

The frontend application is built with **Nextjs** and **TypeScript**. It provides a user interface for creating result scan, listing result scan and viewing findings of a perticualar result scan.
* Imports basic components from Material ui like date-time picker, text field, buttons, alerts etc.
* Leverages tailwind css for styling.
* Uses Apollo client to make graphql queries and mutations.
* Build on nextjs app router.
* Has three screens in total

## Getting Started

To get started with this project, clone the repository start docker daemon and run following command.

`docker-compose up -d`
