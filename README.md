<div align="center">
 <h1 style="font-size: 30px; color: #FF0000">Jobs Manager API</h1>
 </div>


The Jobs Manager API is a Node.js and Express-based application that provides user registration and login functionalities while allowing users to create, update, and delete job listings. It incorporates robust security measures, including Mongoose schema validation, JSON Web Tokens (JWT) for authentication, password hashing and salting, XSS protection, Helmet middleware for HTTP headers, rate limiting, input validation, CORS, and SSL/TLS encryption for data transmission security and handling of duplicate emails. The documentation is supported by Swagger UI.

## Table of Contents

1. [Features](#features)
2. [Getting Started](#getting-started)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Folder Structure](#folder-structure)
7. [API Endpoints](#api-endpoints)
8. [Deployment](#deployment)
9. [Technologies Used](#technologies-used)
10. [Contributing](#contributing)
11. [License](#license)
12. [Documentation](#documentation)

## Features


### Database Connection

1. Import connect.js
2. Invoke in start()
3. Setup .env in the root
4. Add MONGODB_URI with the connection string

### Routers

* auth.js
* jobs.js

### User Model

Email Validation Regex 

```
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
```

### Register User

* Validate - name, password with mongoose validation
* Hash password with bcrypt
* Save user in database
* Genereate token
* Send token in response

### Login User   

* Validate - email, passwordin controllers
* If email or password is missing, throw BadRequestError
* Find user in database
* Compare password
* If no user or password does not match, throw UnauthenticatedErro
* If correct, generate Token
* Send token in response

### Mongoose Errors

* ValidationError
* Duplicate email
* CastError

### Security

* X-XSS-Protection: 1; mode=block
* Helmet: This package is used to secure your Express apps by setting various HTTP headers 
* Rate Limiter: This express rate limiter is used to limit the number of requests to a certain endpoint.
* cors: Cors is used to enable cross-origin resource sharing, which allows the server to make requests from one   origin to another.

### Swagger UI

```
/jobs/{id}:
  parameters:
    - in: path
      name: id
      schema:
        type: string
      required: true
      description: the job id
```

## Getting Started

To get started with the Jobs Manager API, follow the instructions in the sections below.

## Prerequisites

Make sure you have the following prerequisites installed:

- Node.js
- MongoDB
- npm (Node Package Manager)

## Installation

1. Clone this repository:

```bash
git clone https://github.com/alyconr/NodeJs-Jobs-Api.git
```
2. Change to the directory:
```bash
cd NodeJs-Jobs-Api
```
3. Install dependencies:
```bash
npm install
```
4. Start the server:
```bash
npm start
```

## Usage

1. Create a `.env` file in the project root directory and set the following environment variables:

   * MONGODB_URI: Your MongoDB connection URI.
   * JWT_SECRET: A secret key for JWT token generation.
   * JWT_LIFETIME: The lifetime of the JWT token in seconds.
   * PORT: The port to run the server on.

2. Start the server:
```bash
npm start
```
The API should be accessible at http://localhost:8000 by default.

## Folder Structure

The project has the following folder structure:

- **config/**: Configuration files.
- **controllers/**: Request handling controllers.
- **middleware/**: Custom middleware functions.
- **models/**: Mongoose schema models.
- **routes/**: API routes.
- **app.js**: Express application setup.
- **.env**: Environment variables.
- **.gitignore**: Git ignore file.
- **README.md**: Documentation.


## API Endpoints

Detailed API documentation can be found in the Swagger documentation included with the project.

Please wait while server spins up... It may take one minute because the Api is deployed on a free tier of Render.com

[Swagger Documentation](https://jobs-manager-api-892z.onrender.com/)


To access the Swagger documentation locately, run the application and visit `http://localhost:8000/api-docs` in your browser

## Deployment

The API is deployed using Render.com  and hosted on Render.com as a web service.

## Technologies Used

- Node.js
- Express
- Mongoose
- Bcrypt
- JWT
- Swagger UI
- Rate Limiter
- CORS
- SSL/TLS Encryption
- Helmet
- X-XSS-Protection
- Swagger UI

## Credits

The code for this project is available on GitHub: [https://github.com/alyconr/NodeJs-Jobs-Api](https://github.com/alyconr/NodeJs-Jobs-Api)


## 👤 Author


- GitHub: [@alyconr](https://github.com/alyconr)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/jeysson-aly-contreras/)

## Contributing

If you would like to contribute to the project, please read the [Contributing Guide](https://github.com/alyconr/NodeJs-Jobs-Api/blob/main/CONTRIBUTING.md).

## License

This project is licensed under the MIT License.

## Documentation

You can find the documentation for this project on GitHub: [https://github.com/alyconr/NodeJs-Jobs-Api/blob/main/README.md](https://github.com/alyconr/NodeJs-Jobs-Api/blob/main/README.md)