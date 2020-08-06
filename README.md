# Employee Management Application

A web application that allows employees to submit feedback toward each other's performance review.

# Demo

[Demo link](https://still-gorge-51871.herokuapp.com/)

## Technologies used

/Client/ (React-Redux) => /Rest API/ (Nodejs) => /Database/ (MongoDB)

### /Client/

- React, Redux, React Hooks

### /Server/

- Node, Express, MongoDB

### API : 
The RESTful API built using Nodejs, exposes CRUD endpoints for Profile, Review, and User data 

**Endpoints for Profile Data**

```
GET api/profile/me
POST api/profile/:employee_id
GET api/profile
GET api/profile/user/:user_id
DELETE api/profile/
DELETE api/profile/:employee_id
GET api/profile/github/:username
```

**Endpoints for REVIEW Data**

```
POST api/reviews/:employee_id&:id
GET api/reviews
GET api/reviews/:id
DELETE api/reviews/:id
POST api/reviews/feedback/:id
DELETE api/reviews/feedback/:id/:feedback_id
```

**Endpoints for User Data**

```
POST api/users
POST api/users/employee
```

**Endpoints for Authentication**
```
POST api/auth
```

#### Database :

```javascript
Profile Schema
{
  user: Schema.Types.ObjectId,
  department: String,
  status: String,
  skills: [String],
  bio: String,
  githubusername: String,
  date: Date
}

Review Schema
{
  user: Schema.Types.ObjectId (refer to 'users'),
  admin: Schema.Types.ObjectId (refer to 'users'),
  text: String,
  name: String,
  avatar: String,
  rating: Number,
  feedbacks: [
    {
      user: Schema.Types.ObjectId (refer to 'users'),
      text: String,
      name: String,
      avatar: String,
      date: Date,
    }
  ],
  reviewers: [
    {String}
  ],
  date: Date,  
}

User Schema
{
  name: String,
  email: String,
  password: String,
  avatar: String,
  isAdmin: Boolean,
  date: Date,
}
```

## Assumptions

1. Functional

- A user can login or register a new account specifying its role (Admin or normal user).
- All users can create/edit their own profiles and Admin can create new employees' accounts and profiles.
- Admin can view/add/edit/delete employee profiles.
- Admin can view/add/update/delete performance reviews created by itself.
- Admin can assign one employee to give feedback on other employee's performance review.
- Normal user cannot add/update/delete performance reviews.
- Normal user can view list of performance review assigned to them.
- Normal user can submit multiple feedbacks to a performance review.
- Normal user can view other employees' profiles.

2. Data design

- Employee can have multiple performance reviews from same or different Admins
- Employee can reveive multiple Feedback Requests
- One performance review can have many Feedbacks from same or different employees
- Each feedback to a performance review has a reviewer name, content, and date

# Finished Tasks

### /client/

1. Login and authentication
2. Create Account
3. View/Add/Update Employee profiles
4. View/Add/Update/Delete Performance reviews
5. View/Add/Delete Feedbacks
6. ADMIN and Employee View
7. Unit tests for reducer/ integration tests for reducers & action creators & Components

### /server/

1. Login and authentication
2. CRUD employee profiles
3. CRUD performance reviews
4. CRUD feedbacks

# Pending Tasks

1. Client side testing (some Component testing)
2. Server side testing (integration tests & unit tests)

## Available Scripts

### Move into project directory
`cd employeeEvaluator`

### Installs server node modules
`npm install`

### Move into client folder
`cd client`
### Installs client node modules
`npm install`

### Move back to project directory
`cd ..`

### Runs the app in the development mode for server and client concurrently 
`npm run dev`

### Run client testing
`cd ..`
`npm run test`

