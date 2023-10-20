# NODE JS API PROJECT

## Setup

```
npm install && npm start
```

## Database Connection

1. Import connect.js
2. Invoke in start()
3. Setup .env in the root
4. Add MONGODB_URI with the connection string


## Routers

* auth.js
* jobs.js

## User Model

Email Validation Regex 

```
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
```

## Register User

* Validate - name, password with mongoose validation
* Hash password with bcrypt
* Save user in database
* Genereate token
* Send token in response

## Login User   

* Validate - email, passwordin controllers
* If email or password is missing, throw BadRequestError
* Find user in database
* Compare password
* If no user or password does not match, throw UnauthenticatedErro
* If correct, generate Token
* Send token in response

## Mongoose Errors

* ValidationError
* Duplicate email
* CastError

## Security

* X-XSS-Protection: 1; mode=block
* Helmet
* Rate Limiter
* cors

## Swagger UI

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